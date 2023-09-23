import { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import Web3 from "web3";
import {
	fetchBalance,
	fetchStakedBalance,
	fetchStruBalance,
	fetchPeriodFinish,
	fetchTotalRewards,
	fetchTotalSupplySTRU,
	fetchEarned,
	fetchRewardRate,
	fetchAllowance,
} from "../services";

export const useContract = (
	web3: Web3 | null,
	// address: string | null,
	contractStaking: any | null,
	contractStarRunnerToken: any | null,
) => {
	const { address, isConnected } = useAccount();
	const [struBalance, setStruBalance] = useState<number | null>(null);
	const [days, setDays] = useState<number | null>(null);
	const [earned, setEarned] = useState<number | null>(null);
	const [rewardRate, setRewardRate] = useState<number | null>(null);
	const [balanceStruOnWallet, setBalanceStruOnWallet] = useState<bigint | null>(null);
	const [stakedBalance, setStakedBalance] = useState<number | null>(null);
	const [balance, setBalance] = useState<number | null>(null);
	const [apy, setApy] = useState<number | null>(null);
	const [allowance, setAllowance] = useState(0n);

	const getAllowance = useCallback(async () => {
		if (address) {
			try {
				const currentAllowance = await fetchAllowance(
					contractStarRunnerToken,
					address,
					"0x2f112ed8a96327747565f4d4b4615be8fb89459d",
				);
				setAllowance(currentAllowance);
			} catch (error) {
				console.error(error);
			}
		}
	}, [contractStarRunnerToken, address]);

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
		if (web3) {
			(async () => {
				try {
					await Promise.all([getApy(), getDaysRemaining(), getRewardRate(0)]);
				} catch (error) {
					console.error("Помилка при отриманні даних:", error);
				}
			})();
		}
	}, [getDaysRemaining, getApy, web3, getRewardRate]);

	useEffect(() => {
		if (isConnected && address && web3) {
			(async () => {
				try {
					await getBalance();
				} catch (error) {
					console.error("Помилка при отриманні балансу:", error);
				}
			})();
		}
	}, [address, getBalance, isConnected, web3]);

	useEffect(() => {
		if (contractStaking && contractStarRunnerToken) {
			(async () => {
				try {
					await Promise.all([getStruBalance(), getStakedBalance(), getEarned(), getAllowance()]);
				} catch (error) {
					console.error("Помилка при отриманні даних:", error);
				}
			})();
		}
	}, [contractStaking, contractStarRunnerToken, getEarned, getStakedBalance, getStruBalance, getAllowance]);

	return {
		struBalance,
		days,
		earned,
		rewardRate,
		stakedBalance,
		balanceStruOnWallet,
		balance,
		apy,
		allowance,
		getStruBalance,
		getDaysRemaining,
		getRewardRate,
		getStakedBalance,
		getBalance,
		getApy,
		getEarned,
		updAll,
		getAllowance,
	};
};
