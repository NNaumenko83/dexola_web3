import React, { ReactNode } from "react";
import { InfoContainerStyled } from "./InfoContainer.styled";

interface IInfoContainerProps {
	children: ReactNode;
	mobile?: boolean | undefined;
}

export const InfoContainer: React.FC<IInfoContainerProps> = ({ children, mobile }) => {
	return <InfoContainerStyled $mobile={mobile}>{children}</InfoContainerStyled>;
};
