import { CopyrightText, DesignedByText, FooterContainer, FooterStyled } from "./Footer.styled";

export const Footer = () => {
	return (
		<FooterStyled>
			<FooterContainer>
				<DesignedByText>Designed by Dexola - 2023</DesignedByText>
				<CopyrightText>&copy; All rights reserved</CopyrightText>
			</FooterContainer>
		</FooterStyled>
	);
};
