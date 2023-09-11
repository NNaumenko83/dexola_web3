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
`;

export const TableCell = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: baseline;
	margin-bottom: 4px;
	width: auto;
`;

export const HelpIcon = styled(Icon)`
	margin-left: 5px;
	/* position: absolute; */
	/* right: 0; */
	outline: 1px solid yellow;
`;

export const TextValue = styled.span`
	color: #ffffff;
	font-family: Roboto Mono;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.36px;

	outline: 1px solid red;
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

	outline: 1px solid green;
`;
