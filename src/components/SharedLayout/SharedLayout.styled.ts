import { styled } from "styled-components";
import mainBackground from "../../assets/main_backgroung-min.jpeg";

export const SuspenseWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

export const AppWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background-image: url("${mainBackground}");
	background-position: top;
`;

export const PagesWrapper = styled.div`
	position: relative;
	flex: 1 1 auto;
	background-color: black;

	/* background-color: black; */

	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		border-radius: 16px 16px 0px 0px;

		margin-top: -16px;
	}

	@media screen and (min-width: 1440px) {
		background: radial-gradient(42.93% 42.93% at 50% calc(50% + 294px), #2f4bc9 0%, #080808 100%);
	}
`;
