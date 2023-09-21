import { Form } from "../Form/Form";

import { useWeb3 } from "../../hooks/useWeb3";

import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { NumberSTRU } from "./StakedForm.styled";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { SuccessInfo } from "../SuccessInfo/SuccessInfo";

export interface StakedFormProps {
	onSubmitHandler: React.FormEventHandler<HTMLFormElement>;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	numberOfSrtu: string;
	transactionNumberOfStru: string;
	isLoadingApprove: boolean;
	isLoadingStake: boolean;
	isErrorApprove: boolean;
	isErrorStaked: boolean;
	isSuccessApprove: boolean;
	isSuccessStake: boolean;
	isErrorApprovePrepare: Error | null;
}

export const StakedForm: React.FC<StakedFormProps> = ({
	onSubmitHandler,
	onChangeInput,
	numberOfSrtu,
	isLoadingApprove,
	isLoadingStake,
	isErrorApprove,
	isErrorStaked,
	isSuccessApprove,
	isSuccessStake,
	transactionNumberOfStru,
	isErrorApprovePrepare,
}) => {
	const { struBalance } = useWeb3();

	return (
		<>
			<Form
				onSubmitHandler={onSubmitHandler}
				inputName="stake"
				inputValue={numberOfSrtu}
				onChangeInput={onChangeInput}
				buttonText={
					isErrorApprovePrepare ? "APPROVE" : isLoadingApprove ? "APPROVING" : isLoadingStake ? "STAKING" : "STAKE"
				}
				balance={struBalance}
				placeholder={"Enter stake amount"}
			>
				{isSuccessApprove && (
					<SuccessInfo mobile={true}>
						<p>Successfully approved</p>
					</SuccessInfo>
				)}
				{isSuccessStake && (
					<SuccessInfo mobile={true}>
						<p>
							<NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU> successfully <br />
							added to Staking
						</p>
					</SuccessInfo>
				)}
				{isLoadingApprove && (
					<LoadingInfo mobile={true}>
						<p>Approving</p>
					</LoadingInfo>
				)}
				{isLoadingStake && (
					<LoadingInfo mobile={true}>
						<p>
							Adding <NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU> to Staking
						</p>
					</LoadingInfo>
				)}
				{(isErrorApprove || isErrorStaked) && <ErrorMessage mobile={true} />}
			</Form>
		</>
	);
};
