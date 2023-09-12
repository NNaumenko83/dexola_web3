import React, { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { useAccount } from "wagmi";
import { ReactNode } from "react";

export type Web3ContextType = {
	web3: Web3 | null;
	// balance: string | null;
};

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);

const createWeb3Provider = (): Web3 | null => {
	const infuraUrl = "https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2";
	const web3Instance = new Web3(new Web3.providers.HttpProvider(infuraUrl));
	return web3Instance;
};

// const getBalance = async (web3: Web3, address: string): Promise<string | null> => {
// 	try {
// 		const balance = await web3.eth.getBalance(address);
// 		return web3.utils.fromWei(balance, "ether");
// 	} catch (error) {
// 		console.error("Помилка отримання балансу:", error);
// 		return null;
// 	}
// };

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [web3, setWeb3] = useState<Web3 | null>(null);
	const { address, isConnected } = useAccount();
	// const [balance, setBalance] = useState<string | null>(null);

	useEffect(() => {
		console.log("isConnected", isConnected);
		console.log("address:", address);

		if (isConnected && address) {
			const web3 = createWeb3Provider();
			setWeb3(web3);
		}
	}, [address, isConnected]);

	return <Web3Context.Provider value={{ web3 }}>{children}</Web3Context.Provider>;
};
