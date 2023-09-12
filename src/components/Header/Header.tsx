// import { useEffect, useState } from "react";
// import Web3 from "web3";

import { useAccount, useDisconnect } from "wagmi";

import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";
import { HeaderContainer, HeaderStyled } from "./Header.styled";

// import contractStakingABI from "../../contracts/contract-staking-abi.json";
// import contractTockenTrackingABI from "../../contracts/contract-tokenTracker-abi.json";
import { ConnectToWalletButton } from "../ConnectToWalletButton/ConnectToWalletButton";
import { useWeb3 } from "../../hooks/useWeb3";
import { useEffect } from "react";

// Адреси контрактів
// Адреса контракту на який ми депозитимо токени StarRunner
// const contractStakingAddress = "0x2f112ed8a96327747565f4d4b4615be8fb89459d";
// Адреса контракту з токенами StarRunner
// const contractTockenTrackingAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

export const Header = () => {
	// Використовуємо хук для отримання аккаунта і стану підключення
	const { address, isConnected } = useAccount();

	const { web3, balance, struBalance, getBalance, getStruBalance } = useWeb3();

	useEffect(() => {
		console.log("useEffect Header");
		if (web3) {
			getBalance();
			getStruBalance();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [web3]);

	// const [ethBalance, setEthbalance] = useState<bigint | null>(null);
	// const [struBalance, setStruBalance] = useState<bigint | null>(null);
	// const [stakedBalance, setStakedBalance] = useState<bigint | null>(null);

	// Ініціалізація Web3 та вказання адреси Infura для взаємодії з блокчейном Ethereum
	// Infura для отримання інформації з блокчейну та відправлення транзакцій.
	//  Infura - це популярний сервіс, який надає доступ до Ethereum-нод через HTTP-запити.
	// const web3 = new Web3(
	// 	new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2"),
	// );

	// Створюємо об'єкти контрактів на основі їхніх ABI (Application Binary Interface) та адрес в мережі Ethereum.
	// Можжна викликати методи цих контрактів, які виконують різні дії на блокчейні (наприклад, отримання балансу або здійснення транзакцій).
	// const contractStaking = new web3.eth.Contract(contractStakingABI, contractStakingAddress) as any;

	// const contractTockenTracking = new web3.eth.Contract(contractTockenTrackingABI, contractTockenTrackingAddress) as any;
	// Вибір типу any дозволяє взаємодіяти з об'єктом контракту без строгої типізації TypeScript.
	// Такий підхід може бути корисний, якщо не відомі точні типи, пов'язані з контрактом.

	// useEffect(() => {
	// 	// Функція для отримання балансу
	// 	const getBalance = async () => {
	// 		const balanceEth = await web3.eth.getBalance("0x16a370583Ad9318049700d02f88b752761001a97");
	// 		console.log("balanceEth:", balanceEth);
	// 		setEthbalance(balanceEth);

	// 		// if (address) {
	// 		// 	const balanceStaked = await contractStaking.methods.balanceOf(address).call();
	// 		// }

	// 		if (address) {
	// 			const balanceStruOnWallet = await contractTockenTracking.methods.balanceOf(address).call();
	// 			console.log("balanceStruOnWallet:", balanceStruOnWallet);
	// 			setStruBalance(balanceStruOnWallet);
	// 		}
	// 	};

	// 	// Виклик функції для отримання балансу при завантаженні компонента
	// 	getBalance();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// Використовуємо хук для відключення аккаунта
	const { disconnect } = useDisconnect();

	return (
		<HeaderStyled>
			<Container>
				<HeaderContainer>
					<Icon name="logo" width={35} height={20} />

					{isConnected ? (
						<div>
							Connected to {address}
							Balance {balance}
							STRU {struBalance}
							<button onClick={() => disconnect()}>Disconnect</button>
							{/* <div>{struBalance?.toString()} STRU</div>
							<div>{ethBalance?.toString()} ETH</div> */}
						</div>
					) : (
						<ConnectToWalletButton />
					)}
				</HeaderContainer>
			</Container>
		</HeaderStyled>
	);
};
