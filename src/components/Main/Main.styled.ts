import { styled } from "styled-components";

export const MainStyled = styled.main`
	flex: 1 1 auto;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
	}
	@media screen and (min-width: ${props => props.theme.breakpoints.web}) {
	}
`;
