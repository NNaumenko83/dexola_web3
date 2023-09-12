import React, { createContext, useEffect, useState, ReactNode } from "react";
import Web3 from "web3";
import { useAccount } from "wagmi";

import contractStakingABI from "../contracts/contract-staking-abi.json";
import contractTokenTrackingABI from "../contracts/contract-tokenTracker-abi.json";

export type Web3ContextType = {
	web3: Web3 | null;
	balance: string | null;
	struBalance: string | null;
	contractStaking: any | null; // Додали інстанс контракту contractStaking
	contractTokenTracking: any | null; // Додали інстанс контракту contractTokenTracking
	getBalance: () => void;
	getStruBalance: () => void;
};

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);
console.log("Web3Context:", Web3Context);

const createWeb3Provider = (): Web3 | null => {
	const infuraUrl = "https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2";
	const web3Instance = new Web3(new Web3.providers.HttpProvider(infuraUrl));
	return web3Instance;
};

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [web3, setWeb3] = useState<Web3 | null>(null);
	const { address, isConnected } = useAccount();
	const [balance, setBalance] = useState<string | null>(null);
	const [struBalance, setStruBalance] = useState<string | null>(null);
	// const [stakedBalance, setStakedBalance] = useState<bigint | null>(null);
	const [contractStaking, setContractStaking] = useState<any | null>(null); // Додали стейт для контракту contractStaking
	const [contractTokenTracking, setContractTokenTracking] = useState<any | null>(null); // Додали стейт для контракту contractTokenTracking

	// Адреси контрактів
	const contractStakingAddress = "0x2f112ed8a96327747565f4d4b4615be8fb89459d";
	const contractTokenTrackingAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

	useEffect(() => {
		if (isConnected && address) {
			const web3 = createWeb3Provider();
			setWeb3(web3);

			if (web3) {
				const contractStakingInstance = new web3.eth.Contract(contractStakingABI, contractStakingAddress);
				setContractStaking(contractStakingInstance);
				const contractTokenTrackingInstance = new web3.eth.Contract(
					contractTokenTrackingABI,
					contractTokenTrackingAddress,
				);
				setContractTokenTracking(contractTokenTrackingInstance);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, isConnected]);

	const getBalance = async () => {
		if (web3 && address) {
			const balanceEth = await web3.eth.getBalance(address);
			setBalance(balanceEth.toString());
		}
	};

	const getStruBalance = async () => {
		if (contractTokenTracking && web3 && address) {
			const balanceStruOnWallet = await contractTokenTracking.methods.balanceOf(address).call();
			setStruBalance(balanceStruOnWallet.toString());
		}
	};

	return (
		<Web3Context.Provider
			value={{ web3, balance, struBalance, contractStaking, contractTokenTracking, getBalance, getStruBalance }}
		>
			{children}
		</Web3Context.Provider>
	);
};
