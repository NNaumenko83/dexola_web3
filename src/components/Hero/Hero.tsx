import { TestInfoTable } from "../../HeroTable/HeroTable";
import { Title } from "../Title/Title";
import { HeroContainer, HeroSectionStyled } from "./Hero.styled";

export const Hero = () => {
	return (
		<HeroSectionStyled>
			<HeroContainer>
				<Title>StarRunner Token staking</Title>
				<TestInfoTable />
			</HeroContainer>
		</HeroSectionStyled>
	);
};
