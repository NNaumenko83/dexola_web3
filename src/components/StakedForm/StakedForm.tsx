import { Form } from "../Form/Form";

import React, { useEffect, useState } from "react";

// import { toBigInt } from "web3-utils";
import { useWeb3 } from "../../hooks/useWeb3";
import { useAccount } from "wagmi";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import contractStakingABI from "../../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../../contracts/contract-tokenTracker-abi.json";
import { validateAmount } from "../../helpers/validateAmount";
import { LoadingInfo } from "../LoadingInfo/LoadingInfo";
import { NumberSTRU } from "./StakedForm.styled";

export const StakedForm = () => {
	const { address } = useAccount();
	const { contractStarRunnerToken, struBalance, web3, updAll } = useWeb3();
	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");
	const [allowance, setAllowance] = useState(0);

	// const [approveLoading, setApproveLoading] = useState(false);
	const formattedNumberOfSrtu = web3?.utils.toWei(numberOfSrtu, "ether");

	async function fetchAllowance() {
		const currentAllowance = await contractStarRunnerToken.methods
			.allowance(address, "0x2f112ed8a96327747565f4d4b4615be8fb89459d")
			.call();
		console.log("currentAllowance:", currentAllowance);
		setAllowance(currentAllowance);
	}

	useEffect(() => {
		console.log("useEffect: StakedForm");

		if (contractStarRunnerToken) {
			fetchAllowance();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contractStarRunnerToken]);

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
	const { data: stakeData, write: stake } = useContractWrite(stakeConfig);
	console.log("stake:", stake);

	const { isLoading: isLoadingApprove } = useWaitForTransaction({
		hash: approveData?.hash,
		onSuccess() {
			console.log("aaaaaaaaaaaaaaaa");
			fetchAllowance();
		},
	});

	const { isLoading: isLoadingStake } = useWaitForTransaction({
		hash: stakeData?.hash,
		onSuccess() {
			console.log("Stakeeeeee");
			updAll();
			setNumberOfSrtu("");
		},
	});

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		console.log("onSubmitHandler:", onSubmitHandler);
		e.preventDefault();

		if (formattedNumberOfSrtu && allowance < BigInt(formattedNumberOfSrtu) && approve) {
			approve();
			setNumberOfSrtu("");
			return;
		}

		if (stake && numberOfSrtu !== "") {
			stake();
			return;
		}
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
		<>
			<Form
				onSubmitHandler={onSubmitHandler}
				inputName="stake"
				inputValue={numberOfSrtu}
				onChangeInput={onChangeInput}
				buttonText={isLoadingApprove ? "APPROVE WAITING" : isLoadingStake ? "STAKE LOADING" : "STAKE"}
				balance={struBalance}
				placeholder={"Enter stake amount"}
			>
				<LoadingInfo mobile={true}>
					<p>
						Adding <NumberSTRU>{numberOfSrtu} STRU</NumberSTRU> to Staking
					</p>
				</LoadingInfo>
			</Form>

			<LoadingInfo mobile={false}>
				<p>
					Adding <NumberSTRU>{numberOfSrtu} STRU</NumberSTRU> to Staking
				</p>
			</LoadingInfo>
		</>
	);
};
