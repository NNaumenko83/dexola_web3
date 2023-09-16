import React, { ReactNode } from "react";
import { PageWrapperStyled } from "./PageWrapper.styled";

type IPageWrapper = {
	children: ReactNode;
};

export const PageWrapper: React.FC<IPageWrapper> = ({ children }) => {
	return <PageWrapperStyled>{children}</PageWrapperStyled>;
};
