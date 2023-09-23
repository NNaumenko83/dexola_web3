import { Form } from "../Form/Form";

import { useWeb3 } from "../../hooks/useWeb3";

import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { NumberSTRU } from "./StakedForm.styled";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { SuccessInfo } from "../SuccessInfo/SuccessInfo";

export const StakedForm = () => {
	const {
		struBalance,
		onSubmitStakeHandler,
		numberOfStakeSrtu,
		onChangeInput,
		isErrorApprovePrepare,
		isLoadingApprove,
		isLoadingStake,
		isSuccessApprove,
		isSuccessStake,
		isErrorStaked,
		isErrorApprove,
		transactionStakeNumberOfStru,
	} = useWeb3();

	return (
		<>
			<Form
				onSubmitHandler={onSubmitStakeHandler}
				inputName="stake"
				inputValue={numberOfStakeSrtu}
				onChangeInput={onChangeInput}
				buttonText={
					Number(numberOfStakeSrtu) && isErrorApprovePrepare
						? "APPROVE"
						: isLoadingApprove
						? "APPROVING"
						: isLoadingStake
						? "STAKING"
						: "STAKE"
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
							<NumberSTRU>{transactionStakeNumberOfStru} STRU</NumberSTRU> successfully <br />
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
							Adding <NumberSTRU>{transactionStakeNumberOfStru} STRU</NumberSTRU> to Staking
						</p>
					</LoadingInfo>
				)}
				{(isErrorApprove || isErrorStaked) && <ErrorMessage mobile={true} />}
			</Form>
		</>
	);
};
