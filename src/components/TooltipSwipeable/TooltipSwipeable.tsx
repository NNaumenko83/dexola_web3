import { Grabber } from "./TooltipSwipeable.styled";
import { useSwipeable } from "react-swipeable";
import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";
import { createPortal } from "react-dom";
import React from "react";

const TooltipBackdrop = styled(animated.div)<{ $pointerEv: boolean }>`
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
	pointer-events: ${props => (props.$pointerEv ? "auto" : "none")};
`;

const Tooltip = styled(animated.div)`
	width: 100%;
	height: 275px;
	position: absolute;

	display: flex;
	gap: 16px;
	flex-direction: column;
	align-items: center;

	padding: 20px;
	left: 0;
	bottom: 0;
	background-color: white;
	border-radius: 16px 16px 0 0;

	color: rgba(0, 0, 0, 0.8);
	font-family: Roboto Mono, sans-serif;
	font-size: 14px;
	font-weight: 400;
	line-height: 1.14;
`;

const tooltip: HTMLElement | null = document.getElementById("tooltip-root");
console.log("tooltip:", tooltip);

interface ITooltipSwipeable {
	isTooltipVisible: boolean;
	toggleTooltipVisible: () => void;
	text: string;
}

export const TooltipSwipeable: React.FC<ITooltipSwipeable> = ({ isTooltipVisible, toggleTooltipVisible, text }) => {
	const handlers = useSwipeable({
		onSwipedDown: () => {
			toggleTooltipVisible();
		},
	});

	const stylesBackdrop = useSpring({
		opacity: isTooltipVisible ? 1 : 0,
		config: config.default,
	});

	const stylesTooltip = useSpring({
		y: isTooltipVisible ? 0 : 600,
	});

	if (tooltip) {
		return createPortal(
			<TooltipBackdrop style={stylesBackdrop} $pointerEv={isTooltipVisible}>
				<Tooltip style={stylesTooltip} {...handlers}>
					<Grabber></Grabber>
					{text}
				</Tooltip>
			</TooltipBackdrop>,
			tooltip,
		);
	} else {
		return null;
	}
};
