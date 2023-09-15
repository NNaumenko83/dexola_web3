import { TestInfoTable } from "../../HeroTable/HeroTable";
import { Title } from "../Title/Title";
import { Tooltip } from "../Tooltip/Tooltip";
import { HeroContainer, HeroSectionStyled } from "./Hero.styled";

export const Hero = () => {
	return (
		<HeroSectionStyled>
			<HeroContainer>
				<Title>StarRunner Token staking</Title>
				<TestInfoTable />

				{/* Тестовий код для підказки */}
				<Tooltip>Це підказка</Tooltip>
			</HeroContainer>
		</HeroSectionStyled>
	);
};
