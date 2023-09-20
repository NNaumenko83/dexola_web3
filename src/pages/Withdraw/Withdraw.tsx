import { useAccount } from "wagmi";
import { Container } from "../../components/Container/Container";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { WithdrawForm, IWithdrawdFormProps } from "../../components/WithdrawForm/WithdrawForm";
import { useWeb3 } from "../../hooks/useWeb3";
import { useEffect, useState } from "react";
import contractStakingABI from "../../contracts/contract-staking-abi.json";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { validateAmount } from "../../helpers/validateAmount";

const Withdraw = () => {
	const { isConnected } = useAccount();
	const { stakedBalance, web3, updAll } = useWeb3();
	const [numberOfSrtu, setNumberOfSrtu] = useState<string>("");
	const [transactionNumberOfStru, setTransactionNumberOfStru] = useState<string>("");
	const [isSuccessWithdraw, setIsSuccessWithdraw] = useState(false);
	const [isErrorWithdraw, setIsErrorWithdraw] = useState(false);
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

	const { config: withdrawConfig } = usePrepareContractWrite({
		address: "0x2f112ed8a96327747565f4d4b4615be8fb89459d",
		abi: contractStakingABI,
		functionName: "withdraw",
		args: [formattedNumberOfSrtu],
		enabled: Boolean(numberOfSrtu),
	});

	const { data: withdrawData, write: withdraw } = useContractWrite(withdrawConfig);
	console.log("withdraw:", withdraw);

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

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		console.log("Submit");
	};

	const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
		const inputText = e.target.value;
		console.log("inputText:", inputText);
		setTransactionNumberOfStru(numberOfSrtu);
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
	};

	return (
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
	);
};

export default Withdraw;
