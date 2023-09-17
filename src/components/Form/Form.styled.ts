import styled from "styled-components";
import { Button } from "../Button/Button";

export const FormStyled = styled.form`
	width: 100%;
`;

export const Input = styled.input`
	width: 100%;
	padding-bottom: 8px;
	margin-bottom: 34px;
	background-color: transparent;
	color: white;
	border-bottom: 1px solid white;
`;

export const AvailableWrapper = styled.div`
	margin-bottom: 224px;
	display: flex;
	gap: 8px;
`;

export const ButtonStyled = styled(Button)`
	width: 100%;
	padding-top: 12px;
	padding-bottom: 12px;
	margin-bottom: 56px;
`;

export const AvailableQtyText = styled.span`
	font-weight: 700;
`;

export const AvailableQtyWrapper = styled.div`
	display: flex;
	gap: 4px;
	color: white;
`;
