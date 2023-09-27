import { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import Web3 from "web3";
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
	const [rewardRate, setRewardRate] = useState<string | null>(null);
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

	// Функція отримання allowance
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

	// Функція отримання балансу STRU токенів

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

	// Функція отримання кількості днів до, що залишилися до завершення періоду розподілу нагороди в контракті

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

	//  Функція для отримання і обчислення значення reward rate

	const getRewardRate = useCallback(
		async (input: number) => {
			try {
				if (contractStaking && web3 && address) {
					const [periodFinish, rewardRate, totalSupplySTRUValue, stakedBalanceValue] = await Promise.all([
						fetchPeriodFinish(contractStaking) /* bigint */,
						fetchRewardRate(contractStaking) /* bigint */,
						fetchTotalSupplySTRU(contractStaking) /* bigint */,
						fetchStakedBalance(contractStaking, address) /* bigint */,
					]);

					const totalSupplySTRU = Number(Number(web3.utils.fromWei(totalSupplySTRUValue, "ether")).toFixed(6));
					const stakedBalance = Number(Number(web3.utils.fromWei(stakedBalanceValue, "ether")).toFixed(6));
					const currentTimestamp = Math.floor(Date.now() / 1000);
					const timeRemainingInSeconds = periodFinish - BigInt(currentTimestamp);
					const totalAvailableRewards = Number(
						Number(web3.utils.fromWei(timeRemainingInSeconds * rewardRate, "ether")).toFixed(6),
					);
					const rewardRateCalculate = (stakedBalance * totalAvailableRewards) / totalSupplySTRU + input;
					const formattedRewardRate = rewardRateCalculate.toFixed(3);
					setRewardRate(formattedRewardRate);
				}
			} catch (error) {
				setIsFetchInfoError(true);
			}
		},
		[contractStaking, web3, address],
	);

	// Функція для отримання балансу на стейці

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

	// Функція для сотримання балансу тестових ETH

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

	// Функція для отримання процентної ставки

	const getApy = useCallback(async () => {
		if (contractStaking && web3) {
			try {
				const [totalSupplySTRU, totalRewards] = await Promise.all([
					fetchTotalSupplySTRU(contractStaking),
					fetchTotalRewards(contractStaking),
				]);

				const apy = Math.floor(
					(Number(web3?.utils.fromWei(totalRewards.toString(), "ether")) * 100) /
						Number(web3?.utils.fromWei(totalSupplySTRU.toString(), "ether")),
				);
				setApy(apy);
			} catch (error) {
				setIsFetchInfoError(true);
			}
		}
	}, [contractStaking, web3, setApy]);

	// Функція для отримання значення винагороди на даний момент

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

	// Функція для воновленя всіх даних

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

	// МЕТОДИ WRITE ДЛЯ КОНТРАКТІВ

	// Метод approve

	const { config: approveConfig } = usePrepareContractWrite({
		address: "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83",
		abi: contractStarRunnerTokenABI,
		functionName: "approve",
		args: ["0x2f112ed8a96327747565f4d4b4615be8fb89459d", struBalance ? web3?.utils.toWei(struBalance, "ether") : 0],
		enabled: Boolean(numberOfStakeSrtu),
	});

	const { data: approveData, write: approve } = useContractWrite(approveConfig);

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

	// Підготовка методу approve stake

	const { config: stakeConfig, error: isErrorApprovePrepare } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "stake",
		args: [formattedNumberOfStakeSrtu],
		enabled: Boolean(numberOfStakeSrtu),
	});

	const { data: stakeData, write: stake } = useContractWrite(stakeConfig);

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

	// Обробка сабміту при стекінгу

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

	// Обробка сабміту при знятті зі стейту, або, якщо в інпуті нічого не введено, всієї кількості токенів
	// що застейкані плюс всієї винагороди

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

	// Обробка інпутів стейкінгу або зняття зі стейту

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
				getRewardRate(Number(0));
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

			getRewardRate(Number(inputText));
			setNumberOfStakeSrtu(inputText);
		}
	};

	// Зняття зі стейту певної кількості токенів

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

	// Знаття винагороди

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

	//

	useEffect(() => {
		if (web3) {
			(async () => {
				try {
					await Promise.all([getApy(), getDaysRemaining(), getRewardRate(0)]);
				} catch (error) {
					setIsFetchInfoError(true);
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
					setIsFetchInfoError(true);
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
					setIsFetchInfoError(true);
				}
			})();
		}
	}, [contractStaking, contractStarRunnerToken, getEarned, getStakedBalance, getStruBalance, getAllowance]);

	// Приховування повідомлень про стан транзакцій
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
