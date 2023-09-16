import { useEffect } from "react";

import {
	HelpIcon,
	Table,
	TableBody,
	TableBottomRow,
	TableCell,
	TableHead,
	TableRow,
	TextValue,
	UnitIconWrapper,
	UnitName,
	TableCellApy,
	NameCell,
	TooltipWrapper,
	ToolTipSTRU,
	ToolTipRewards,
	ToolTipAPR,
	RewardsText,
} from "./HeroTable.styled";
import { useWeb3 } from "../../hooks/useWeb3";

export const HeroTable = () => {
	const { stakedBalance, getStakedBalance, apr, days } = useWeb3();
	// console.log("stakedBalance:", stakedBalance);

	useEffect(() => {
		getStakedBalance();
	}, [getStakedBalance]);

	return (
		<Table>
			<TableHead>
				<TableRow>
					<th>Staked balance</th>
					<th>APY</th>
					<th>Days</th>
					<th>Rewards</th>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<td>
						<TableCell>
							<p>
								<TextValue>{stakedBalance}</TextValue>
							</p>

							<UnitIconWrapper>
								<p>
									<UnitName>STRU</UnitName>
								</p>
								<NameCell>Staked balance</NameCell>
								<TooltipWrapper>
									<HelpIcon name="help_icon" width={16} height={18} />
									<ToolTipSTRU>
										<p>
											Staking rewards get <br />
											allocated on this sum
										</p>
									</ToolTipSTRU>
								</TooltipWrapper>
							</UnitIconWrapper>
						</TableCell>
					</td>
					<td>
						<TableCellApy>
							{apr && (
								<p>
									<TextValue>&#8776;{apr}&#37;</TextValue>
								</p>
							)}
							<NameCell>APR</NameCell>
							<TooltipWrapper>
								<HelpIcon name="help_icon" width={16} height={18} />
								<ToolTipAPR>
									<p>
										Displays the average for APR.
										<br /> Interest rate is calculated for each amount of tokens.
									</p>
								</ToolTipAPR>
							</TooltipWrapper>
						</TableCellApy>
					</td>
					<td>
						<TableCell>
							<p>
								<TextValue>{days}</TextValue>
							</p>
							<NameCell>Days</NameCell>
						</TableCell>
					</td>
					<td>
						<TableCell>
							<p>
								<TextValue>0.00</TextValue>
							</p>
							<UnitIconWrapper>
								<p>
									<UnitName>STRU</UnitName>
								</p>
								<NameCell>Rewards</NameCell>
								<TooltipWrapper>
									<HelpIcon name="help_icon" width={16} height={18} />
									<ToolTipRewards>
										<RewardsText>
											Rewards get allocated <br />
											every second
										</RewardsText>
									</ToolTipRewards>
								</TooltipWrapper>
							</UnitIconWrapper>
						</TableCell>
					</td>
				</TableRow>
				<TableBottomRow>
					<td>
						<p>Staked balance</p>
					</td>
					<td>
						<p>APY</p>
					</td>
					<td>
						<p>Days</p>
					</td>
					<td>
						<p>Rewards</p>
					</td>
				</TableBottomRow>
			</TableBody>
		</Table>
	);
};
