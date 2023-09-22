import React, { ReactNode } from "react";

import { InfoContainer } from "../InfoContainer/InfoContainer";
import { Spinner } from "../Spinner/Spinner";

interface ILoadingInfoProps {
	children: ReactNode;
	mobile?: boolean | undefined;
}

export const LoadingInfo: React.FC<ILoadingInfoProps> = ({ children, mobile }) => {
	return (
		<InfoContainer mobile={mobile}>
			<Spinner />
			{children}
		</InfoContainer>
	);
};
