import { styled } from "styled-components";
import { ContainerStyled } from "../Container/Container.styled";

export const TitleStyled = styled.h1`
	margin-top: 1.75rem;
	margin-bottom: 1.625rem;
	padding-right: 1.25rem;

	color: ${props => props.theme.colors.title};
	font-family: Kanit, sans-serif;
	font-size: ${props => props.theme.fontSizes.title.mobile};
	font-weight: ${props => props.theme.fontWeights.medium};
	line-height: 1.2;

	text-transform: capitalize;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-size: ${props => props.theme.fontSizes.title.tablet};
		line-height: 1.4;
	}

	@media screen and (min-width: ${props => props.theme.breakpoints.web}) {
		margin-top: 1.5rem;

		font-size: ${props => props.theme.fontSizes.title.web};
		line-height: 1.4;
	}
`;

export const ContainerStyledTitle = styled(ContainerStyled)`
	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		padding-left: 0;
		padding-right: 0;
	}
`;
