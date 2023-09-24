import styled from "styled-components";
import { Button } from "../Button/Button";

export const FormStyled = styled.form`
	width: 100%;
	position: relative;
`;

export const Input = styled.input`
	width: 100%;
	padding-bottom: 0.5rem;
	margin-bottom: 2.125rem;
	background-color: transparent;
	color: ${props => props.theme.colors.inputTextColor};
	border-bottom: 1px solid ${props => props.theme.colors.inputBorderBotomColor};

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		width: 24.4375rem;
		font-size: ${props => props.theme.fontSizes.body.tablet};
		font-weight: ${props => props.theme.fontWeights.medium};
		line-height: 1.5rem; /* 150% */
		letter-spacing: 0.02rem;
	}

	&::placeholder {
		color: ${props => props.theme.colors.placeholderColor};
		font-weight: ${props => props.theme.fontWeights.normal};

		line-height: 1.71; /* 171.429% */
		letter-spacing: 0.0175rem;
		@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
			font-size: ${props => props.theme.fontSizes.placeholder.tablet};
			line-height: 1.5; /* 150% */
			letter-spacing: 0.02rem;
		}
	}
`;

export const AvailableWrapper = styled.div<{ $claimrewards?: boolean }>`
	display: flex;
	gap: 0.5rem;

	margin-bottom: ${props => (props.$claimrewards ? "17.8rem" : "14rem")};

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		margin-bottom: ${props => (props.$claimrewards ? "8.06rem" : "3.875rem")};
		font-size: ${props => props.theme.fontSizes.body.tablet};
	}
`;

export const AvailableQtyText = styled.span`
	${props => props.theme.fontWeights.bold};
`;

export const AvailableQtyWrapper = styled.div`
	display: flex;
	gap: 0.25rem;
	color: ${props => props.theme.colors.white};
`;

export const ButtonStyled = styled(Button)`
	width: 100%;
	padding-top: 0.75rem;
	padding-bottom: 0.75rem;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding: 0.75rem 2.5rem;
		width: fit-content;
	}
`;

export const ChildrenWrapper = styled.div`
	position: absolute;
	width: 100%;
	left: 50%;
	transform: translateX(-50%);
	bottom: 3rem;
	padding-bottom: 1.25rem;
`;

export const ButtonTextWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 0.625rem;
	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		flex-direction: column;
		margin-bottom: 3.5rem;
	}

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		gap: 2.5rem;
	}
`;

export const WithdrawText = styled.p`
	color: ${props => props.theme.colors.white};
	font-size: ${props => props.theme.fontSizes.body.tablet};
	font-weight: ${props => props.theme.fontWeights.medium};
	line-height: 1.5; /* 150% */
	letter-spacing: 0.02rem;
	text-transform: uppercase;

	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		position: absolute;
		bottom: -2.5rem;
	}
`;
