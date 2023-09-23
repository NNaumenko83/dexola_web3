export const fetchTotalRewards = async (contract: any) => {
	try {
		const totalRewards = await contract.methods.getRewardForDuration().call();
		return totalRewards;
	} catch (error) {
		throw new Error(`Failed to fetch total rewards: ${error}`);
	}
};
