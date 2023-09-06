export const TestInfoTable = () => {
	return (
		<table
			style={{
				display: "flex",
				flexDirection: "column-reverse",
				marginTop: "26px",
				width: "100%",
			}}
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
					<td>0.00 STRU</td>
					<td>≈8%</td>
					<td>0</td>
					<td>0.00 STRU</td>
				</tr>
			</tbody>
		</table>
	);
};
