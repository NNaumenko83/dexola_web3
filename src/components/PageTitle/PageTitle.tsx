import React, { ReactNode } from "react";
import { PageTitleStyled } from "./PageTitle.styled";

type IPageTitle = {
	children: ReactNode;
};

export const PageTitle: React.FC<IPageTitle> = ({ children }) => {
	return <PageTitleStyled>{children}</PageTitleStyled>;
};
