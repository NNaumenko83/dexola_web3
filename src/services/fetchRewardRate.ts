export const fetchRewardRate = async (contract: any) => {
	try {
		const rewardRate = await contract.methods.rewardRate().call();
		return rewardRate;
	} catch (error) {
		throw new Error(`Failed to fetch reward rate: ${error}`);
	}
};
