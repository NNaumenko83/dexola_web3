import React, { createContext, useEffect, useState, ReactNode } from "react";
import Web3 from "web3";

import contractStakingABI from "../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../contracts/contract-tokenTracker-abi.json";
import { createWeb3Provider } from "../utils/createWeb3Provider";
import { useContract } from "../hooks/useContract";

export type Web3ContextType = {
	web3: Web3 | null;
	balance: number | null;
	struBalance: number | null;
	balanceStruOnWallet: bigint | null;
	stakedBalance: number | null;
	rewardRate: number | null;
	contractStaking: any | null;
	contractStarRunnerToken: any | null;
	apy: number | null;
	days: number | null;
	earned: number | null;
	allowance: bigint | null;
	numberOfStakeSrtu: string;
	numberOfWithdrawSrtu: string;
	getBalance: () => void;
	getStruBalance: () => void;
	getStakedBalance: () => void;
	updAll: () => void;
	getRewardRate: (input: number) => void;
	getAllowance: () => void;
	transactionStakeNumberOfStru: string;
	transactionWithdrawNumberOfStru: string;
	transactionRewardsNumberOfStru: string;
	isErrorApprove: boolean;
	isErrorStaked: boolean;
	isSuccessApprove: boolean;
	isSuccessStake: boolean;
	onSubmitStakeHandler: React.FormEventHandler<HTMLFormElement>;
	onSubmitWidthdrawHandler: React.FormEventHandler<HTMLFormElement>;
	onSubmitRewardsHandler: React.FormEventHandler<HTMLFormElement>;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	isLoadingApprove: boolean;
	isLoadingStake: boolean;
	isLoadingWithdraw: boolean;
	isLoadingWithdrawAll: boolean;
	isErrorApprovePrepare: Error | null;
	isSuccessWithdrawAll: boolean;
	isSuccessWithdraw: boolean;
	isErrorWithdrawAll: boolean;
	isErrorWithdraw: boolean;
	isSuccessWithdrawRewards: boolean;
	isErrorWithdrawRewards: boolean;
	isLoadingWithdrawRewards: boolean;
};

const contractStakingAddress = "0x2f112ed8a96327747565f4d4b4615be8fb89459d";
const contractStarRunnerTokenAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [web3, setWeb3] = useState<Web3 | null>(null);
	const [contractStaking, setContractStaking] = useState<any | null>(null);
	const [contractStarRunnerToken, setContractStarRunnerToken] = useState<any | null>(null);

	const {
		struBalance,
		days,
		earned,
		rewardRate,
		stakedBalance,
		balanceStruOnWallet,
		balance,
		apy,
		getStruBalance,
		getRewardRate,
		getStakedBalance,
		getBalance,
		updAll,
		allowance,
		getAllowance,
		transactionStakeNumberOfStru,
		transactionWithdrawNumberOfStru,
		isErrorApprove,
		isErrorStaked,
		isSuccessApprove,
		isSuccessStake,
		onSubmitStakeHandler,
		onSubmitWidthdrawHandler,
		onSubmitRewardsHandler,
		onChangeInput,
		isLoadingApprove,
		isLoadingStake,
		isErrorApprovePrepare,
		numberOfStakeSrtu,
		numberOfWithdrawSrtu,
		isLoadingWithdraw,
		isLoadingWithdrawAll,
		isSuccessWithdraw,
		isSuccessWithdrawAll,
		isErrorWithdraw,
		isErrorWithdrawAll,
		isSuccessWithdrawRewards,
		isErrorWithdrawRewards,
		isLoadingWithdrawRewards,
	} = useContract(web3, contractStaking, contractStarRunnerToken);

	useEffect(() => {
		const web3 = createWeb3Provider();
		if (web3) {
			const contractStakingInstance = new web3.eth.Contract(contractStakingABI, contractStakingAddress);
			setContractStaking(contractStakingInstance);
			const contractStarRunnerTokenInstance = new web3.eth.Contract(
				contractStarRunnerTokenABI,
				contractStarRunnerTokenAddress,
			);
			setContractStarRunnerToken(contractStarRunnerTokenInstance);
			setWeb3(web3);
		}
	}, []);

	return (
		<Web3Context.Provider
			value={{
				web3,
				allowance,
				balance,
				struBalance,
				balanceStruOnWallet,
				stakedBalance,
				rewardRate,
				contractStaking,
				contractStarRunnerToken,
				getBalance,
				getStruBalance,
				getStakedBalance,
				getRewardRate,
				numberOfStakeSrtu,
				numberOfWithdrawSrtu,
				apy,
				days,
				earned,
				updAll,
				getAllowance,
				transactionStakeNumberOfStru,
				transactionWithdrawNumberOfStru,
				isErrorApprove,
				isErrorStaked,
				isSuccessApprove,
				isSuccessStake,
				onSubmitStakeHandler,
				onSubmitWidthdrawHandler,
				onSubmitRewardsHandler,
				onChangeInput,
				isLoadingApprove,
				isLoadingStake,
				isErrorApprovePrepare,
				isLoadingWithdraw,
				isLoadingWithdrawAll,
				isSuccessWithdrawAll,
				isSuccessWithdraw,
				isErrorWithdrawAll,
				isErrorWithdraw,
				isLoadingWithdrawRewards,
				isSuccessWithdrawRewards,
				isErrorWithdrawRewards,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};
