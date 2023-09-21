import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";

import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { ClaimRewardsForm } from "../../components/ClaimRewardsForm/ClaimRewardsForm";

import { useWeb3 } from "../../hooks/useWeb3";
import { useEffect, useState } from "react";
import contractStakingABI from "../../contracts/contract-staking-abi.json";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionStatusWrapper } from "../../components/TransactionStatusWrapper/TransactionStatusWrapper";
import { SuccessInfo } from "../../components/SuccessInfo/SuccessInfo";
import { NumberSTRU } from "../../components/StakedForm/StakedForm.styled";
import { LoadingInfo } from "../../components/LoadingInfo/LoadingInfo";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { IClaimRewardsFormProps } from "../../components/ClaimRewardsForm/ClaimRewardsForm";

const ClaimRewardss = () => {
	const { isConnected } = useAccount();
	const { earned, updAll } = useWeb3();

	const [transactionNumberOfStru, setTransactionNumberOfStru] = useState<string>("");
	const [isSuccessWithdrawRewards, setIsSuccessWithdrawRewards] = useState(false);
	const [isErrorWithdrawRewards, setIsErrorWithdrawRewards] = useState(false);

	useEffect(() => {
		if (isSuccessWithdrawRewards) {
			setTimeout(() => {
				setIsSuccessWithdrawRewards(false);
			}, 8000);
		}
		if (isErrorWithdrawRewards) {
			setTimeout(() => {
				setIsErrorWithdrawRewards(false);
			}, 8000);
		}
	}, [isErrorWithdrawRewards, isSuccessWithdrawRewards]);

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

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		if (claimRewards && earned) {
			setTransactionNumberOfStru(earned.toString());
			claimRewards();
		}
	};

	const stakedFormProps: IClaimRewardsFormProps = {
		onSubmitHandler,
		earned,
		transactionNumberOfStru,
		isLoadingWithdrawRewards,
		isErrorWithdrawRewards,
		isSuccessWithdrawRewards,
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
								<PageTitle>Claim rewards</PageTitle>
							</PageTitleWrapper>
							<ClaimRewardsForm {...stakedFormProps} />
						</>
					)}
				</PageWrapper>
			</Container>
			{isErrorWithdrawRewards && (
				<TransactionStatusWrapper>
					<ErrorMessage mobile={false} />
				</TransactionStatusWrapper>
			)}
			{/* Виведення інформації про статус транзакціії зняття винагород */}
			{isSuccessWithdrawRewards && (
				<TransactionStatusWrapper>
					<SuccessInfo mobile={false}>
						<p>
							Rewards: <NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU> successfully widthdrawed
						</p>
					</SuccessInfo>
				</TransactionStatusWrapper>
			)}
			{isLoadingWithdrawRewards && (
				<TransactionStatusWrapper>
					<LoadingInfo mobile={false}>
						<p>
							Withdrawing reward: <NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU>
						</p>
					</LoadingInfo>
				</TransactionStatusWrapper>
			)}
		</>
	);
};

export default ClaimRewardss;
