import { styled } from "styled-components";
import Icon from "../Icon/Icon";

export const Table = styled.table`
	width: 100%;
	max-width: 662px;
	border-collapse: collapse;
	/* border-spacing: 4px; */
`;

export const TableHead = styled.thead`
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	border: 0;
	padding: 0;

	white-space: nowrap;
	clip-path: inset(100%);
	clip: rect(0 0 0 0);
	overflow: hidden;
`;

export const TableBody = styled.tbody`
	width: 100%;

	/* border: 1px solid blue; */
	@media screen and (min-width: 375px) {
	}
`;

export const TableRow = styled.tr`
	/* outline: 1px solid red; */

	@media screen and (min-width: 375px) {
		& > :nth-child(1) {
			min-width: 118px;
		}

		& > :nth-child(2) {
			min-width: 60px;
		}

		& > :nth-child(3) {
			min-width: 47px;
		}

		& > :nth-child(4) {
			max-width: 244px;
		}
	}

	@media screen and (min-width: 744px) {
		& > :nth-child(1) {
			width: 194px;
		}

		& > :nth-child(2) {
			width: 112px;
		}

		& > :nth-child(3) {
			width: 112x;
		}

		& > :nth-child(4) {
			width: 244px;
		}
	}
`;

export const TableBottomRow = styled(TableRow)`
	color: #ffffff;
	font-family: Roboto Mono;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: -0.24px;

	@media screen and (min-width: 744px) {
		font-size: 16px;

		line-height: normal;
		letter-spacing: -0.32px;
	}
	@media screen and (min-width: 1440px) {
		display: none;
	}
`;

export const TableCell = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	@media screen and (max-width: 743px) {
		margin-bottom: 4px;
	}

	@media screen and (min-width: 744px) {
		align-items: baseline;
	}
`;

export const TableCellApy = styled(TableCell)`
	align-items: center;
	@media screen and (min-width: 744px) {
		& > :nth-child(2) {
			transform: translate(0, 3px);
		}
	}
`;

export const HelpIcon = styled(Icon)`
	margin-left: 2px;
	/* fill: red; */

	stroke: #b3b3b3;

	/* fill: #b3b3b3; */
	@media screen and (min-width: 744px) {
		width: 24px;
		height: 24px;
		stroke: #ffffff;
		margin-left: 4px;
	}
`;

export const TextValue = styled.span`
	color: #ffffff;
	font-family: Roboto Mono;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.36px;

	@media screen and (min-width: 744px) {
		font-size: 28px;

		line-height: 48px; /* 171.429% */
		text-transform: uppercase;
	}

	/* outline: 1px solid red; */
`;

export const UnitName = styled.span`
	margin-left: 4px;

	color: #ffffff;
	font-family: Roboto Mono;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px; /* 166.667% */
	text-transform: uppercase;

	@media screen and (min-width: 744px) {
		font-size: 16px;

		font-weight: 400;
		line-height: 20px; /* 125% */
	}

	/* outline: 1px solid green; */
`;

export const UnitIconWrapper = styled.div`
	display: flex;
	align-items: center;
	@media screen and (min-width: 744px) {
		& > :nth-child(2) {
			transform: translate(0, -2px);
		}
	}
`;
