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
	} = useWeb3();

	return (
		<>
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
							<NumberSTRU>{transactionStakeNumberOfStru} STRU</NumberSTRU> successfully added to Staking
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
							Adding <NumberSTRU>{transactionStakeNumberOfStru} STRU</NumberSTRU> to Staking
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
