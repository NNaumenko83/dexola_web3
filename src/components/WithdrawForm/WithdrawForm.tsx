import { Form } from "../Form/Form";

import React, { /*useEffect,*/ useState } from "react";
import { useWeb3 } from "../../hooks/useWeb3";

export interface IWithdrawdFormProps {
	onSubmitHandler: React.FormEventHandler<HTMLFormElement>;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	numberOfSrtu: string;

	isLoadingWithdraw: boolean;
	isErrorWithdraw: boolean;
	isSuccessWithdraw: boolean;
}

export const WithdrawForm: React.FC<IWithdrawdFormProps> = () => {
	const { stakedBalance } = useWeb3();

	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		console.log("WithdrawForm");
	};

	const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
		setNumberOfSrtu(e.target.value);
	};

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
