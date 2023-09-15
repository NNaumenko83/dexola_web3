import { HeroTable } from "../HeroTable/HeroTable";
import { Title } from "../Title/Title";

import { HeroContainer, HeroSectionStyled } from "./Hero.styled";

export const Hero = () => {
	return (
		<HeroSectionStyled>
			<HeroContainer>
				<Title>StarRunner Token staking</Title>
				<HeroTable />
			</HeroContainer>
		</HeroSectionStyled>
	);
};
