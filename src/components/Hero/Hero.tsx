import { TestInfoTable } from "../../HeroTable/HeroTable";
import { Title } from "../Title/Title";
import { HeroContainer } from "./Hero.styled";

export const Hero = () => {
	return (
		<HeroContainer>
			<Title>StarRunner Token staking</Title>
			<TestInfoTable />
		</HeroContainer>
	);
};
