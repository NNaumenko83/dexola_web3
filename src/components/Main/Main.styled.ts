import { styled } from "styled-components";

export const MainStyled = styled.main`
	flex: 1 1 auto;
	/* padding-top: 4.0625rem; */

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		/* padding-top: 6.375rem; */
	}
	@media screen and (min-width: ${props => props.theme.breakpoints.web}) {
	}
`;
