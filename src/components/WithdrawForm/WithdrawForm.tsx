import { Form } from "../Form/Form";

import { useWeb3 } from "../../hooks/useWeb3";
import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { SuccessInfo } from "../SuccessInfo/SuccessInfo";
import { NumberSTRU } from "../StakedForm/StakedForm.styled";

export const WithdrawForm = () => {
	const {
		stakedBalance,
		onSubmitWidthdrawHandler,
		numberOfWithdrawSrtu,
		onChangeInput,
		isErrorWithdrawAll,
		isSuccessWithdrawAll,
		transactionWithdrawNumberOfStru,
		isLoadingWithdrawAll,
		isSuccessWithdraw,
		isErrorWithdraw,
		isLoadingWithdraw,
	} = useWeb3();

	return (
		<Form
			onSubmitHandler={onSubmitWidthdrawHandler}
			inputName="withdraw"
			inputValue={numberOfWithdrawSrtu}
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
						<NumberSTRU>{transactionWithdrawNumberOfStru} STRU</NumberSTRU> successfully withdrawed
					</p>
				</SuccessInfo>
			)}
			{isLoadingWithdraw && (
				<LoadingInfo mobile={true}>
					<p>
						Withdrawing <NumberSTRU>{transactionWithdrawNumberOfStru} STRU</NumberSTRU>
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
					<p>Withdrawing all and rewards</p>
				</LoadingInfo>
			)}
		</Form>
	);
};
