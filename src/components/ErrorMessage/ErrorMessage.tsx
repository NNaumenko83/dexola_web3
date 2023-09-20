import Icon from "../Icon/Icon";
import { InfoContainer } from "../InfoContainer/InfoContainer";
import React from "react";
import { ConnectionErrorText, ErrorText } from "./ErrorMessage.styled";

interface IErrorMessageProps {
	mobile?: boolean | undefined;
}

export const ErrorMessage: React.FC<IErrorMessageProps> = ({ mobile }) => {
	return (
		<InfoContainer mobile={mobile}>
			<Icon name={"error_icon"} width={32} height={32} />
			<ErrorText>
				<ConnectionErrorText>Connection Error.</ConnectionErrorText>Please try again
			</ErrorText>
		</InfoContainer>
	);
};
