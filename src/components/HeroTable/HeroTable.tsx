import Icon from "../Icon/Icon";

export const TestInfoTable = () => {
	return (
		<table
		// style={{
		// 	display: "flex",
		// 	flexDirection: "column-reverse",
		// 	marginTop: "26px",
		// 	width: "100%",
		// }}
		>
			<thead>
				<tr>
					<th>Staked balance</th>
					<th>APY</th>
					<th>Days</th>
					<th>Rewards</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ display: "flex", alignItems: "center" }}>
						<p>0.00 STRU</p> <Icon name="help_icon" width={11} height={11} />
					</td>
					<td style={{ display: "flex", alignItems: "center" }}>
						<p>≈8%</p> <Icon name="help_icon" width={11} height={11} />
					</td>
					<td style={{ display: "flex", alignItems: "center" }}>
						<p>0</p>
					</td>
					<td style={{ display: "flex", alignItems: "center" }}>
						<p>0.00 STRU</p> <Icon name="help_icon" width={11} height={11} />
					</td>
				</tr>
			</tbody>
		</table>
	);
};
