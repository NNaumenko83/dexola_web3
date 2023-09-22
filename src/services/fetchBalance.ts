import Web3 from "web3";

export async function fetchBalance(web3: Web3 | null, address: string | null): Promise<number | null> {
	if (web3 && address) {
		const balanceEth = await web3.eth.getBalance(address);
		const formattedBalance = Number(web3.utils.fromWei(balanceEth, "ether")).toFixed(1);
		return Number(formattedBalance);
	}
	return null;
}
