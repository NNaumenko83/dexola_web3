import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = (): Web3 | null => {
	const [web3, setWeb3] = useState<Web3 | null>(null);

	useEffect(() => {
		const infuraUrl = "https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2";
		const web3Instance = new Web3(new Web3.providers.HttpProvider(infuraUrl));

		setWeb3(web3Instance);
	}, []);

	return web3;
};

export default useWeb3;
