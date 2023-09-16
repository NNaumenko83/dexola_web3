import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { Form } from "../../components/Form/Form";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";

const Withdraw = () => {
	const { isConnected } = useAccount();

	return <Container>{!isConnected ? <NotConnectedWrapper /> : <Form />}</Container>;
};

export default Withdraw;
