export const validateAmount = (value: string) => {
	const validAmountPattern = /^\d+(\.\d{0,18})?$/;
	return validAmountPattern.test(value);
};
