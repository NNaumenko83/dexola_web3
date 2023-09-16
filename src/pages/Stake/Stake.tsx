import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { StakeForm } from "../../components/StakeForm/StakeForm";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";

const Stake = () => {
	const { isConnected } = useAccount();

	return (
		<Container>
			{!isConnected ? (
				<NotConnectedWrapper />
			) : (
				<>
					<PageTitleWrapper>
						<PageTitle>Stake </PageTitle>
					</PageTitleWrapper>
					<StakeForm />
				</>
			)}
		</Container>
	);
};

export default Stake;
