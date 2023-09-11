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
} from "./HeroTable.styled";

export const TestInfoTable = () => {
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
								<TextValue>0.00</TextValue>
							</p>
							<UnitIconWrapper>
								<p>
									<UnitName>STRU</UnitName>
								</p>

								<HelpIcon name="help_icon" width={16} height={18} />
							</UnitIconWrapper>
						</TableCell>
					</td>
					<td>
						<TableCellApy>
							<p>
								<TextValue>≈8%</TextValue>
							</p>
							<HelpIcon name="help_icon" width={16} height={18} />
						</TableCellApy>
					</td>
					<td>
						<TableCell>
							<p>
								<TextValue>0</TextValue>
							</p>
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

								<HelpIcon name="help_icon" width={16} height={18} />
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
