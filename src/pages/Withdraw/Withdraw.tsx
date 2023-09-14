import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { StakeForm } from "../../components/StakeForm/StakeForm";
import { ConnectToWalletButton } from "../../components/ConnectToWalletButton/ConnectToWalletButton";

const Withdraw = () => {
	const { isConnected } = useAccount();

	return <Container>{!isConnected ? <ConnectToWalletButton /> : <StakeForm />}</Container>;
};

export default Withdraw;
