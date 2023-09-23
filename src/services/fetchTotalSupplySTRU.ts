export const fetchTotalSupplySTRU = async (contract: any) => {
	try {
		const totalSupplySTRU = await contract.methods.totalSupply().call();
		return totalSupplySTRU;
	} catch (error) {
		throw new Error(`Failed to fetch total supply STRU: ${error}`);
	}
};
