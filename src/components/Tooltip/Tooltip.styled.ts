import styled from "styled-components";

export const TooltipStyled = styled.div`
	position: absolute;
	left: -68px;
	top: -55px;

	color: black;

	background-color: white;
	padding: 8px 12px;

	width: fit-content;

	font-family: "Inter", sans-serif;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px; /* 114.286% */

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

	@media screen and (max-width: 1440px) {
		display: none;
	}
`;
