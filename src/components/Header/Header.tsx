import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";

import { Button, HeaderContainer, HeaderStyled } from "./Header.styled";

export const Header = () => {
	return (
		<HeaderStyled>
			<Container>
				<HeaderContainer>
					<Icon name="logo" width={35} height={20} />
					<Button>Connect wallet</Button>
				</HeaderContainer>
			</Container>
		</HeaderStyled>
	);
};
