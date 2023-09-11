import { styled } from "styled-components";
import Icon from "../Icon/Icon";

export const Table = styled.table`
	width: 100%;
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
`;

export const TableRow = styled.tr`
	/* outline: 1px solid red; */
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
		display: none;
	}
`;

export const TableCell = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	margin-bottom: 4px;
`;

export const TableCellApy = styled(TableCell)`
	align-items: center;
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

	/* outline: 1px solid green; */
`;

export const UnitIconWrapper = styled.div`
	display: flex;
	align-items: center;
`;
