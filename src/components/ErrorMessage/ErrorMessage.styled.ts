import { styled } from "styled-components";

export const ErrorText = styled.p`
	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		display: flex;
		flex-direction: column;
	}
`;

export const ConnectionErrorText = styled.span`
	font-weight: 700;
`;
