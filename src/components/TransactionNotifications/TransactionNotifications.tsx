import { useWeb3 } from "../../hooks/useWeb3";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { SuccessInfo } from "../SuccessInfo/SuccessInfo";
import { TransactionStatusWrapper } from "../TransactionStatusWrapper/TransactionStatusWrapper";
import { NumberSTRU } from "./TransactionNotifications.styled";

export const TransactionNotifications = () => {
	const {
		isSuccessApprove,
		isSuccessStake,
		isLoadingApprove,
		isLoadingStake,
		isErrorApprove,
		isErrorStaked,
		transactionStakeNumberOfStru,
		transactionWithdrawNumberOfStru,
		isLoadingWithdraw,
		isLoadingWithdrawAll,
		isSuccessWithdrawAll,
		isErrorWithdrawAll,
		isErrorWithdraw,
		isSuccessWithdraw,
	} = useWeb3();

	return (
		<>
			<TransactionStatusWrapper>
				{isSuccessApprove && (
					<SuccessInfo>
						<p>Successfully approved</p>
					</SuccessInfo>
				)}
				{isSuccessStake && (
					<SuccessInfo>
						<p>
							<NumberSTRU>{transactionStakeNumberOfStru} STRU</NumberSTRU> successfully added to Staking
						</p>
					</SuccessInfo>
				)}
				{isLoadingApprove && (
					<LoadingInfo mobile={false}>
						<p>Approving</p>
					</LoadingInfo>
				)}
				{isLoadingStake && (
					<LoadingInfo mobile={false}>
						<p>
							Adding <NumberSTRU>{transactionStakeNumberOfStru} STRU</NumberSTRU> to Staking
						</p>
					</LoadingInfo>
				)}
				{(isErrorApprove || isErrorStaked) && <ErrorMessage mobile={false} />}
				{(isErrorWithdraw || isErrorWithdrawAll) && <ErrorMessage mobile={false} />}
				{/* Виведення інформації про статус транзакцій при знятті зі стейку */}
				{isSuccessWithdraw && (
					<SuccessInfo mobile={false}>
						<p>
							<NumberSTRU>{transactionWithdrawNumberOfStru} STRU</NumberSTRU> successfully withdrawed
						</p>
					</SuccessInfo>
				)}
				{isLoadingWithdraw && (
					<LoadingInfo mobile={false}>
						<p>
							Withdrawing <NumberSTRU>{transactionWithdrawNumberOfStru} STRU</NumberSTRU>
						</p>
					</LoadingInfo>
				)}
				{/* Виведення інформації про статус транзакцій при знятті всього стейку і винагород */}
				{isSuccessWithdrawAll && (
					<SuccessInfo mobile={false}>
						<p>Successfully withdrawed all and rewards</p>
					</SuccessInfo>
				)}
				{isLoadingWithdrawAll && (
					<LoadingInfo mobile={false}>
						<p>Withdrawing all and rewards</p>
					</LoadingInfo>
				)}
			</TransactionStatusWrapper>
		</>
	);
};
