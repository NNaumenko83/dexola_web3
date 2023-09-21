import styled from "styled-components";
import { Button } from "../Button/Button";

export const FormStyled = styled.form`
	width: 100%;
	position: relative;
`;

export const Input = styled.input`
	width: 100%;
	padding-bottom: 8px;
	margin-bottom: 34px;
	background-color: transparent;
	color: white;
	border-bottom: 1px solid white;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		width: 24.4375rem;
	}
`;

export const AvailableWrapper = styled.div<{ $claimrewards?: boolean }>`
	display: flex;
	gap: 8px;

	margin-bottom: ${props => (props.$claimrewards ? "17.75rem" : "14rem")};

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		margin-bottom: ${props => (props.$claimrewards ? "7.67rem" : "3.875rem")};
	}
`;

export const ButtonStyled = styled(Button)`
	width: 100%;
	padding-top: 12px;
	padding-bottom: 12px;

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding: 12px 40px;

		width: fit-content;
	}
`;

export const AvailableQtyText = styled.span`
	font-weight: 700;
`;

export const AvailableQtyWrapper = styled.div`
	display: flex;
	gap: 4px;
	color: white;
`;

export const ChildrenWrapper = styled.div`
	position: absolute;
	width: 100%;
	left: 50%;
	transform: translateX(-50%);
	bottom: 48px;
	padding-bottom: 20px;
`;

export const ButtonTextWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		flex-direction: column;
		margin-bottom: 56px;
	}

	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		gap: 40px;
	}
`;

export const WithdrawText = styled.p`
	color: #fff;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.5; /* 150% */
	letter-spacing: 0.32px;
	text-transform: uppercase;
`;
