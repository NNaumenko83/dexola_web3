import styled from "styled-components";
import { ContainerStyled } from "../Container/Container.styled";

export const NavMenu = styled.nav`
	display: flex;

	@media screen and (min-width: 744px) {
		max-width: 27.6875rem;
	}
`;

export const Container = styled(ContainerStyled)`
	border-bottom: 1px solid #204ffe;
	padding-top: 16px;
`;
