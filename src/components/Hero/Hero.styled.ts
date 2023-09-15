import { styled } from "styled-components";
import { ContainerStyled } from "../Container/Container.styled";

export const HeroContainer = styled(ContainerStyled)``;

export const HeroSectionStyled = styled.section`
	background-color: #1e2746;
	padding-top: 4.0625rem;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding-top: 6.375rem;
	}
	@media screen and (min-width: ${props => props.theme.breakpoints.web}) {
		padding-top: 5.875rem;
	}
`;
