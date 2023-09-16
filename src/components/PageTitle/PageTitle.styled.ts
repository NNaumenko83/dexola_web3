import { styled } from "styled-components";

export const PageTitleStyled = styled.h2`
	font-family: Kanit, sans-serif;
	font-size: ${props => props.theme.fontSizes.subTitle.mobile};
	color: ${props => props.theme.colors.subtitle};
	font-weight: ${props => props.theme.fontWeights.medium};

	line-height: 1.5;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		font-size: ${props => props.theme.fontSizes.subTitle.tablet};
	}
`;
