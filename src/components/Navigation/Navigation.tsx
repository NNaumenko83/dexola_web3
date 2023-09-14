import { NavLink } from "react-router-dom";
import { Container } from "../Container/Container";
import { styled } from "styled-components";
import { NavMenu } from "./Navigation.styled";

const NavLinkStyled = styled(NavLink)`
	flex-basis: calc(100% / 3);
	padding-top: 1rem;
	padding-bottom: 1rem;
	position: relative;

	&.active {
		color: ${props => props.theme.colors.activePageLinkColor};
		padding-bottom: 10px;
		border-bottom: 6px solid ${props => props.theme.colors.activePageLinkBorderColor};
	}

	&:hover,
	&:focus {
		color: ${props => props.theme.colors.activePageLinkColor};
	}
	@media screen and (min-width: 744px) {
		display: flex;
		justify-content: center;
		padding-left: 2rem;
		padding-right: 2rem;
		max-width: 100%;

		font-size: ${props => props.theme.fontSizes.navLink.tablet};
		font-weight: ${props => props.theme.fontWeights.medium};
		line-height: 1.4;
	}
	/* font-size: 0.875rem;
	line-height: 1.28;
	letter-spacing: -0.0175rem; */
`;

export const Navigation = () => {
	return (
		<Container>
			<NavMenu>
				<NavLinkStyled to="/">Stake</NavLinkStyled>
				<NavLinkStyled to="/withdraw">Withdraw</NavLinkStyled>
				<NavLinkStyled to="/claimrewards">ClaimRewards</NavLinkStyled>
			</NavMenu>
		</Container>
	);
};
