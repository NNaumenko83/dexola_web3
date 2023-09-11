import {
	HelpIcon,
	Table,
	TableBody,
	TableBottomRow,
	TableCell,
	TableHead,
	TableRow,
	TextValue,
	UnitName,
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
					<td /*style={{ width: "98px" }}*/>
						<TableCell>
							<p>
								<TextValue>0.00</TextValue>
								<UnitName>STRU</UnitName>
							</p>
							<HelpIcon name="help_icon" width={11} height={11} />
						</TableCell>
					</td>
					<td /*style={{ width: "51px" }}*/>
						<TableCell>
							<p>
								<TextValue>≈8%</TextValue>
							</p>
							<HelpIcon name="help_icon" width={11} height={11} />
						</TableCell>
					</td>
					<td /*style={{ width: "40px" }}*/>
						<TableCell>
							<p>
								<TextValue>0</TextValue>
							</p>
						</TableCell>
					</td>
					<td /*style={{ width: "92px" }}*/>
						<TableCell>
							<p>
								<TextValue>0.00</TextValue>
								<UnitName>STRU</UnitName>
							</p>
							<HelpIcon name="help_icon" width={11} height={11} />
						</TableCell>
					</td>
				</TableRow>
				<TableBottomRow>
					<td style={{ width: "98px" }}>
						<p>Staked balance</p>
					</td>
					<td style={{ width: "51px" }}>
						<p>APY</p>
					</td>
					<td style={{ width: "40px" }}>
						<p>Days</p>
					</td>
					<td style={{ width: "92px" }}>
						<p>Rewards</p>
					</td>
				</TableBottomRow>
			</TableBody>
		</Table>
	);
};
