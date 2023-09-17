import { styled } from "styled-components";
import { ContainerStyled } from "../Container/Container.styled";

export const FooterContainer = styled(ContainerStyled)`
	padding-top: 1.0625rem;
	padding-bottom: 1.0625rem;

	display: flex;
	justify-content: space-between;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding-top: 1.75rem;
		padding-bottom: 1.75rem;
	}

	@media screen and (min-width: ${props => props.theme.breakpoints.web}) {
		padding-bottom: 1.625rem;
	}
`;

export const DesignedByText = styled.p`
	/* grid-area: design;
	align-self: end;
	justify-self: center;

	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		margin-top: 8px;
	}

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		justify-self: start;
	}

	@media screen and (min-width: ${props => props.theme.breakpoints.web}) {
		align-self: center;
		justify-self: center;
	} */
`;

export const CopyrightText = styled.p`
	/* grid-area: copy;
	justify-self: center;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		justify-self: start;
		margin-top: 0.125rem;
	}
	@media screen and (min-width: ${props => props.theme.breakpoints.web}) {
		align-self: center;
		justify-self: center;
	} */
`;

export const FooterStyled = styled.footer`
	color: ${props => props.theme.colors.footerTextColor};
	font-size: ${props => props.theme.fontSizes.footerText.mobile};
	line-height: 1.36;
	letter-spacing: -0.22px;

	background-color: ${props => props.theme.colors.background};
	border-top: 1px solid ${props => props.theme.colors.footerBordersColor};

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		background-color: black;
		font-size: ${props => props.theme.fontSizes.footerText.tablet};
		line-height: 1.31;
		letter-spacing: -0.28px;
	}

	@media screen and (min-width: ${props => props.theme.breakpoints.web}) {
		background-color: transparent;
		position: fixed;
		width: 100vw;
		bottom: 0;
		left: 0;
	}
`;
