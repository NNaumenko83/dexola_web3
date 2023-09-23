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
			</TransactionStatusWrapper>
		</>
	);
};
