export const fetchStakedBalance = async (contractStaking: any, address: string) => {
	try {
		const stakedBalance = await contractStaking.methods.balanceOf(address).call();
		return stakedBalance;
	} catch (error) {
		throw new Error(`Failed to fetch staked balance: ${error}`);
	}
};
