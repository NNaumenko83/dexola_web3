import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { Form } from "../../components/Form/Form";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";

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
							<p>
								Reward rate:<span>1 STRU/week</span>
							</p>
						</PageTitleWrapper>
						<Form />
					</>
				)}
			</PageWrapper>
		</Container>
	);
};

export default ClaimRewards;
