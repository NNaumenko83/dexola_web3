import React, { createContext, useEffect, useState, ReactNode } from "react";
import Web3 from "web3";

import contractStakingABI from "../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../contracts/contract-tokenTracker-abi.json";
import { createWeb3Provider } from "../utils/createWeb3Provider";
import { useContract } from "../hooks/useContract";
import { Web3ContextType } from "../types/contextType";

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
		transactionRewardsNumberOfStru,
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
		isFetchInfoError,
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
				transactionRewardsNumberOfStru,
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
				isFetchInfoError,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};
