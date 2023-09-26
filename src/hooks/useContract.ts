import { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import Web3 from "web3";
import { useDebouncedCallback } from "use-debounce";
import { validateAmount } from "../utils/validateAmount";
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
import contractStakingABI from "../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../contracts/contract-tokenTracker-abi.json";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

export const useContract = (web3: Web3 | null, contractStaking: any | null, contractStarRunnerToken: any | null) => {
	const { address, isConnected } = useAccount();
	const [struBalance, setStruBalance] = useState<number | null>(null);
	const [days, setDays] = useState<number | null>(null);
	const [earned, setEarned] = useState<number | null>(null);
	const [rewardRate, setRewardRate] = useState<number | null>(null);
	const [balanceStruOnWallet, setBalanceStruOnWallet] = useState<bigint | null>(null);
	const [stakedBalance, setStakedBalance] = useState<number | null>(null);
	const [stakedBalanceBigint, setStakedBalanceBigint] = useState<bigint | null>(null);
	const [balance, setBalance] = useState<number | null>(null);
	const [apy, setApy] = useState<number | null>(null);
	const [allowance, setAllowance] = useState(0n);
	const [numberOfStakeSrtu, setNumberOfStakeSrtu] = useState<string>("");
	const [numberOfWithdrawSrtu, setNumberOfWithdrawSrtu] = useState<string>("");
	const [transactionStakeNumberOfStru, setTransactionStakeNumberOfStru] = useState<string>("");
	const [transactionWithdrawNumberOfStru, setTransactionWithdrawNumberOfStru] = useState<string>("");
	const [isErrorApprove, setIsErrorApprove] = useState(false);
	const [isErrorStaked, setIsErrorStaked] = useState(false);
	const [isSuccessApprove, setIsSuccessApprove] = useState(false);
	const [isSuccessStake, setIsSuccessStake] = useState(false);
	const [isSuccessWithdraw, setIsSuccessWithdraw] = useState(false);
	const [isErrorWithdraw, setIsErrorWithdraw] = useState(false);
	const [isSuccessWithdrawAll, setIsSuccessWithdrawAll] = useState(false);
	const [isErrorWithdrawAll, setIsErrorWithdrawAll] = useState(false);
	const [transactionRewardsNumberOfStru, setTransactionRewardsNumberOfStru] = useState<string>("");
	const [isSuccessWithdrawRewards, setIsSuccessWithdrawRewards] = useState(false);
	const [isErrorWithdrawRewards, setIsErrorWithdrawRewards] = useState(false);
	const [isFetchInfoError, setIsFetchInfoError] = useState(false);

	const formattedNumberOfStakeSrtu = web3?.utils.toWei(numberOfStakeSrtu, "ether");
	const formattedNumberOfWithdrawSrtu = web3?.utils.toWei(numberOfWithdrawSrtu, "ether");

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
				setIsFetchInfoError(true);
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
				setIsFetchInfoError(true);
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
			setIsFetchInfoError(true);
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
				setIsFetchInfoError(true);
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
					setStakedBalanceBigint(stakedBalance);
					setStakedBalance(Number(formattedStakedBalance));
					return;
				}
				setStakedBalance(Math.floor(Number(formattedStakedBalance)));
				setStakedBalanceBigint(stakedBalance);
			} catch (error) {
				setIsFetchInfoError(true);
			}
		}
	}, [contractStarRunnerToken, web3, address, contractStaking]);

	const getBalance = useCallback(async () => {
		if (web3 && address) {
			try {
				const balanceEth = await fetchBalance(web3, address);
				setBalance(Number(balanceEth));
			} catch (error) {
				setIsFetchInfoError(true);
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
				setIsFetchInfoError(true);
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
				setIsFetchInfoError(true);
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
			setIsFetchInfoError(true);
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

	useEffect(() => {
		if (isSuccessApprove) {
			setTimeout(() => {
				setIsSuccessApprove(false);
			}, 5000);
		}
		if (isErrorApprove) {
			setTimeout(() => {
				setIsErrorApprove(false);
			}, 5000);
		}
		if (isSuccessStake) {
			setTimeout(() => {
				setIsSuccessStake(false);
			}, 5000);
		}
		if (isErrorStaked) {
			setTimeout(() => {
				setIsErrorStaked(false);
			}, 5000);
		}
		if (isSuccessWithdraw) {
			setTimeout(() => {
				setIsSuccessWithdraw(false);
			}, 5000);
		}
		if (isErrorWithdraw) {
			setTimeout(() => {
				setIsErrorWithdraw(false);
			}, 5000);
		}
		if (isSuccessWithdrawRewards) {
			setTimeout(() => {
				setIsSuccessWithdrawRewards(false);
			}, 5000);
		}
		if (isErrorWithdrawRewards) {
			setTimeout(() => {
				setIsErrorWithdrawRewards(false);
			}, 5000);
		}
		if (isSuccessWithdrawAll) {
			setTimeout(() => {
				setIsSuccessWithdrawAll(false);
			}, 5000);
		}
		if (isErrorWithdrawAll) {
			setTimeout(() => {
				setIsErrorWithdrawAll(false);
			}, 5000);
		}
		if (isFetchInfoError) {
			setTimeout(() => {
				setIsFetchInfoError(false);
			}, 5000);
		}
	}, [
		isErrorApprove,
		isSuccessApprove,
		isErrorStaked,
		isSuccessStake,
		isErrorWithdraw,
		isSuccessWithdraw,
		isSuccessWithdrawAll,
		isErrorWithdrawAll,
		isErrorWithdrawRewards,
		isSuccessWithdrawRewards,
		isFetchInfoError,
	]);

	const debouncedGetRewardRate = useDebouncedCallback(input => getRewardRate(Number(input)), 500);

	const { config: approveConfig } = usePrepareContractWrite({
		address: "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83",
		abi: contractStarRunnerTokenABI,
		functionName: "approve",
		args: ["0x2f112ed8a96327747565f4d4b4615be8fb89459d", struBalance ? web3?.utils.toWei(struBalance, "ether") : 0],
		enabled: Boolean(numberOfStakeSrtu),
	});

	const { config: stakeConfig, error: isErrorApprovePrepare } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "stake",
		args: [formattedNumberOfStakeSrtu],
		enabled: Boolean(numberOfStakeSrtu),
	});

	const { data: approveData, write: approve } = useContractWrite(approveConfig);

	const { data: stakeData, write: stake } = useContractWrite(stakeConfig);

	const { isLoading: isLoadingApprove } = useWaitForTransaction({
		hash: approveData?.hash,
		onSuccess() {
			setIsSuccessApprove(true);
			getAllowance();
		},
		onError() {
			setIsErrorApprove(true);
		},
	});

	const { isLoading: isLoadingStake } = useWaitForTransaction({
		hash: stakeData?.hash,
		onSuccess() {
			setIsSuccessStake(true);
			updAll();
			setNumberOfStakeSrtu("");
		},
		onError() {
			setIsErrorStaked(true);
		},
	});

	const onSubmitStakeHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		if (formattedNumberOfStakeSrtu && allowance < BigInt(formattedNumberOfStakeSrtu) && approve) {
			approve();
			setNumberOfStakeSrtu("");
			return;
		}

		if (stake && numberOfStakeSrtu !== "") {
			setTransactionStakeNumberOfStru(numberOfStakeSrtu);
			stake();
			return;
		}
	};

	const onSubmitWidthdrawHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		if (withdraw && numberOfWithdrawSrtu) {
			setTransactionWithdrawNumberOfStru(numberOfWithdrawSrtu);
			withdraw();
		}

		if (withdrawAll && !numberOfWithdrawSrtu) {
			withdrawAll();
		}
	};

	const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
		const inputName = e.target.name;
		const inputText = e.target.value;

		if (inputName === "withdraw") {
			if (!validateAmount(inputText) && inputText === "") {
				setNumberOfWithdrawSrtu(inputText);
				return;
			}
			if (!stakedBalanceBigint) {
				return;
			}
			if (!validateAmount(inputText)) {
				return;
			}
			if (stakedBalanceBigint && web3 && stakedBalanceBigint < BigInt(web3.utils.toWei(e.target.value, "ether"))) {
				return;
			}

			setNumberOfWithdrawSrtu(inputText);
		} else if (inputName === "stake") {
			if (!validateAmount(inputText) && inputText === "") {
				setNumberOfStakeSrtu(inputText);
				debouncedGetRewardRate(Number(0));
				return;
			}

			if (!validateAmount(inputText) || !struBalance) {
				return;
			}
			if (
				struBalance &&
				web3 &&
				balanceStruOnWallet &&
				balanceStruOnWallet < BigInt(web3.utils.toWei(e.target.value, "ether"))
			) {
				return;
			}

			debouncedGetRewardRate(Number(inputText));
			setNumberOfStakeSrtu(inputText);
		}
	};

	const { config: withdrawConfig } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "withdraw",
		args: [formattedNumberOfWithdrawSrtu],
		enabled: Boolean(numberOfWithdrawSrtu),
	});

	const { data: withdrawData, write: withdraw } = useContractWrite(withdrawConfig);

	const { isLoading: isLoadingWithdraw } = useWaitForTransaction({
		hash: withdrawData?.hash,
		onSuccess() {
			setIsSuccessWithdraw(true);
			updAll();
			setNumberOfWithdrawSrtu("");
		},
		onError() {
			setIsErrorWithdraw(true);
		},
	});

	// Знаття зі стейку всіх токенів і винагороди
	const { config: withdrawAllConfig } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "exit",
		enabled: Boolean(!numberOfWithdrawSrtu),
	});

	const { data: withdrawAllData, write: withdrawAll } = useContractWrite(withdrawAllConfig);

	const { isLoading: isLoadingWithdrawAll } = useWaitForTransaction({
		hash: withdrawAllData?.hash,
		onSuccess() {
			setIsSuccessWithdrawAll(true);
			updAll();
		},
		onError() {
			setIsErrorWithdrawAll(true);
		},
	});

	const { config: claimRewardsConfig } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "claimReward",
	});

	const { data: claimRewardsData, write: claimRewards } = useContractWrite(claimRewardsConfig);

	const { isLoading: isLoadingWithdrawRewards } = useWaitForTransaction({
		hash: claimRewardsData?.hash,
		onSuccess() {
			setIsSuccessWithdrawRewards(true);
			updAll();
		},
		onError() {
			setIsErrorWithdrawRewards(true);
		},
	});

	const onSubmitRewardsHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		if (claimRewards && earned) {
			setTransactionRewardsNumberOfStru(earned.toString());
			claimRewards();
		}
	};

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
		transactionStakeNumberOfStru,
		transactionWithdrawNumberOfStru,
		transactionRewardsNumberOfStru,
		isErrorApprove,
		isErrorStaked,
		isSuccessApprove,
		isSuccessStake,
		onSubmitStakeHandler,
		onSubmitWidthdrawHandler,
		onSubmitRewardsHandler,
		onChangeInput,
		isLoadingApprove,
		isLoadingStake,
		isErrorApprovePrepare,
		isLoadingWithdraw,
		isLoadingWithdrawAll,
		numberOfStakeSrtu,
		numberOfWithdrawSrtu,
		isSuccessWithdraw,
		isSuccessWithdrawAll,
		isErrorWithdrawAll,
		isErrorWithdraw,
		isSuccessWithdrawRewards,
		isErrorWithdrawRewards,
		isLoadingWithdrawRewards,
		isFetchInfoError,
	};
};
