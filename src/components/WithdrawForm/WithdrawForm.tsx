import { Form } from "../Form/Form";

import { useWeb3 } from "../../hooks/useWeb3";
import { TransactionNotifications } from "../TransactionNotifications/TransactionNotifications";

export const WithdrawForm = () => {
	const { stakedBalance, onSubmitWidthdrawHandler, numberOfWithdrawSrtu, onChangeInput } = useWeb3();

	return (
		<Form
			onSubmitHandler={onSubmitWidthdrawHandler}
			inputName="withdraw"
			inputValue={numberOfWithdrawSrtu}
			onChangeInput={onChangeInput}
			buttonText={"Withdraw"}
			balance={stakedBalance}
			placeholder={"Enter withdraw amount"}
		>
			<TransactionNotifications mobile={true} />
		</Form>
	);
};
