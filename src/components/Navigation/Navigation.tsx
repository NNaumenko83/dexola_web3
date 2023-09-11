import { NavLink } from "react-router-dom";
import { Container } from "../Container/Container";
import { styled } from "styled-components";

const NavLinkStyled = styled(NavLink)`
	&.active {
		color: tomato;
		border: 1px solid purple;
	}

	transition: all 300ms linear;
	&:hover,
	&:focus {
		color: #ffd42f;
		text-shadow: 0px 0px 3px #ceb30a;
	}
`;

export const Navigation = () => {
	return (
		<Container>
			<nav style={{ display: "flex", gap: "20px" }}>
				<NavLinkStyled to="/">Stake</NavLinkStyled>
				<NavLinkStyled to="/withdraw">Withdraw</NavLinkStyled>
				<NavLinkStyled to="/claimrewards">ClaimRewards</NavLinkStyled>
			</nav>
		</Container>
	);
};
