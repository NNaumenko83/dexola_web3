import React, { ReactNode } from "react";
import { TransactionStatusWrapperStyled } from "./TransactionStatusWrapper.styled";

interface ITransactionStatusWrapperProps {
	children: ReactNode;
}

export const TransactionStatusWrapper: React.FC<ITransactionStatusWrapperProps> = ({ children }) => {
	return <TransactionStatusWrapperStyled>{children}</TransactionStatusWrapperStyled>;
};
