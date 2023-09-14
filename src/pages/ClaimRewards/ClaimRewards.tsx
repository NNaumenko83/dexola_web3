import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { StakeForm } from "../../components/StakeForm/StakeForm";

import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";

const ClaimRewards = () => {
	const { isConnected } = useAccount();

	return <Container>{!isConnected ? <NotConnectedWrapper /> : <StakeForm />}</Container>;
};

export default ClaimRewards;
