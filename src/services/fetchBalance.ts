import Web3 from "web3";

export async function fetchBalance(web3: Web3 | null, address: string | null): Promise<number> {
	if (!web3 || !address) {
		throw new Error("Недостатньо даних для отримання балансу.");
	}

	try {
		const balanceEth = await web3.eth.getBalance(address);
		const formattedBalance = Number(web3.utils.fromWei(balanceEth, "ether")).toFixed(1);
		return Number(formattedBalance);
	} catch (error) {
		throw new Error(`Помилка при отриманні балансу: ${error}`);
	}
}
