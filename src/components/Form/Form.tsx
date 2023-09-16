import React, { useEffect, useState } from "react";

// import { toBigInt } from "web3-utils";
import { useWeb3 } from "../../hooks/useWeb3";

import { useAccount } from "wagmi";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

import contractStakingABI from "../../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../../contracts/contract-tokenTracker-abi.json";
import { FormStyled } from "./Form.styled";

export const Form = () => {
	const { address } = useAccount();
	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");
	const { contractStarRunnerToken } = useWeb3();
	const [allowance, setAllowance] = useState(0);

	useEffect(() => {
		// Отримайте поточний дозвіл (allowance) за допомогою методу FirstContract.allowance()
		// та оновіть стан компонента

		async function fetchAllowance() {
			const currentAllowance = await contractStarRunnerToken.methods
				.allowance(address, "0x2f112ed8a96327747565f4d4b4615be8fb89459d")
				.call();
			setAllowance(currentAllowance);
		}
		if (contractStarRunnerToken) {
			fetchAllowance();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contractStarRunnerToken]);
	// const { contractStaking, contractStarRunnerToken } = useWeb3();

	// Треба використати метод approve
	// approve(address spender, uint256 allowance) - стандарт ERC20, дозвіл на зняття
	// 0x2f112ed8a96327747565f4d4b4615be8fb89459d;
	// токенів з контракту, перший аргумент адреса кому дозволяємо, в нашому випадку

	// контракт стейкінгу, allowance сума на яку даємо дозвіл

	const { config: approveConfig } = usePrepareContractWrite({
		address: "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83",
		abi: contractStarRunnerTokenABI,
		functionName: "approve",
		args: ["0x2f112ed8a96327747565f4d4b4615be8fb89459d", "2000000000000000000000000"],
	});

	const { config: stakeConfig } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "stake",
		args: [numberOfSrtu],
		enabled: Boolean(numberOfSrtu),
	});

	const { data: approveData, write: approve } = useContractWrite(approveConfig);
	const { isLoading: isLoadingApprove, isSuccess: isSuccessApprove } = useWaitForTransaction({
		hash: approveData?.hash,
	});

	if (isSuccessApprove) {
		console.log("HELLOOOOO");
	}
	// console.log("isSuccessApprove:", isSuccessApprove);
	// console.log("isLoadingApprove:", isLoadingApprove);
	// console.log("approveData:", approveData);
	const { /*data: stakeData,*/ write: stake } = useContractWrite(stakeConfig);
	// console.log("stake:", stake);
	// console.log("stakeData:", stakeData);

	// 	Методи Write Стейкінг
	// stake(number of staked tokens) - робить депозит

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		if (allowance.toString() < numberOfSrtu && approve && stake) {
			await approve();
			await stake();
			return;
		}

		if (stake && numberOfSrtu !== "" && approve) {
			await approve();
			await stake();
			return;

			// if (stake && numberOfSrtu !== "") {
			// 	stake();
			// } else {
			// 	alert("Please enter the number of tokens to stake.");
			// 	console.log("Please enter the number of tokens to stake.");
			// }
		}
	};

	const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
		setNumberOfSrtu(e.target.value);
	};

	return (
		<FormStyled onSubmit={onSubmitHandler}>
			<input type="text" name="stake" value={numberOfSrtu} onChange={onChangeInput} placeholder="Enter stake amount" />
			<p>
				Available: <span>354</span>
				<span>STRU</span>
			</p>
			<button type="submit">{isLoadingApprove ? "LOADING" : "STAKE"}</button>
		</FormStyled>
	);
};
