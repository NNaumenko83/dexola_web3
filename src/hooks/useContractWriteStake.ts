import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useWeb3 } from "./useWeb3";
import { validateAmount } from "../utils/validateAmount";
import contractStakingABI from "../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../contracts/contract-tokenTracker-abi.json";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

export const useContractWriteStake = () => {
	const { struBalance, web3, updAll, getRewardRate, balanceStruOnWallet, allowance, getAllowance } = useWeb3();
	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");
	const [transactionStakeNumberOfStru, setTransactionStakeNumberOfStru] = useState<string>("");
	const [isErrorApprove, setIsErrorApprove] = useState(false);
	const [isErrorStaked, setIsErrorStaked] = useState(false);
	const [isSuccessApprove, setIsSuccessApprove] = useState(false);
	const [isSuccessStake, setIsSuccessStake] = useState(false);

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
	}, [isErrorApprove, isErrorStaked, isSuccessApprove, isSuccessStake]);

	const formattedNumberOfSrtu = web3?.utils.toWei(numberOfSrtu, "ether");
	const debouncedGetRewardRate = useDebouncedCallback(input => getRewardRate(Number(input)), 500);

	const { config: approveConfig } = usePrepareContractWrite({
		address: "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83",
		abi: contractStarRunnerTokenABI,
		functionName: "approve",
		args: ["0x2f112ed8a96327747565f4d4b4615be8fb89459d", struBalance ? web3?.utils.toWei(struBalance, "ether") : 0],
		enabled: Boolean(numberOfSrtu),
	});

	const { config: stakeConfig, error: isErrorApprovePrepare } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "stake",
		args: [formattedNumberOfSrtu],
		enabled: Boolean(numberOfSrtu),
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
			setNumberOfSrtu("");
		},
		onError() {
			setIsErrorStaked(true);
		},
	});

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		if (formattedNumberOfSrtu && allowance && allowance < BigInt(formattedNumberOfSrtu) && approve) {
			approve();
			setNumberOfSrtu("");
			return;
		}

		if (stake && numberOfSrtu !== "") {
			setTransactionStakeNumberOfStru(numberOfSrtu);
			stake();
			return;
		}
	};

	const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
		const inputText = e.target.value;

		if (!validateAmount(inputText) && inputText === "") {
			setNumberOfSrtu(inputText);
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
		setNumberOfSrtu(inputText);
	};

	return {
		transactionStakeNumberOfStru,
		isErrorApprove,
		isErrorStaked,
		isSuccessApprove,
		isSuccessStake,
		onSubmitHandler,
		onChangeInput,
		isLoadingApprove,
		isLoadingStake,
		isErrorApprovePrepare,
		numberOfSrtu,
	};
};
