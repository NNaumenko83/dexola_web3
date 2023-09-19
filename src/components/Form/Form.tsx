import React, { ChangeEvent, FormEvent, ReactNode } from "react";

import {
	AvailableQtyText,
	AvailableWrapper,
	ButtonStyled,
	FormStyled,
	Input,
	AvailableQtyWrapper,
} from "./Form.styled";

interface CustomFormProps {
	onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
	inputName: string;
	inputValue: string;
	onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
	buttonText: string;
	// isLoading: boolean;
	balance: number | null;
	placeholder: string;
	children: ReactNode;
}

export const Form: React.FC<CustomFormProps> = ({
	onSubmitHandler,
	inputName,
	inputValue,
	onChangeInput,
	buttonText,
	balance,
	placeholder,
	children,
}) => {
	return (
		<FormStyled onSubmit={onSubmitHandler}>
			<Input type="text" name={inputName} value={inputValue} onChange={onChangeInput} placeholder={placeholder} />
			<AvailableWrapper>
				<p>Available:</p>

				<AvailableQtyWrapper>
					<AvailableQtyText>{balance}</AvailableQtyText>
					<p>STRU</p>
				</AvailableQtyWrapper>
			</AvailableWrapper>
			{children}
			<ButtonStyled type="submit">{buttonText}</ButtonStyled>
		</FormStyled>
	);
};
