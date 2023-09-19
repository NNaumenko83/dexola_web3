import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import React, { useEffect, useState } from "react";
import { useWeb3 } from "../../hooks/useWeb3";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import contractStakingABI from "../../contracts/contract-staking-abi.json";
import contractStarRunnerTokenABI from "../../contracts/contract-tokenTracker-abi.json";
import { validateAmount } from "../../helpers/validateAmount";
import { StakedForm, StakedFormProps } from "../../components/StakedForm/StakedForm";
import { TransactionStatusWrapper } from "../../components/TransactionStatusWrapper/TransactionStatusWrapper";
import { LoadingInfo } from "../../components/LoadingInfo/LoadingInfo";
import { NumberSTRU } from "../../components/StakedForm/StakedForm.styled";

const Stake = () => {
	const { isConnected } = useAccount();
	const { address } = useAccount();
	const { contractStarRunnerToken, struBalance, web3, updAll } = useWeb3();
	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");
	const [allowance, setAllowance] = useState(0);

	const formattedNumberOfSrtu = web3?.utils.toWei(numberOfSrtu, "ether");

	async function fetchAllowance() {
		const currentAllowance = await contractStarRunnerToken.methods
			.allowance(address, "0x2f112ed8a96327747565f4d4b4615be8fb89459d")
			.call();
		console.log("currentAllowance:", currentAllowance);
		setAllowance(currentAllowance);
	}

	useEffect(() => {
		console.log("useEffect: Stake");

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

	// Пропси для StakedForm
	const stakedFormProps: StakedFormProps = {
		onSubmitHandler,
		onChangeInput,
		numberOfSrtu,
		isLoadingApprove,
		isLoadingStake,
	};

	return (
		<Container>
			<PageWrapper>
				{!isConnected ? (
					<NotConnectedWrapper />
				) : (
					<>
						<PageTitleWrapper>
							<PageTitle>Stake</PageTitle>
							<p>
								Reward rate:<span>1 STRU/week</span>
							</p>
						</PageTitleWrapper>
						<StakedForm {...stakedFormProps} />
					</>
				)}
			</PageWrapper>
			<TransactionStatusWrapper>
				<LoadingInfo mobile={false}>
					<p>
						Adding <NumberSTRU>{numberOfSrtu} STRU</NumberSTRU> to Staking
					</p>
				</LoadingInfo>
			</TransactionStatusWrapper>
		</Container>
	);
};

export default Stake;
