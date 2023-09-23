import React, { createContext, useEffect, useState, ReactNode, useCallback } from "react";
import Web3 from "web3";
import { useAccount } from "wagmi";

import contractStakingABI from "../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../contracts/contract-tokenTracker-abi.json";
import {
	fetchBalance,
	fetchStakedBalance,
	fetchStruBalance,
	fetchPeriodFinish,
	fetchTotalRewards,
	fetchTotalSupplySTRU,
	fetchEarned,
	fetchRewardRate,
} from "../services";
import { createWeb3Provider } from "../utils/createWeb3Provider";

export type Web3ContextType = {
	web3: Web3 | null;
	balance: number | null;
	struBalance: number | null;
	balanceStruOnWallet: bigint | null;
	stakedBalance: number | null;
	rewardRate: number | null;
	contractStaking: any | null;
	contractStarRunnerToken: any | null;
	apy: number | null;
	days: number | null;
	earned: number | null;
	getBalance: () => void;
	getStruBalance: () => void;
	getStakedBalance: () => void;
	updAll: () => void;
	getRewardRate: (input: number) => void;
};

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [web3, setWeb3] = useState<Web3 | null>(null);
	const { address, isConnected } = useAccount();
	const [balance, setBalance] = useState<number | null>(null);
	const [struBalance, setStruBalance] = useState<number | null>(null);
	const [balanceStruOnWallet, setBalanceStruOnWallet] = useState<bigint | null>(null);
	const [stakedBalance, setStakedBalance] = useState<number | null>(null);
	const [apy, setApy] = useState<number | null>(null);
	const [contractStaking, setContractStaking] = useState<any | null>(null); // Додали стейт для контракту contractStaking
	const [contractStarRunnerToken, setContractStarRunnerToken] = useState<any | null>(null); // Додали стейт для контракту contractStarRunnerToken
	const [days, setDays] = useState<number | null>(null);
	const [earned, setEarned] = useState<number | null>(null);
	const [rewardRate, setRewardRate] = useState<number | null>(null);
	// Адреси контрактів
	const contractStakingAddress = "0x2f112ed8a96327747565f4d4b4615be8fb89459d";
	const contractStarRunnerTokenAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

	const getStruBalance = useCallback(async () => {
		if (contractStarRunnerToken && web3 && address) {
			try {
				const balanceStruOnWallet = await fetchStruBalance(contractStarRunnerToken, address);
				setBalanceStruOnWallet(balanceStruOnWallet);
				const formattedStruBalance = Math.floor(Number(web3.utils.fromWei(balanceStruOnWallet, "ether")));
				setStruBalance(Number(formattedStruBalance));
			} catch (error) {
				console.error(error);
			}
		}
	}, [contractStarRunnerToken, web3, address]);

	const getDaysRemaining = useCallback(async () => {
		try {
			const periodFinish = await fetchPeriodFinish(contractStaking);
			const currentTimestamp = Math.floor(Date.now() / 1000);
			const timeRemainingInSeconds = Number(periodFinish) - currentTimestamp;
			const oneDayInSeconds = 24 * 60 * 60;
			const daysRemaining = Math.floor(timeRemainingInSeconds / oneDayInSeconds);
			setDays(daysRemaining);
		} catch (error) {
			console.error(error);
		}
	}, [contractStaking]);

	const getRewardRate = useCallback(
		async (input: number) => {
			try {
				if (contractStaking && web3 && address) {
					const [periodFinishValue, rewardRateValue, totalSupplySTRUValue, stakedBalanceValue] = await Promise.all([
						fetchPeriodFinish(contractStaking),
						fetchRewardRate(contractStaking),
						fetchTotalSupplySTRU(contractStaking),
						fetchStakedBalance(contractStaking, address),
					]);

					const periodFinish = Number(periodFinishValue);
					const rewardRate = Number(rewardRateValue);
					const totalSupplySTRU = Number(totalSupplySTRUValue);
					const stakedBalance = Number(stakedBalanceValue);

					const currentTimestamp = Math.floor(Date.now() / 1000);
					const timeRemainingInSeconds = periodFinish - currentTimestamp;
					const totalAvailableRewards = BigInt(timeRemainingInSeconds) * BigInt(rewardRate);

					if (web3) {
						const testRewardRate =
							(BigInt(stakedBalance) * totalAvailableRewards) / BigInt(totalSupplySTRU) +
							BigInt(web3.utils.toWei(input.toString(), "ether"));

						const formattedRewardRate = Number(web3.utils.fromWei(testRewardRate.toString(), "ether")).toFixed(3);

						if (Number(formattedRewardRate) < 1) {
							setRewardRate(Number(formattedRewardRate));
							return;
						}
						setRewardRate(Math.floor(Number(formattedRewardRate)));
					}
				}
			} catch (error) {
				console.error("Помилка при отриманні reward rate:", error);
				return null;
			}
		},
		[contractStaking, web3, address],
	);

	const getStakedBalance = useCallback(async () => {
		if (contractStarRunnerToken && web3 && address) {
			try {
				const stakedBalance = await fetchStakedBalance(contractStaking, address);
				const formattedStakedBalance = Number(web3.utils.fromWei(stakedBalance, "ether")).toFixed(2);

				if (Number(formattedStakedBalance) < 1) {
					setStakedBalance(Number(formattedStakedBalance));
					return;
				}
				setStakedBalance(Math.floor(Number(formattedStakedBalance)));
			} catch (error) {
				console.error(error); // Обробка помилок
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contractStarRunnerToken, web3, address]);

	const getBalance = useCallback(async () => {
		if (web3 && address) {
			try {
				const balanceEth = await fetchBalance(web3, address);
				setBalance(Number(balanceEth));
			} catch (error) {
				console.error("Помилка при отриманні балансу:", error);
			}
		}
	}, [web3, address, setBalance]);

	const getApy = useCallback(async () => {
		if (contractStaking && web3) {
			try {
				const [totalSupplySTRU, totalRewards] = await Promise.all([
					fetchTotalSupplySTRU(contractStaking),
					fetchTotalRewards(contractStaking),
				]);

				const apy = Math.floor(Number(totalRewards / totalSupplySTRU)) * 100;
				setApy(apy);
			} catch (error) {
				console.error("Помилка при отриманні APy:", error);
			}
		}
	}, [contractStaking, web3, setApy]);

	const getEarned = useCallback(async () => {
		if (contractStaking && web3 && address) {
			try {
				const earned = await fetchEarned(contractStaking, address);
				const formattedEarned = Number(web3.utils.fromWei(earned, "ether")).toFixed(3);

				if (Number(formattedEarned) < 1) {
					setEarned(Number(formattedEarned));
					return;
				}
				setEarned(Math.floor(Number(formattedEarned)));
			} catch (error) {
				console.error("Помилка при отриманні earned:", error);
			}
		}
	}, [contractStaking, web3, address]);

	const updAll = async () => {
		const promises = [
			getBalance(),
			getStruBalance(),
			getStakedBalance(),
			getEarned(),
			getApy(),
			getDaysRemaining(),
			getEarned(),
		];

		try {
			await Promise.all(promises);
		} catch (error) {
			console.error("Помилка під час виконання функцій:", error);
		}
	};

	useEffect(() => {
		const web3 = createWeb3Provider();
		if (web3) {
			const contractStakingInstance = new web3.eth.Contract(contractStakingABI, contractStakingAddress);
			setContractStaking(contractStakingInstance);
			const contractStarRunnerTokenInstance = new web3.eth.Contract(
				contractStarRunnerTokenABI,
				contractStarRunnerTokenAddress,
			);
			setContractStarRunnerToken(contractStarRunnerTokenInstance);
			setWeb3(web3);
		}
	}, []);

	useEffect(() => {
		if (web3) {
			getApy();
			getDaysRemaining();
			getRewardRate(0);
		}
	}, [getDaysRemaining, getApy, web3, getRewardRate]);

	useEffect(() => {
		if (isConnected && address && web3) {
			getBalance();
		}
	}, [address, getBalance, isConnected, web3]);

	useEffect(() => {
		if (contractStaking && contractStarRunnerToken) {
			getStruBalance();
			getStakedBalance();
			getEarned();
		}
	}, [contractStaking, contractStarRunnerToken, getEarned, getStakedBalance, getStruBalance]);

	return (
		<Web3Context.Provider
			value={{
				web3,
				balance,
				struBalance,
				balanceStruOnWallet,
				stakedBalance,
				rewardRate,
				contractStaking,
				contractStarRunnerToken,
				getBalance,
				getStruBalance,
				getStakedBalance,
				getRewardRate,
				apy,
				days,
				earned,
				updAll,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};
