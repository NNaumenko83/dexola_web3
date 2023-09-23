export const fetchStruBalance = async (contract: any, address: string) => {
	try {
		const balanceStruOnWallet = await contract.methods.balanceOf(address).call();
		return balanceStruOnWallet;
	} catch (error) {
		throw new Error(`Failed to fetch STRU balance: ${error}`);
	}
};
