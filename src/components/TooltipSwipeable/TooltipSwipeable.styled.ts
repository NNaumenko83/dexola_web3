import { styled } from "styled-components";

export const TooltipContainer = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.6);
	padding: 16px;
	box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.2);
	transition: bottom 0.3s ease-in-out;
	z-index: 999;
`;

export const Tooltip = styled.div`
	width: 100%;
	height: 50%;
	position: absolute;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	left: 0;
	bottom: 0;
	background-color: white;
	border-radius: 16px 16px 0 0;
`;

export const Grabber = styled.div`
	width: 36px;
	height: 5px;
	border-radius: 2.5px;
	background: rgba(60, 60, 67, 0.3);
`;
