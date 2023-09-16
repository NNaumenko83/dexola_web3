export function convertEthereumAddress(address: string | undefined): string {
	// Кількість символів повинна бути 16
	if (address) {
		const convertedAddress = address.slice(0, 17).toUpperCase();
		console.log("convertedAddress:", convertedAddress);

		return `${convertedAddress}...`;
	}
	return "";
}
