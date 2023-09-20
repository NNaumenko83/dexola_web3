import React, { ReactNode } from "react";

import { InfoContainer } from "../InfoContainer/InfoContainer";
import Icon from "../Icon/Icon";

interface ISuccessInfoProps {
	children: ReactNode;
	mobile?: boolean | undefined;
}

export const SuccessInfo: React.FC<ISuccessInfoProps> = ({ children, mobile }) => {
	return (
		<InfoContainer mobile={mobile}>
			<Icon name={"successfull_icon"} width={32} height={32} />
			{children}
		</InfoContainer>
	);
};
