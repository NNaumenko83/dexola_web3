import React, { ReactNode } from "react";
import { PageTitleWrapperStyled } from "./PageTitleWrapper.styled";

type IPageTitleWrapper = {
	children: ReactNode;
};

export const PageTitleWrapper: React.FC<IPageTitleWrapper> = ({ children }) => {
	return <PageTitleWrapperStyled>{children}</PageTitleWrapperStyled>;
};
