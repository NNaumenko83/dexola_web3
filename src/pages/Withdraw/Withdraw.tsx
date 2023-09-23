import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";

import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { WithdrawForm } from "../../components/WithdrawForm/WithdrawForm";

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
						</PageTitleWrapper>
						<WithdrawForm />
					</>
				)}
			</PageWrapper>
		</Container>
	);
};

export default Withdraw;
