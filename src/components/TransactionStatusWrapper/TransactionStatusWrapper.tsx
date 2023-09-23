import { StatusInfoContainer, TransactionStatusWrapperStyled } from "./TransactionStatusWrapper.styled";
import { TransactionNotifications } from "../TransactionNotifications/TransactionNotifications";

export const TransactionStatusWrapper = () => {
	return (
		<TransactionStatusWrapperStyled>
			<StatusInfoContainer>
				<TransactionNotifications mobile={false} />
			</StatusInfoContainer>
		</TransactionStatusWrapperStyled>
	);
};
