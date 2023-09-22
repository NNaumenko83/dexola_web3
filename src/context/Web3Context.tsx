import React, { createContext, useEffect, useState, ReactNode, useCallback } from "react";
import Web3 from "web3";
import { useAccount } from "wagmi";

import contractStakingABI from "../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../contracts/contract-tokenTracker-abi.json";

export type Web3ContextType = {
	web3: Web3 | null;
	balance: number | null;
	struBalance: number | null;
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

const createWeb3Provider = (): Web3 | null => {
	const infuraUrl = "https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2";
	const web3Instance = new Web3(new Web3.providers.HttpProvider(infuraUrl));
	return web3Instance;
};

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [web3, setWeb3] = useState<Web3 | null>(null);
	const { address, isConnected } = useAccount();
	const [balance, setBalance] = useState<number | null>(null);
	const [struBalance, setStruBalance] = useState<number | null>(null);
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
			const balanceStruOnWallet = await contractStarRunnerToken.methods.balanceOf(address).call();
			const formattedStruBalance = Math.floor(Number(web3.utils.fromWei(balanceStruOnWallet, "ether")));
			setStruBalance(Number(formattedStruBalance));
		}
	}, [contractStarRunnerToken, web3, address]);

	const calculateDaysRemaining = useCallback(async () => {
		try {
			const periodFinish = await contractStaking.methods.periodFinish().call();
			const currentTimestamp = Math.floor(Date.now() / 1000);
			const timeRemainingInSeconds = Number(periodFinish) - currentTimestamp;
			const oneDayInSeconds = 24 * 60 * 60;
			const daysRemaining = Math.floor(timeRemainingInSeconds / oneDayInSeconds);
			setDays(daysRemaining);
		} catch (error) {
			return null;
		}
	}, [contractStaking]);

	const getRewardRate = useCallback(
		async (input: number) => {
			try {
				//totalAvailbleRewards -  розраховуємо так
				const periodFinish = await contractStaking.methods.periodFinish().call();
				const currentTimestamp = Math.floor(Date.now() / 1000);
				const timeRemainingInSeconds = Number(periodFinish) - currentTimestamp;

				// rewardRate - це метод смарт-контракту contractStaking, який повертає
				// кількість винагороди, яку користувач може отримати
				// на одиницю стейкінгу в секунду.
				const rewardRate = await contractStaking.methods.rewardRate().call();

				// Доступна кількість винагород

				const totalAvailbleRewards = BigInt(timeRemainingInSeconds) * rewardRate;

				// Загальний обсяг STRU, який був стейкований всіма користувачами.
				const totalSupplySTRU = await contractStaking.methods.totalSupply().call();

				// Кількість STRU, яку користувач застейкав
				const stakedBalance = await contractStaking.methods.balanceOf(address).call();

				if (web3) {
					const testRewardRate =
						(stakedBalance * totalAvailbleRewards) / totalSupplySTRU + BigInt(web3.utils.toWei(input, "ether"));

					const formattedRewardRate = Number(web3.utils.fromWei(testRewardRate, "ether")).toFixed(3);
					if (Number(formattedRewardRate) < 1) {
						setRewardRate(Number(formattedRewardRate));
						return;
					}
					setRewardRate(Math.floor(Number(formattedRewardRate)));
				}
			} catch (error) {
				console.log(error);
				return null;
			}
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[address, web3],
	);

	const getStakedBalance = useCallback(async () => {
		if (contractStarRunnerToken && web3 && address) {
			const stakedBalance = await contractStaking.methods.balanceOf(address).call();

			const formattedStakedBalance = Number(web3.utils.fromWei(stakedBalance, "ether")).toFixed(2);
			// setStakedBalance(formattedStakedBalance.toString());

			if (Number(formattedStakedBalance) < 1) {
				setStakedBalance(Number(formattedStakedBalance));
				return;
			}
			setStakedBalance(Math.floor(Number(formattedStakedBalance)));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contractStarRunnerToken, web3, address]);

	const getBalance = useCallback(async () => {
		if (web3 && address) {
			try {
				const balanceEth = await web3.eth.getBalance(address);

				const formattedBalance = Number(web3.utils.fromWei(balanceEth, "ether")).toFixed(1);
				setBalance(Number(formattedBalance));
			} catch (error) {
				console.error("Помилка при отриманні балансу:", error);
			}
		}
	}, [web3, address, setBalance]);

	const getApy = useCallback(async () => {
		if (contractStaking && web3) {
			try {
				const totalSupplySTRU = await contractStaking.methods.totalSupply().call();
				const totalRewards = await contractStaking.methods.getRewardForDuration().call();
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
				const earned = await contractStaking.methods.earned(address).call();
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

	const updAll = () => {
		getBalance();
		getStruBalance();
		getStakedBalance();
		getEarned();
		getApy();
		calculateDaysRemaining();
		getEarned();
	};

	useEffect(() => {
		const web3 = createWeb3Provider();
		if (web3) {
			const contractStakingInstance = new web3.eth.Contract(contractStakingABI, contractStakingAddress);
			setContractStaking(contractStakingInstance);
			setWeb3(web3);
		}
	}, []);

	useEffect(() => {
		if (web3) {
			getApy();
			calculateDaysRemaining();
			getRewardRate(0);
		}
	}, [calculateDaysRemaining, getApy, web3, getRewardRate]);

	useEffect(() => {
		if (isConnected && address && web3) {
			getBalance();
			const contractStakingInstance = new web3.eth.Contract(contractStakingABI, contractStakingAddress);
			setContractStaking(contractStakingInstance);
			const contractStarRunnerTokenInstance = new web3.eth.Contract(
				contractStarRunnerTokenABI,
				contractStarRunnerTokenAddress,
			);
			setContractStarRunnerToken(contractStarRunnerTokenInstance);
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
