export const validateAmount = (value: string) => {
	const validAmountPattern = /^(0|[1-9]\d*)(\.\d{0,18})?$/;
	return validAmountPattern.test(value);
};
