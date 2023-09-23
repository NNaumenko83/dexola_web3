export async function fetchAllowance(contract: any, owner: string, spender: string): Promise<bigint> {
	try {
		const allowance = await contract.methods.allowance(owner, spender).call();

		return allowance;
	} catch (error) {
		throw new Error(`Помилка при отриманні allowance: ${error}`);
	}
}

// "0x2f112ed8a96327747565f4d4b4615be8fb89459d
