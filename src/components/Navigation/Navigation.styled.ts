import styled from "styled-components";
import { ContainerStyled } from "../Container/Container.styled";

export const NavMenu = styled.nav`
	display: flex;

	@media screen and (min-width: 744px) {
		max-width: 27.6875rem;
		& > :nth-child(1) {
			min-width: 113px;
		}
		& > :nth-child(2) {
			min-width: 141px;
		}
		& > :nth-child(3) {
			min-width: 189px;
		}
	}
`;

export const Container = styled(ContainerStyled)`
	padding-top: 1rem;

	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		border-bottom: 0.0625rem solid #204ffe;
	}
`;

export const LinkWrapper = styled.div`
	flex-basis: calc(100% / 3);
`;
