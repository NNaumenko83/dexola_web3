import { styled } from "styled-components";
import { StyledButton } from "../Button/Button.styled";
import struBackground1x from "../../assets/Stru_icon_background 2/stru_min.jpg";
import struBackground2x from "../../assets/Stru_icon_background 2/stru_min@2x-min.jpg";

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const HeaderStyled = styled.header`
	position: absolute;
	width: 100%;
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding-top: 0.9375rem;
		padding-bottom: 0.9375rem;
	}
`;

export const Button = styled(StyledButton)`
	width: 167px;
	height: 40px;
`;

export const HeaderBalanceInfoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;

	color: ${props => props.theme.colors.balanceColor};
	font-family: "Kanit", sans-serif;
	font-size: ${props => props.theme.fontSizes.headerBalance.small};

	font-weight: ${props => props.theme.fontWeights.medium};
	line-height: 1.5;
	letter-spacing: 0.12px;

	@media screen and (min-width: 744px) {
		font-size: ${props => props.theme.fontSizes.headerBalance.big};
		font-weight: ${props => props.theme.fontWeights.semiBold};
		line-height: 1.14;
	}
`;

export const AdddressText = styled.p`
	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		border: 0;
		padding: 0;

		white-space: nowrap;
		clip-path: inset(100%);
		clip: rect(0 0 0 0);
		overflow: hidden;
	}
`;

export const StruIcon = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;

	background-image: url("${struBackground1x}");
	background-size: 32px 32px;

	@media (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx) {
		background-image: url("${struBackground2x}");
	}
`;

export const IconBalanceWrapper = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

export const EtheriumInfoWrapper = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

export const Delimiter = styled.p`
	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		border: 0;
		padding: 0;

		white-space: nowrap;
		clip-path: inset(100%);
		clip: rect(0 0 0 0);
		overflow: hidden;
	}
`;
