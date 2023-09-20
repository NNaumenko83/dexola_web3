import { Form } from "../Form/Form";

import { useWeb3 } from "../../hooks/useWeb3";

import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { NumberSTRU } from "./StakedForm.styled";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export interface StakedFormProps {
	onSubmitHandler: React.FormEventHandler<HTMLFormElement>;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	numberOfSrtu: string;
	isLoadingApprove: boolean;
	isLoadingStake: boolean;
	isErrorApprove: boolean;
	isErrorStaked: boolean;
}

export const StakedForm: React.FC<StakedFormProps> = ({
	onSubmitHandler,
	onChangeInput,
	numberOfSrtu,
	isLoadingApprove,
	isLoadingStake,
	isErrorApprove,
	isErrorStaked,
}) => {
	const { struBalance } = useWeb3();
	console.log("isLoadingApprove:", isLoadingApprove);

	return (
		<>
			<Form
				onSubmitHandler={onSubmitHandler}
				inputName="stake"
				inputValue={numberOfSrtu}
				onChangeInput={onChangeInput}
				buttonText={isLoadingApprove ? "APPROVE WAITING" : isLoadingStake ? "STAKE LOADING" : "STAKE"}
				balance={struBalance}
				placeholder={"Enter stake amount"}
			>
				{isLoadingApprove && (
					<LoadingInfo mobile={true}>
						<p>
							Adding <NumberSTRU>{numberOfSrtu} STRU</NumberSTRU> to Staking
						</p>
					</LoadingInfo>
				)}
				{(isErrorApprove || isErrorStaked) && <ErrorMessage mobile={true} />}
			</Form>
		</>
	);
};
