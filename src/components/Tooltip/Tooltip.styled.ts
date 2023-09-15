import styled from "styled-components";

export const TooltipStyled = styled.div`
	position: relative;
	color: black;
	background-color: white;
	padding: 8px 12px;

	width: fit-content;

	/* Для тестування */
	margin-bottom: 50px;

	&::after {
		content: "";
		display: block;

		position: absolute;
		left: 50%;
		bottom: -7px;
		height: 12px;
		width: 12px;

		background-color: white;
		border-radius: 1px;

		transform: rotate(45deg) translate(-50%);
	}
`;
