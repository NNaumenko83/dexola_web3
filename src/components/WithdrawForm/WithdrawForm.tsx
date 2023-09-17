import { Form } from "../Form/Form";

import React, { /*useEffect,*/ useState } from "react";
import { useWeb3 } from "../../hooks/useWeb3";

// import { toBigInt } from "web3-utils";
// import { useWeb3 } from "../../hooks/useWeb3";

// import { useAccount } from "wagmi";
// import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

// import contractStakingABI from "../../contracts/contract-staking-abi.json";
// import contractStarRunnerTokenABI from "../../contracts/contract-tokenTracker-abi.json";

export const WithdrawForm = () => {
	const { stakedBalance } = useWeb3();
	console.log("stakedBalance:", stakedBalance);

	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		console.log("WithdrawForm");
	};

	const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
		setNumberOfSrtu(e.target.value);
	};

	return (
		<Form
			onSubmitHandler={onSubmitHandler}
			inputName="stake"
			inputValue={numberOfSrtu}
			onChangeInput={onChangeInput}
			buttonText={"Withdraw"}
			// isLoading={isLoadingApprove}
			balance={stakedBalance}
			placeholder={"Enter stake amount"}
		/>
	);
};
