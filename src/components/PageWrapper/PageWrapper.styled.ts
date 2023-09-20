import { styled } from "styled-components";

export const PageWrapperStyled = styled.div`
	width: 100%;
	height: 100%;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) and (max-width: 1443px) {
		margin-bottom: 60px;
	}

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		border: 1px solid #204ffe;
		padding: 32px 24px;
	}
`;
