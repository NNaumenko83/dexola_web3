import { styled } from "styled-components";

export const SuspenseWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

export const AppWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

export const Test = styled.div`
	flex: 1 1 auto;

	margin-top: -16px;
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
	background-color: black;
`;
