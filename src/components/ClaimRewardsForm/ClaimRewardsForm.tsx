import { Form } from "../Form/Form";

import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { NumberSTRU } from "../StakedForm/StakedForm.styled";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { SuccessInfo } from "../SuccessInfo/SuccessInfo";

export interface IClaimRewardsFormProps {
	onSubmitHandler: React.FormEventHandler<HTMLFormElement>;
	earned: number | null;
	transactionNumberOfStru: string;
	isLoadingWithdrawRewards: boolean;
	isErrorWithdrawRewards: boolean;
	isSuccessWithdrawRewards: boolean;
}

export const ClaimRewardsForm: React.FC<IClaimRewardsFormProps> = ({
	onSubmitHandler,
	earned,
	transactionNumberOfStru,
	isLoadingWithdrawRewards,
	isErrorWithdrawRewards,
	isSuccessWithdrawRewards,
}) => {
	return (
		<Form onSubmitHandler={onSubmitHandler} buttonText={"Claim rewards"} balance={earned ? Number(earned) : null}>
			{isErrorWithdrawRewards && <ErrorMessage mobile={true} />}
			{/* Виведення інформації про статус транзакцій при знятті зі стейку */}
			{isSuccessWithdrawRewards && (
				<SuccessInfo mobile={true}>
					<p>
						Reward: <NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU> successfully widthdrawed
					</p>
				</SuccessInfo>
			)}
			{isLoadingWithdrawRewards && (
				<LoadingInfo mobile={true}>
					<p>
						Witdrawing reward: <NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU>
					</p>
				</LoadingInfo>
			)}
		</Form>
	);
};
