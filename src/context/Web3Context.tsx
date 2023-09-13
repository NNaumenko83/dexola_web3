import React, { createContext, useEffect, useState, ReactNode } from "react";
import Web3 from "web3";
import { useAccount } from "wagmi";

import contractStakingABI from "../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../contracts/contract-tokenTracker-abi.json";

export type Web3ContextType = {
	web3: Web3 | null;
	balance: string | null;
	struBalance: string | null;
	stakedBalance: string | null;
	totalSupplyStru: string | null;
	totalRewards: string | null;
	contractStaking: any | null; // Додали інстанс контракту contractStaking
	contractStarRunnerToken: any | null; // Додали інстанс контракту contractStarRunnerToken
	getBalance: () => void;
	getStruBalance: () => void;
	getStakedBalance: () => void;
	getTotalSupply: () => void;
	getTotalRewards: () => void;
};

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);

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
	const [stakedBalance, setStakedBalance] = useState<string | null>(null);
	const [totalRewards, setTotalRewards] = useState<string | null>(null);
	const [totalSupplyStru, setTotalSupplyStru] = useState<string | null>(null);
	const [contractStaking, setContractStaking] = useState<any | null>(null); // Додали стейт для контракту contractStaking
	const [contractStarRunnerToken, setContractStarRunnerToken] = useState<any | null>(null); // Додали стейт для контракту contractStarRunnerToken

	// Адреси контрактів
	const contractStakingAddress = "0x2f112ed8a96327747565f4d4b4615be8fb89459d";
	const contractStarRunnerTokenAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

	useEffect(() => {
		if (isConnected && address) {
			const web3 = createWeb3Provider();
			setWeb3(web3);

			if (web3) {
				const contractStakingInstance = new web3.eth.Contract(contractStakingABI, contractStakingAddress);
				setContractStaking(contractStakingInstance);
				const contractStarRunnerTokenInstance = new web3.eth.Contract(
					contractStarRunnerTokenABI,
					contractStarRunnerTokenAddress,
				);
				setContractStarRunnerToken(contractStarRunnerTokenInstance);
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
		if (contractStarRunnerToken && web3 && address) {
			const balanceStruOnWallet = await contractStarRunnerToken.methods.balanceOf(address).call();
			setStruBalance(balanceStruOnWallet.toString());
		}
	};

	const getStakedBalance = async () => {
		if (contractStarRunnerToken && web3 && address) {
			const stakedBalance = await contractStaking.methods.balanceOf(address).call();
			// console.log("stakedBalance:", stakedBalance);
			setStakedBalance(stakedBalance.toString());
		}
	};

	// 	Для розрахунку річної процентної ставки (APR) необхідно отримати таку інформацію з контракту:
	// Загальна кількість винагород за період - ви повинні викликати метод читання контракту getRewardForDuration(),
	// який поверне кількість винагород за цей період.
	// Загальна сума ставок, зроблених всіма користувачами - це можна отримати,
	// викликавши метод читання totalSupply() на контракті стейкінгу.

	const getTotalSupply = async () => {
		if (contractStarRunnerToken && web3 && address) {
			const totalSupplySTRU = await contractStaking.methods.totalSupply().call();
			setTotalSupplyStru(totalSupplySTRU.toString());
		}
	};

	const getTotalRewards = async () => {
		if (contractStarRunnerToken && web3 && address) {
			const totalRewards = await contractStaking.methods.getRewardForDuration().call();
			setTotalRewards(totalRewards.toString());
		}
	};
	return (
		<Web3Context.Provider
			value={{
				web3,
				balance,
				struBalance,
				stakedBalance,
				contractStaking,
				contractStarRunnerToken,
				totalSupplyStru,
				totalRewards,
				getBalance,
				getStruBalance,
				getStakedBalance,
				getTotalSupply,
				getTotalRewards,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};
