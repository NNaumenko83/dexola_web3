import { styled } from "styled-components";

export const StyledButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	cursor: ${props => (props.disabled ? "no-drop" : "pointer")};

	font-size: ${props => props.theme.fontSizes.button.small};
	font-weight: ${props => props.theme.fontWeights.medium};
	line-height: 1.71;
	letter-spacing: 0.0175rem;
	text-transform: uppercase;
	color: ${props => props.theme.colors.buttonTextColor};

	background-color: ${props => props.theme.colors.buttonBackgroundColor};
	transition: all 300ms linear;
	&:not(:disabled):hover,
	&:not(:disabled):focus {
		background-color: ${props => props.theme.colors.buttonHoverBackgroundColor};
	}

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		font-size: ${props => props.theme.fontSizes.button.medium};
		line-height: 1.5;
		letter-spacing: 0.02rem;
	}
`;
