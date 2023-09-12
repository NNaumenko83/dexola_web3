import { useEffect } from "react";
import { useWeb3 } from "../../hooks/useWeb3";
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
} from "./HeroTable.styled";

export const TestInfoTable = () => {
	const { stakedBalance, getStakedBalance } = useWeb3();

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

								<HelpIcon name="help_icon" width={16} height={18} />
							</UnitIconWrapper>
						</TableCell>
					</td>
					<td>
						<TableCellApy>
							<p>
								<TextValue>≈8%</TextValue>
							</p>
							<NameCell>APY</NameCell>
							<HelpIcon name="help_icon" width={16} height={18} />
						</TableCellApy>
					</td>
					<td>
						<TableCell>
							<p>
								<TextValue>0</TextValue>
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
