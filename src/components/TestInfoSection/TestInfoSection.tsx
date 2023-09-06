import { Container } from "../Container/Container";
import { TestInfoTable } from "../TestInfoTable/TestInfoTable";
import { Title } from "../Title/Title";

export const TestInfoSection = () => {
	return (
		<Container>
			<Title>StarRunner Token staking</Title>
			<TestInfoTable />
		</Container>
	);
};
