export const fetchEarned = async (contract: any, address: string) => {
	try {
		const earned = await contract.methods.earned(address).call();
		return earned;
	} catch (error) {
		throw new Error(`Failed to fetch earned: ${error}`);
	}
};
