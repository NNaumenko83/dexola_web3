import { styled } from "styled-components";
import { ContainerStyled } from "../Container/Container.styled";

export const FooterContainer = styled(ContainerStyled)`
	padding-top: 1rem;
	padding-bottom: 1rem;

	display: flex;
	justify-content: space-between;
	border-top: 1px solid ${props => props.theme.colors.footerBordersColor};

	/* @media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding-top: 1.75rem;
		padding-bottom: 1.75rem;

		font-size: ${props => props.theme.fontSizes.body.tablet};
		line-height: 1.31;
	} */

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
	background-color: ${props => props.theme.colors.background};

	color: ${props => props.theme.colors.footerTextColor};

	font-size: ${props => props.theme.fontSizes.footerText};
	line-height: 1.28;
	letter-spacing: -0.0175rem;

	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		border: 0;
		padding: 0;

		white-space: nowrap;
		clip-path: inset(100%);
		clip: rect(0 0 0 0);
		overflow: hidden;
	}

	/* @media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		margin-top: 4.75rem;
	}
	@media screen and (min-width: ${props => props.theme.breakpoints.web}) {
		margin-top: 7.8125rem;
	} */
`;
