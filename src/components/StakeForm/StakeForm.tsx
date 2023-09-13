import React, { useState } from "react";
// import { toBigInt } from "web3-utils";
// import { useWeb3 } from "../../hooks/useWeb3";

// import { useAccount } from "wagmi";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

import contractStakingABI from "../../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../../contracts/contract-tokenTracker-abi.json";

export const StakeForm = () => {
	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");
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
		args: ["0x2f112ed8a96327747565f4d4b4615be8fb89459d", numberOfSrtu],
	});

	const { config: stakeConfig } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "stake",
		args: [numberOfSrtu],
	});

	const { data: approveData, write: approve } = useContractWrite(approveConfig);
	console.log("approveData:", approveData);
	const { data: stakeData, write: stake } = useContractWrite(stakeConfig);
	console.log("stakeData:", stakeData);

	// 	Методи Write Стейкінг
	// stake(number of staked tokens) - робить депозит

	// const stakeToken = async () => {
	// 	try {
	// 		await contractStarRunnerToken.methods
	// 			.approve("0x2f112ed8a96327747565f4d4b4615be8fb89459d", 100)
	// 			.send({ from: address });
	// 		console.log("before contractStaking");
	// 		await contractStaking.methods.stake(100).send({ from: address });
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();

		console.log("aaaaaaaaaaaaaaaaa");

		console.log("approve:", approve);
		console.log("stake:", stake);
		if (approve && stake) {
			approve();
			stake();
		}

		// const form = e.target as HTMLFormElement;

		// const value = form.elements.stake;
		// console.log("value:", value);

		// const myNumber = toBigInt(stake.value);
		// console.log("myNumber:", myNumber);

		// stakeToken();
	};

	const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
		setNumberOfSrtu(e.target.value);
	};

	return (
		<form
			style={{
				display: "flex",
				flexDirection: "column",
				width: "350px",
				gap: "25px",
				marginTop: "25px",
				padding: "20px",
				border: "1px solid red",
			}}
			onSubmit={onSubmitHandler}
		>
			<input type="text" name="stake" value={numberOfSrtu} onChange={onChangeInput} />
			<button type="submit">STAKE</button>
		</form>
	);
};
