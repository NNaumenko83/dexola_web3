import React, { ReactNode } from "react";
import { StatusInfoContainer, TransactionStatusWrapperStyled } from "./TransactionStatusWrapper.styled";

interface ITransactionStatusWrapperProps {
	children: ReactNode;
}

export const TransactionStatusWrapper: React.FC<ITransactionStatusWrapperProps> = ({ children }) => {
	return (
		<TransactionStatusWrapperStyled>
			<StatusInfoContainer>{children}</StatusInfoContainer>
		</TransactionStatusWrapperStyled>
	);
};
