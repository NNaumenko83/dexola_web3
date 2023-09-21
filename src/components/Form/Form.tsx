import React, { ChangeEvent, FormEvent, ReactNode } from "react";

import {
	AvailableQtyText,
	AvailableWrapper,
	ButtonStyled,
	FormStyled,
	Input,
	AvailableQtyWrapper,
	ChildrenWrapper,
	ButtonTextWrapper,
	WithdrawText,
} from "./Form.styled";

interface CustomFormProps {
	onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
	inputName?: string;
	inputValue?: string;
	onChangeInput?: (event: ChangeEvent<HTMLInputElement>) => void;
	buttonText: string;
	// isLoading: boolean;
	balance: number | null;
	placeholder?: string;
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
			{buttonText !== "Claim rewards" && (
				<Input type="text" name={inputName} value={inputValue} onChange={onChangeInput} placeholder={placeholder} />
			)}
			<AvailableWrapper $claimrewards={buttonText === "Claim rewards"}>
				<p>Available:</p>

				<AvailableQtyWrapper>
					<AvailableQtyText>{balance}</AvailableQtyText>
					<p>STRU</p>
				</AvailableQtyWrapper>
			</AvailableWrapper>
			<ChildrenWrapper>{children}</ChildrenWrapper>
			<ButtonTextWrapper>
				<ButtonStyled type="submit">{buttonText}</ButtonStyled>
				{inputName === "withdraw" && !inputValue && <WithdrawText>withdraw all & Claim rewards</WithdrawText>}
			</ButtonTextWrapper>
		</FormStyled>
	);
};
