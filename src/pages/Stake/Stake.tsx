import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { StakedForm } from "../../components/StakedForm/StakedForm";
// import { useWeb3 } from "../../hooks/useWeb3";

const Stake = () => {
	const { isConnected } = useAccount();

	return (
		<Container>
			<PageWrapper>
				{!isConnected ? (
					<NotConnectedWrapper />
				) : (
					<>
						<PageTitleWrapper>
							<PageTitle>Stake</PageTitle>
							<p>
								Reward rate:<span>1 STRU/week</span>
							</p>
						</PageTitleWrapper>
						<StakedForm />
					</>
				)}
			</PageWrapper>
		</Container>
	);
};

export default Stake;
