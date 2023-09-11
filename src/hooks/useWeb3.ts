import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Web3 from "web3";

const useWeb3 = (): { web3: Web3 | null; error: Error | null } => {
	const [web3, setWeb3] = useState<Web3 | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const { address, isConnected } = useAccount();
	console.log("address:", address);
	console.log("isConnected:", isConnected);

	useEffect(() => {
		try {
			const infuraUrl = "https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2";
			const web3Instance = new Web3(new Web3.providers.HttpProvider(infuraUrl));

			setWeb3(web3Instance);
		} catch (err: any) {
			setError(err);
		}
	}, []);

	return { web3, error };
};

export default useWeb3;
