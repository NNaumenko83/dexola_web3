import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";

import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { WithdrawForm, IWithdrawdFormProps } from "../../components/WithdrawForm/WithdrawForm";

import { useWeb3 } from "../../hooks/useWeb3";
import { useEffect, useState } from "react";
import contractStakingABI from "../../contracts/contract-staking-abi.json";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { validateAmount } from "../../helpers/validateAmount";
import { TransactionStatusWrapper } from "../../components/TransactionStatusWrapper/TransactionStatusWrapper";
import { SuccessInfo } from "../../components/SuccessInfo/SuccessInfo";
import { NumberSTRU } from "../../components/StakedForm/StakedForm.styled";
import { LoadingInfo } from "../../components/LoadingInfo/LoadingInfo";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const Withdraw = () => {
	const { isConnected } = useAccount();
	const { stakedBalance, web3, updAll } = useWeb3();
	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");
	const [transactionNumberOfStru, setTransactionNumberOfStru] = useState<string>("");
	const [isSuccessWithdraw, setIsSuccessWithdraw] = useState(false);
	const [isErrorWithdraw, setIsErrorWithdraw] = useState(false);
	const [isSuccessWithdrawAll, setIsSuccessWithdrawAll] = useState(false);
	const [isErrorWithdrawAll, setIsErrorWithdrawAll] = useState(false);

	const formattedNumberOfSrtu = web3?.utils.toWei(numberOfSrtu, "ether");

	useEffect(() => {
		if (isSuccessWithdraw) {
			setTimeout(() => {
				setIsSuccessWithdraw(false);
			}, 8000);
		}
		if (isErrorWithdraw) {
			setTimeout(() => {
				setIsErrorWithdraw(false);
			}, 8000);
		}
	}, [isErrorWithdraw, isSuccessWithdraw]);

	// Знаття зі стейк певної кількості токенів
	const { config: withdrawConfig } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "withdraw",
		args: [formattedNumberOfSrtu],
		enabled: Boolean(numberOfSrtu),
	});

	const { data: withdrawData, write: withdraw } = useContractWrite(withdrawConfig);

	const { isLoading: isLoadingWithdraw } = useWaitForTransaction({
		hash: withdrawData?.hash,
		onSuccess() {
			setIsSuccessWithdraw(true);
			updAll();
			setNumberOfSrtu("");
		},
		onError() {
			setIsErrorWithdraw(true);
		},
	});

	// Знаття зі стейку всіх токенів і винагороди
	const { config: withdrawAllConfig } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "exit",
		enabled: Boolean(!numberOfSrtu),
	});

	const { data: withdrawAllData, write: withdrawAll } = useContractWrite(withdrawAllConfig);

	const { isLoading: isLoadingWithdrawAll } = useWaitForTransaction({
		hash: withdrawAllData?.hash,
		onSuccess() {
			setIsSuccessWithdrawAll(true);
			updAll();
			setNumberOfSrtu("");
		},
		onError() {
			setIsErrorWithdrawAll(true);
		},
	});

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		if (withdraw && numberOfSrtu) {
			setTransactionNumberOfStru(numberOfSrtu);
			withdraw();
		}

		if (withdrawAll && !numberOfSrtu) {
			withdrawAll();
		}
	};

	const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
		const inputText = e.target.value;

		if (!validateAmount(inputText) && inputText === "") {
			setNumberOfSrtu(inputText);
			return;
		}
		if (!validateAmount(inputText)) {
			return;
		}
		if (
			stakedBalance &&
			web3 &&
			Number(web3.utils.toWei(stakedBalance, "ether")) < Number(web3.utils.toWei(e.target.value, "ether"))
		) {
			return;
		}

		setNumberOfSrtu(inputText);
	};

	const stakedFormProps: IWithdrawdFormProps = {
		onSubmitHandler,
		onChangeInput,
		numberOfSrtu,
		isLoadingWithdraw,
		isErrorWithdraw,
		isSuccessWithdraw,
		transactionNumberOfStru,
		isSuccessWithdrawAll,
		isErrorWithdrawAll,
		isLoadingWithdrawAll,
	};

	return (
		<>
			<Container>
				<PageWrapper>
					{!isConnected ? (
						<NotConnectedWrapper />
					) : (
						<>
							<PageTitleWrapper>
								<PageTitle>Withdraw</PageTitle>
							</PageTitleWrapper>
							<WithdrawForm {...stakedFormProps} />
						</>
					)}
				</PageWrapper>
			</Container>
			{(isErrorWithdraw || isErrorWithdrawAll) && (
				<TransactionStatusWrapper>
					<ErrorMessage mobile={false} />
				</TransactionStatusWrapper>
			)}
			{/* Виведення інформації про статус транзакцій при знятті зі стейку */}
			{isSuccessWithdraw && (
				<TransactionStatusWrapper>
					<SuccessInfo mobile={false}>
						<p>
							<NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU> successfully withdrawed
						</p>
					</SuccessInfo>
				</TransactionStatusWrapper>
			)}
			{isLoadingWithdraw && (
				<TransactionStatusWrapper>
					<LoadingInfo mobile={false}>
						<p>
							Withdrawing <NumberSTRU>{transactionNumberOfStru} STRU</NumberSTRU>
						</p>
					</LoadingInfo>
				</TransactionStatusWrapper>
			)}
			{/* Виведення інформації про статус транзакцій при знятті всього стейку і винагород */}
			{isSuccessWithdrawAll && (
				<TransactionStatusWrapper>
					<SuccessInfo mobile={false}>
						<p>Successfully withdrawed all and rewards</p>
					</SuccessInfo>
				</TransactionStatusWrapper>
			)}
			{isLoadingWithdrawAll && (
				<TransactionStatusWrapper>
					<LoadingInfo mobile={false}>
						<p>Witdrawing all and rewards</p>
					</LoadingInfo>
				</TransactionStatusWrapper>
			)}
		</>
	);
};

export default Withdraw;
