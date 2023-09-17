import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";

import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { ClaimRewardsForm } from "../../components/ClaimRewardForm/ClaimRewardForm";

const ClaimRewards = () => {
	const { isConnected } = useAccount();

	return (
		<Container>
			<PageWrapper>
				{!isConnected ? (
					<NotConnectedWrapper />
				) : (
					<>
						<PageTitleWrapper>
							<PageTitle>Claim rewards</PageTitle>
						</PageTitleWrapper>
						<ClaimRewardsForm />
					</>
				)}
			</PageWrapper>
		</Container>
	);
};

export default ClaimRewards;
