import { styled } from "styled-components";
import { StyledButton } from "../Button/Button.styled";

export const HeaderContainer = styled.div`
	/* position: fixed;
	z-index: 2; */

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const HeaderStyled = styled.header`
	width: 100%;
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;
	border: 1px solid red;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding-top: 0.9375rem;
		padding-bottom: 0.9375rem;
	}
`;

export const Button = styled(StyledButton)`
	width: 167px;
	height: 40px;
`;
