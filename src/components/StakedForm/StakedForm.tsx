import { Form } from "../Form/Form";

import React, { useEffect, useState } from "react";

// import { toBigInt } from "web3-utils";
import { useWeb3 } from "../../hooks/useWeb3";

import { useAccount } from "wagmi";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

import contractStakingABI from "../../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../../contracts/contract-tokenTracker-abi.json";
import { validateAmount } from "../../helpers/validateAmount";

export const StakedForm = () => {
	const { address } = useAccount();
	const { contractStarRunnerToken, struBalance, web3 } = useWeb3();
	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");
	const [allowance, setAllowance] = useState(0);
	const [approveLoading, setApproveLoading] = useState(false);
	const formattedNumberOfSrtu = web3?.utils.toWei(numberOfSrtu, "ether");

	useEffect(() => {
		// Отримайте поточний дозвіл (allowance) за допомогою методу FirstContract.allowance()
		// та оновіть стан компонента

		async function fetchAllowance() {
			const currentAllowance = await contractStarRunnerToken.methods
				.allowance(address, "0x2f112ed8a96327747565f4d4b4615be8fb89459d")
				.call();
			console.log("currentAllowance:", currentAllowance);
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
		args: ["0x2f112ed8a96327747565f4d4b4615be8fb89459d", struBalance ? web3?.utils.toWei(struBalance, "ether") : 0],
		enabled: Boolean(numberOfSrtu),
	});

	const { config: stakeConfig } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "stake",
		args: [formattedNumberOfSrtu],
		enabled: Boolean(numberOfSrtu),
	});

	const { data: approveData, write: approve } = useContractWrite(approveConfig);

	const waitForTransaction = useWaitForTransaction({
		hash: approveData?.hash,
		onSettled() {
			setApproveLoading(false);
		},
	});

	console.log("waitForTransaction:", waitForTransaction);

	// if (isSuccessApprove) {
	// 	console.log("HELLOOOOO");
	// }
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
		console.log("Submit");
		if (formattedNumberOfSrtu) {
			console.log("BigInt(formattedNumberOfSrtu:", BigInt(formattedNumberOfSrtu));
			console.log("Submit перевірка", allowance < BigInt(formattedNumberOfSrtu) && approve);
			console.log("stake:", stake);
		}

		console.log("allowance:", allowance);
		console.log("Number(numberOfSrtu:", formattedNumberOfSrtu);
		console.log("approve:", approve);
		console.log("stake:", stake);

		if (formattedNumberOfSrtu && allowance < BigInt(formattedNumberOfSrtu) && approve) {
			setApproveLoading(true);
			console.log("Before approve");
			await approve();
			console.log("After approve");
			return;
		}

		// if (stake && numberOfSrtu !== "") {
		// 	await stake();
		// 	console.log("After stake");
		// 	return;

		// 	// if (stake && numberOfSrtu !== "") {
		// 	// 	stake();
		// 	// } else {
		// 	// 	alert("Please enter the number of tokens to stake.");
		// 	// 	console.log("Please enter the number of tokens to stake.");
		// 	// }
		// }
	};

	const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
		console.log("struBalance:", struBalance);
		console.log("numberOfSrtu:", numberOfSrtu);

		const inputText = e.target.value;

		if (!validateAmount(inputText) && inputText === "") {
			setNumberOfSrtu(inputText);
			return;
		}
		if (!validateAmount(inputText)) {
			return;
		}
		if (
			struBalance &&
			web3 &&
			Number(web3.utils.toWei(struBalance, "ether")) < Number(web3.utils.toWei(e.target.value, "ether"))
		) {
			return;
		}
		console.log("inputText:", inputText);
		setNumberOfSrtu(inputText);
	};

	return (
		<Form
			onSubmitHandler={onSubmitHandler}
			inputName="stake"
			inputValue={numberOfSrtu}
			onChangeInput={onChangeInput}
			buttonText={approveLoading ? "LOADING" : "STAKE"}
			// isLoading={isLoadingApprove}
			balance={struBalance}
			placeholder={"Enter stake amount"}
		/>
	);
};
