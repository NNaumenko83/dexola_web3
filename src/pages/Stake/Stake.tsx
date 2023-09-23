import { useAccount } from "wagmi";

import { Container } from "../../components/Container/Container";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { useWeb3 } from "../../hooks/useWeb3";

import { StakedForm } from "../../components/StakedForm/StakedForm";
import { RewardQtyText, RewardRateText, StruWeekText } from "./Stake.styled";

const Stake = () => {
	const { isConnected } = useAccount();
	const { rewardRate } = useWeb3();

	return (
		<Container>
			<PageWrapper>
				{!isConnected ? (
					<NotConnectedWrapper />
				) : (
					<>
						<PageTitleWrapper>
							<PageTitle>Stake</PageTitle>
							<RewardRateText>
								<span>Reward rate:</span>
								<RewardQtyText>{rewardRate}</RewardQtyText>
								<StruWeekText>STRU/week</StruWeekText>
							</RewardRateText>
						</PageTitleWrapper>
						<StakedForm />
					</>
				)}
			</PageWrapper>
		</Container>
	);
};

export default Stake;
