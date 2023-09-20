import { styled } from "styled-components";

export const RewardRateText = styled.p`
	display: flex;
	gap: 4px;
	align-items: baseline;
	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		font-size: 16px;
		line-height: 1.31;
		letter-spacing: -0.32px;
	}
`;

export const RewardQtyText = styled.span`
	color: #fff;
	font-size: 18px;
	font-weight: 700;
	line-height: 1.4;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		font-size: 20px;
	}
`;

export const StruWeekText = styled.span`
	color: #fff;
	font-size: 12px;
	line-height: 1.33;
	text-transform: uppercase;
	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		font-size: 16px;
	}
`;
