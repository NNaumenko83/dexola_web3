import { Container } from "../../components/Container/Container";
import { StakeForm } from "../../components/StakeForm/StakeForm";

const Stake = () => {
	return (
		<Container>
			<div style={{ border: "1px solid red", height: "100%" }}>Stake</div>
			<StakeForm />
		</Container>
	);
};

export default Stake;
