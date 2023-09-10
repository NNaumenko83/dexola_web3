import { HelpIcon, Table, TableBody, TableBottomRow, TableCell, TableHead, TableRow } from "./HeroTable.styled";

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
								<span>0.00</span>
								<span>STRU</span>
							</p>
							<HelpIcon name="help_icon" width={11} height={11} />
						</TableCell>
					</td>
					<td>
						<TableCell>
							<p>≈8%</p> <HelpIcon name="help_icon" width={11} height={11} />
						</TableCell>
					</td>
					<td>
						<TableCell>
							<p>0</p>
						</TableCell>
					</td>
					<td>
						<TableCell>
							<p>
								<span>0.00</span>
								<span>STRU</span>
							</p>
							<HelpIcon name="help_icon" width={11} height={11} />
						</TableCell>
					</td>
				</TableRow>
				<TableBottomRow>
					<td>Staked balance</td>
					<td>APY</td>
					<td>Days</td>
					<td>Rewards</td>
				</TableBottomRow>
			</TableBody>
		</Table>
	);
};
