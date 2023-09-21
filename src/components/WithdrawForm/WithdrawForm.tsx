import { Form } from "../Form/Form";

import React from "react";
import { useWeb3 } from "../../hooks/useWeb3";
import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { SuccessInfo } from "../SuccessInfo/SuccessInfo";
import { NumberSTRU } from "../StakedForm/StakedForm.styled";

export interface IWithdrawdFormProps {
	onSubmitHandler: React.FormEventHandler<HTMLFormElement>;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	numberOfSrtu: string;
	transactionNumberOfStru: string;
	isLoadingWithdraw: boolean;
	isErrorWithdraw: boolean;
	isSuccessWithdraw: boolean;
	isSuccessWithdrawAll: boolean;
	isErrorWithdrawAll: boolean;
	isLoadingWithdrawAll: boolean;
}

export const WithdrawForm: React.FC<IWithdrawdFormProps> = ({
	onSubmitHandler,
	onChangeInput,
	numberOfSrtu,
	isLoadingWithdraw,
	isErrorWithdraw,
	isSuccessWithdraw,
	transactionNumberOfStru,
	isSuccessWithdrawAll,
	isErrorWithdrawAll,
	isLoadingWithdrawAll,
}) => {
	const { stakedBalance } = useWeb3();

	return (
		<Form
			onSubmitHandler={onSubmitHandler}
			inputName="withdraw"
			inputValue={numberOfSrtu}
			onChangeInput={onChangeInput}
			buttonText={"Withdraw"}
			// isLoading={isLoadingApprove}
			balance={stakedBalance}
			placeholder={"Enter withdraw amount"}
		>
			{(isErrorWithdraw || isErrorWithdrawAll) && <ErrorMessage mobile={true} />}
			{/* Виведення інформації про статус транзакцій при знятті зі стейку */}
			{isSuccessWithdraw && (
				<SuccessInfo mobile={true}>
					<p>
						<NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU> successfully <br />
						added to Staking
					</p>
				</SuccessInfo>
			)}
			{isLoadingWithdraw && (
				<LoadingInfo mobile={true}>
					<p>
						Witdrawing <NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU>
					</p>
				</LoadingInfo>
			)}
			{/* Виведення інформації про статус транзакцій при знятті всього стейку і винагород */}
			{isSuccessWithdrawAll && (
				<SuccessInfo mobile={true}>
					<p>Successfully withdrawed all and rewards</p>
				</SuccessInfo>
			)}
			{isLoadingWithdrawAll && (
				<LoadingInfo mobile={true}>
					<p>Witdrawing all and rewards</p>
				</LoadingInfo>
			)}
		</Form>
	);
};
