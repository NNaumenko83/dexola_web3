import { Form } from "../Form/Form";

import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { NumberSTRU } from "../StakedForm/StakedForm.styled";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { SuccessInfo } from "../SuccessInfo/SuccessInfo";
import { useWeb3 } from "../../hooks/useWeb3";

export const ClaimRewardsForm = () => {
	const {
		onSubmitRewardsHandler,
		earned,
		isErrorWithdrawRewards,
		isSuccessWithdrawRewards,
		transactionRewardsNumberOfStru,
		isLoadingWithdrawRewards,
	} = useWeb3();
	return (
		<Form
			onSubmitHandler={onSubmitRewardsHandler}
			buttonText={"Claim rewards"}
			balance={earned ? Number(earned) : null}
		>
			{isErrorWithdrawRewards && <ErrorMessage mobile={true} />}
			{/* Виведення інформації про статус транзакцій при знятті зі стейку */}
			{isSuccessWithdrawRewards && (
				<SuccessInfo mobile={true}>
					<p>
						Reward: <NumberSTRU>{transactionRewardsNumberOfStru} STRU</NumberSTRU> successfully widthdrawed
					</p>
				</SuccessInfo>
			)}
			{isLoadingWithdrawRewards && (
				<LoadingInfo mobile={true}>
					<p>
						Withdrawing reward: <NumberSTRU>{transactionRewardsNumberOfStru} STRU</NumberSTRU>
					</p>
				</LoadingInfo>
			)}
		</Form>
	);
};
