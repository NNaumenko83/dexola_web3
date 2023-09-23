export const fetchPeriodFinish = async (contract: any) => {
	try {
		const periodFinish = await contract.methods.periodFinish().call();
		return periodFinish;
	} catch (error) {
		throw new Error(`Failed to fetch period finish: ${error}`);
	}
};
