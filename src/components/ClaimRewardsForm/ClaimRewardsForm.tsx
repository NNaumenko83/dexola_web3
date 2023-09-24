import { Form } from "../Form/Form";

import { useWeb3 } from "../../hooks/useWeb3";
import { TransactionNotifications } from "../TransactionNotifications/TransactionNotifications";

export const ClaimRewardsForm = () => {
	const { onSubmitRewardsHandler, earned } = useWeb3();
	return (
		<Form
			onSubmitHandler={onSubmitRewardsHandler}
			buttonText={"Claim rewards"}
			balance={earned ? Number(earned) : null}
		>
			<TransactionNotifications mobile={true} />
		</Form>
	);
};
