import { Form } from "../Form/Form";

import { useWeb3 } from "../../hooks/useWeb3";

import { TransactionNotifications } from "../TransactionNotifications/TransactionNotifications";

export const StakedForm = () => {
	const {
		struBalance,
		onSubmitStakeHandler,
		numberOfStakeSrtu,
		onChangeInput,
		isErrorApprovePrepare,
		isLoadingApprove,
		isLoadingStake,
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
				<TransactionNotifications mobile={true} />
			</Form>
		</>
	);
};
