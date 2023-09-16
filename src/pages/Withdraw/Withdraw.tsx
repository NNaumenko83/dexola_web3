import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { Form } from "../../components/Form/Form";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";

const Withdraw = () => {
	const { isConnected } = useAccount();
	return (
		<Container>
			<PageWrapper>
				{!isConnected ? (
					<NotConnectedWrapper />
				) : (
					<>
						<PageTitleWrapper>
							<PageTitle>Withdraw</PageTitle>
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

export default Withdraw;
