import React, { ReactNode } from "react";
import { TooltipStyled } from "./Tooltip.styled";

type Props = {
	children: ReactNode;
};

export const Tooltip: React.FC<Props> = ({ children }) => {
	return <TooltipStyled>{children}</TooltipStyled>;
};
