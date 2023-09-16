import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { Form } from "../../components/Form/Form";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

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
						<Form />
					</>
				)}
			</PageWrapper>
		</Container>
	);
};

export default Stake;
