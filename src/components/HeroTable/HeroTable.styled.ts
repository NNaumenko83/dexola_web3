import { styled } from "styled-components";
import Icon from "../Icon/Icon";

export const Table = styled.table`
	margin-bottom: 1.5rem;
	width: 100%;
	max-width: 23.4375rem;
	border-collapse: collapse;

	font-size: ${props => props.theme.fontSizes.table.mobile};
	line-height: 1.33;
	letter-spacing: -0.015rem;
	color: ${props => props.theme.colors.tableTextColor};

	@media screen and (min-width: 744px) {
		margin-bottom: 2rem;
		max-width: 41.375rem;

		font-size: ${props => props.theme.fontSizes.table.tablet};
		line-height: 1.31;
		letter-spacing: -0.02rem;
	}
	@media screen and (min-width: 1440px) {
		margin-bottom: 3rem;
		max-width: 52.0625rem;

		font-size: ${props => props.theme.fontSizes.table.web};
	}
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
`;

export const TableRow = styled.tr`
	@media screen and (min-width: 375px) {
		& > :nth-child(1) {
			min-width: 7.375rem;
		}

		& > :nth-child(2) {
			min-width: 3.75rem;
		}

		& > :nth-child(3) {
			min-width: 2.9375rem;
		}

		& > :nth-child(4) {
			max-width: 15.25rem;
		}
	}

	@media screen and (min-width: 744px) {
		& > :nth-child(1) {
			width: 12.125rem;
		}

		& > :nth-child(2) {
			width: 7rem;
		}

		& > :nth-child(3) {
			width: 7rem;
		}

		& > :nth-child(4) {
			width: 15.25rem;
		}
	}

	@media screen and (min-width: 1440px) {
		& > :nth-child(1) {
			width: 21.8125rem;
		}

		& > :nth-child(2) {
			width: 12.0625rem;
		}

		& > :nth-child(3) {
			width: 7rem;
		}

		& > :nth-child(4) {
			width: 11.1875rem;
		}
	}
`;

export const TableBottomRow = styled(TableRow)`
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
		margin-bottom: 0.25rem;
	}

	@media screen and (min-width: 744px) {
		align-items: baseline;
	}
`;

export const TableCellApy = styled(TableCell)`
	align-items: center;
	@media screen and (min-width: 744px) {
		& > :nth-child(3) {
			transform: translate(0, 4px);
		}
	}
	@media screen and (min-width: 1440px) {
		align-items: baseline;
		& > :nth-child(3) {
		}
	}
`;

export const HelpIcon = styled(Icon)`
	margin-left: 0.125rem;

	stroke: ${props => props.theme.colors.helpIconColorMobile};

	/* fill: #b3b3b3; */
	@media screen and (min-width: 744px) {
		width: 1.5rem;
		height: 1.5rem;
		stroke: ${props => props.theme.colors.helpIconColorTabletWeb};
		margin-left: 0.25rem;
	}
`;

export const TextValue = styled.span`
	font-size: ${props => props.theme.fontSizes.textValueTable.mobile};
	font-weight: ${props => props.theme.fontWeights.bold};
	line-height: 1.33;
	letter-spacing: -0.36px;
	text-transform: uppercase;

	@media screen and (min-width: 744px) {
		font-size: ${props => props.theme.fontSizes.textValueTable.tablet};
		line-height: 1.71;
	}

	@media screen and (min-width: 1440px) {
		font-size: ${props => props.theme.fontSizes.textValueTable.web};
		line-height: 1.33;
	}
`;

export const UnitName = styled.span`
	margin-left: 0.25rem;
	line-height: 1.66;
	text-transform: uppercase;

	@media screen and (min-width: 744px) {
		line-height: 1.25;
	}
`;

export const UnitIconWrapper = styled.div`
	display: flex;
	align-items: center;
	@media screen and (min-width: 744px) and (max-width: 1439px) {
		& > :nth-child(3) {
			transform: translate(0, -0.125rem);
		}
	}
	@media screen and (min-width: 1440px) {
		align-items: baseline;
		& > :nth-child(3) {
			transform: translate(0, 0.25rem);
		}
	}
`;

export const NameCell = styled.p`
	@media screen and (max-width: 1439px) {
		display: none;
	}
	margin-left: 0.75rem;
`;
