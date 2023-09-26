import React from "react";
import { useWeb3 } from "../../hooks/useWeb3";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { SuccessInfo } from "../SuccessInfo/SuccessInfo";
import { NumberSTRU } from "./TransactionNotifications.styled";

interface ITransactionNotificationsProps {
	mobile: boolean;
}

export const TransactionNotifications: React.FC<ITransactionNotificationsProps> = ({ mobile }) => {
	const {
		isSuccessApprove,
		isSuccessStake,
		isLoadingApprove,
		isLoadingStake,
		isErrorApprove,
		isErrorStaked,
		transactionStakeNumberOfStru,
		transactionWithdrawNumberOfStru,
		transactionRewardsNumberOfStru,
		isLoadingWithdraw,
		isLoadingWithdrawAll,
		isSuccessWithdrawAll,
		isErrorWithdrawAll,
		isErrorWithdraw,
		isSuccessWithdraw,
		isErrorWithdrawRewards,
		isLoadingWithdrawRewards,
		isSuccessWithdrawRewards,
		isFetchInfoError,
	} = useWeb3();

	return (
		<>
			{isSuccessApprove && (
				<SuccessInfo mobile={mobile}>
					<p>Successfully approved</p>
				</SuccessInfo>
			)}
			{isSuccessStake && (
				<SuccessInfo mobile={mobile}>
					<p>
						<NumberSTRU>{transactionStakeNumberOfStru} STRU</NumberSTRU> successfully added to Staking
					</p>
				</SuccessInfo>
			)}
			{isLoadingApprove && (
				<LoadingInfo mobile={mobile}>
					<p>Approving</p>
				</LoadingInfo>
			)}
			{isLoadingStake && (
				<LoadingInfo mobile={mobile}>
					<p>
						Adding <NumberSTRU>{transactionStakeNumberOfStru} STRU</NumberSTRU> to Staking
					</p>
				</LoadingInfo>
			)}
			{isErrorApprove && <ErrorMessage mobile={mobile} />}
			{isErrorStaked && <ErrorMessage mobile={mobile} />}
			{isErrorWithdraw && <ErrorMessage mobile={mobile} />}
			{isErrorWithdrawAll && <ErrorMessage mobile={mobile} />}
			{isErrorWithdrawRewards && <ErrorMessage mobile={mobile} />}
			{isFetchInfoError && <ErrorMessage mobile={mobile} />}

			{isSuccessWithdraw && (
				<SuccessInfo mobile={mobile}>
					<p>
						<NumberSTRU>{transactionWithdrawNumberOfStru} STRU</NumberSTRU> successfully withdrawed
					</p>
				</SuccessInfo>
			)}
			{isLoadingWithdraw && (
				<LoadingInfo mobile={mobile}>
					<p>
						Withdrawing <NumberSTRU>{transactionWithdrawNumberOfStru} STRU</NumberSTRU>
					</p>
				</LoadingInfo>
			)}
			{/* Виведення інформації про статус транзакцій при знятті всього стейку і винагород */}
			{isSuccessWithdrawAll && (
				<SuccessInfo mobile={mobile}>
					<p>Successfully withdrawed all and rewards</p>
				</SuccessInfo>
			)}
			{isLoadingWithdrawAll && (
				<LoadingInfo mobile={mobile}>
					<p>Withdrawing all and rewards</p>
				</LoadingInfo>
			)}

			{/* Виведення інформації про статус транзакціії зняття винагород */}
			{isSuccessWithdrawRewards && (
				<SuccessInfo mobile={mobile}>
					<p>
						Rewards: <NumberSTRU>{transactionRewardsNumberOfStru} STRU</NumberSTRU> successfully widthdrawed
					</p>
				</SuccessInfo>
			)}
			{isLoadingWithdrawRewards && (
				<LoadingInfo mobile={mobile}>
					<p>
						Withdrawing reward: <NumberSTRU>{transactionRewardsNumberOfStru} STRU</NumberSTRU>
					</p>
				</LoadingInfo>
			)}
		</>
	);
};
