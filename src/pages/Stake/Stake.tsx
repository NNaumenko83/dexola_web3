import { useAccount } from "wagmi";
import { useDebouncedCallback } from "use-debounce";
import { Container } from "../../components/Container/Container";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import React, { useEffect, useState } from "react";
import { useWeb3 } from "../../hooks/useWeb3";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import contractStakingABI from "../../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../../contracts/contract-tokenTracker-abi.json";
import { validateAmount } from "../../utils/validateAmount";
import { StakedForm, StakedFormProps } from "../../components/StakedForm/StakedForm";
import { TransactionStatusWrapper } from "../../components/TransactionStatusWrapper/TransactionStatusWrapper";
import { LoadingInfo } from "../../components/LoadingInfo/LoadingInfo";
import { NumberSTRU } from "../../components/StakedForm/StakedForm.styled";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { RewardQtyText, RewardRateText, StruWeekText } from "./Stake.styled";
import { SuccessInfo } from "../../components/SuccessInfo/SuccessInfo";

const Stake = () => {
	const { isConnected } = useAccount();
	// const { address } = useAccount();
	const { struBalance, web3, updAll, rewardRate, getRewardRate, balanceStruOnWallet, allowance } = useWeb3();
	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");
	const [transactionNumberOfStru, setTransactionNumberOfStru] = useState<string>("");

	const [isErrorApprove, setIsErrorApprove] = useState(false);
	const [isErrorStaked, setIsErrorStaked] = useState(false);
	const [isSuccessApprove, setIsSuccessApprove] = useState(false);
	const [isSuccessStake, setIsSuccessStake] = useState(false);

	const formattedNumberOfSrtu = web3?.utils.toWei(numberOfSrtu, "ether");
	const debouncedGetRewardRate = useDebouncedCallback(input => getRewardRate(Number(input)), 500);

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
			fetchAllowance();
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

		if (formattedNumberOfSrtu && allowance < BigInt(formattedNumberOfSrtu) && approve) {
			approve();
			setNumberOfSrtu("");
			return;
		}

		if (stake && numberOfSrtu !== "") {
			setTransactionNumberOfStru(numberOfSrtu);
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

	// Пропси для StakedForm
	const stakedFormProps: StakedFormProps = {
		onSubmitHandler,
		onChangeInput,
		numberOfSrtu,
		isLoadingApprove,
		isLoadingStake,
		isErrorApprove,
		isErrorStaked,
		isSuccessApprove,
		isSuccessStake,
		transactionNumberOfStru,
		isErrorApprovePrepare,
	};

	return (
		<>
			<Container>
				<PageWrapper>
					{!isConnected ? (
						<NotConnectedWrapper />
					) : (
						<>
							<PageTitleWrapper>
								<PageTitle>Stake</PageTitle>
								<RewardRateText>
									<span>Reward rate:</span>
									<RewardQtyText>{rewardRate}</RewardQtyText>
									<StruWeekText>STRU/week</StruWeekText>
								</RewardRateText>
							</PageTitleWrapper>
							<StakedForm {...stakedFormProps} />
						</>
					)}
				</PageWrapper>
			</Container>
			{isSuccessApprove && (
				<TransactionStatusWrapper>
					<SuccessInfo>
						<p>Successfully approved</p>
					</SuccessInfo>
				</TransactionStatusWrapper>
			)}
			{isSuccessStake && (
				<TransactionStatusWrapper>
					<SuccessInfo>
						<p>
							<NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU> successfully added to Staking
						</p>
					</SuccessInfo>
				</TransactionStatusWrapper>
			)}
			{isLoadingApprove && (
				<TransactionStatusWrapper>
					<LoadingInfo mobile={false}>
						<p>Approving</p>
					</LoadingInfo>
				</TransactionStatusWrapper>
			)}
			{isLoadingStake && (
				<TransactionStatusWrapper>
					<LoadingInfo mobile={false}>
						<p>
							Adding <NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU> to Staking
						</p>
					</LoadingInfo>
				</TransactionStatusWrapper>
			)}
			{(isErrorApprove || isErrorStaked) && (
				<TransactionStatusWrapper>
					<ErrorMessage mobile={false} />
				</TransactionStatusWrapper>
			)}
		</>
	);
};

export default Stake;
