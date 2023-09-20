import { Form } from "../Form/Form";

import React, { /*useEffect,*/ useState } from "react";
import { useWeb3 } from "../../hooks/useWeb3";

export interface IWithdrawdFormProps {
	onSubmitHandler: React.FormEventHandler<HTMLFormElement>;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	numberOfSrtu: string;
	transactionNumberOfStru: string;
	isLoadingWithdraw: boolean;
	isErrorWithdraw: boolean;
	isSuccessWithdraw: boolean;
}

export const WithdrawForm: React.FC<IWithdrawdFormProps> = ({
	onSubmitHandler,
	onChangeInput,
	numberOfSrtu,
	isLoadingWithdraw,
	isErrorWithdraw,
	isSuccessWithdraw,
	transactionNumberOfStru,
}) => {
	const { stakedBalance } = useWeb3();

	return (
		<Form
			onSubmitHandler={onSubmitHandler}
			inputName="stake"
			inputValue={numberOfSrtu}
			onChangeInput={onChangeInput}
			buttonText={"Withdraw"}
			// isLoading={isLoadingApprove}
			balance={stakedBalance}
			placeholder={"Enter withdraw amount"}
		>
			<></>
		</Form>
	);
};
