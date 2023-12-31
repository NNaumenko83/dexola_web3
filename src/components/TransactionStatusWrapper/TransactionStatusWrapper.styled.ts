import { styled } from "styled-components";
import { ContainerStyled } from "../Container/Container.styled";

export const TransactionStatusWrapperStyled = styled.div`
	display: flex;
	width: 100vw;
	justify-content: flex-end;
	position: absolute;
	right: 0;
	bottom: 1rem;
	@media screen and (min-width: 744px) {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	@media screen and (min-width: 1440px) {
		bottom: 5.625rem;
	}
`;

export const StatusInfoContainer = styled(ContainerStyled)`
	width: 100%;
	display: flex;
	gap: 20px;
	justify-content: end;
`;
