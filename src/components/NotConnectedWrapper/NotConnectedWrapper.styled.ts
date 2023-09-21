import { styled } from "styled-components";

export const IconAndTextWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 1rem;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		gap: 1rem;
	}
`;

export const Text = styled.p`
	text-align: center;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		font-size: ${props => props.theme.fontSizes.body.tablet};
		line-height: 1.5;
	}
`;

export const NotConnectedWrapperStyled = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6.875rem;
	padding-top: 9.3125rem;
	padding-bottom: 3.5rem;
	width: 100%;
	height: 100%;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding: 1.9375rem 4.3125rem;
		height: auto;
		gap: 2rem;
	}
`;

export const Break = styled.br`
	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		display: none;
	}
`;
