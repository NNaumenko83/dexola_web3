import { useEffect, useState } from "react";
import Web3 from "web3";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount, useDisconnect } from "wagmi";

import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";
import { HeaderContainer, HeaderStyled } from "./Header.styled";

// import contractStakingABI from "../../contracts/contract-staking-abi.json";
import contractTockenTrackingABI from "../../contracts/contract-tokenTracker-abi.json";

// Адреси контрактів
// Адреса контракту на який ми депозитимо токени StarRunner
// const contractStakingAddress = "0x2f112ed8a96327747565f4d4b4615be8fb89459d";
// Адреса контракту з токенами StarRunner
const contractTockenTrackingAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

export const Header = () => {
	// Використовуємо хук для отримання аккаунта і стану підключення
	const { address, isConnected } = useAccount();
	const [ethBalance, setEthbalance] = useState<bigint | null>(null);
	const [struBalance, setStruBalance] = useState<bigint | null>(null);
	// const [stakedBalance, setStakedBalance] = useState<bigint | null>(null);

	// Ініціалізація Web3 та вказання адреси Infura для взаємодії з блокчейном Ethereum
	// Infura для отримання інформації з блокчейну та відправлення транзакцій.
	//  Infura - це популярний сервіс, який надає доступ до Ethereum-нод через HTTP-запити.
	const web3 = new Web3(
		new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2"),
	);

	// Створюємо об'єкти контрактів на основі їхніх ABI (Application Binary Interface) та адрес в мережі Ethereum.
	// Можжна викликати методи цих контрактів, які виконують різні дії на блокчейні (наприклад, отримання балансу або здійснення транзакцій).
	// const contractStaking = new web3.eth.Contract(contractStakingABI, contractStakingAddress) as any;

	const contractTockenTracking = new web3.eth.Contract(contractTockenTrackingABI, contractTockenTrackingAddress) as any;
	// Вибір типу any дозволяє взаємодіяти з об'єктом контракту без строгої типізації TypeScript.
	// Такий підхід може бути корисний, якщо не відомі точні типи, пов'язані з контрактом.

	useEffect(() => {
		// Функція для отримання балансу
		const getBalance = async () => {
			const balanceEth = await web3.eth.getBalance("0x16a370583Ad9318049700d02f88b752761001a97");
			console.log("balanceEth:", balanceEth);
			setEthbalance(balanceEth);

			// if (address) {
			// 	const balanceStaked = await contractStaking.methods.balanceOf(address).call();
			// }

			if (address) {
				const balanceStruOnWallet = await contractTockenTracking.methods.balanceOf(address).call();
				console.log("balanceStruOnWallet:", balanceStruOnWallet);
				setStruBalance(balanceStruOnWallet);
			}
		};

		// Виклик функції для отримання балансу при завантаженні компонента
		getBalance();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Використовуємо хук для відключення аккаунта
	const { disconnect } = useDisconnect();

	if (isConnected)
		return (
			<div>
				Connected to {address}
				<button onClick={() => disconnect()}>Disconnect</button>
				<div>{struBalance?.toString()} STRU</div>
				<div>{ethBalance?.toString()} ETH</div>
			</div>
		);

	return (
		<HeaderStyled>
			<Container>
				<HeaderContainer>
					<Icon name="logo" width={35} height={20} />

					<ConnectButton.Custom>
						{({
							account,
							chain,
							openAccountModal,
							openChainModal,
							openConnectModal,
							authenticationStatus,
							mounted,
						}) => {
							// Примітка: Якщо ваш додаток не використовує аутентифікацію, ви можете видалити всі перевірки 'authenticationStatus'
							const ready = mounted && authenticationStatus !== "loading";
							const connected =
								ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

							return (
								<div
									{...(!ready && {
										"aria-hidden": true,
										style: {
											opacity: 0,
											pointerEvents: "none",
											userSelect: "none",
										},
									})}
								>
									{(() => {
										if (!connected) {
											return (
												<button
													onClick={openConnectModal}
													type="button"
													style={{ width: "150px", height: "50px", backgroundColor: "red" }}
												>
													Connect Wallet
												</button>
											);
										}

										if (chain.unsupported) {
											return (
												<button onClick={openChainModal} type="button">
													Wrong network
												</button>
											);
										}

										return (
											<div style={{ display: "flex", gap: 12 }}>
												<button
													onClick={openChainModal}
													style={{ display: "flex", alignItems: "center" }}
													type="button"
												>
													{chain.hasIcon && (
														<div
															style={{
																background: chain.iconBackground,
																width: 12,
																height: 12,
																borderRadius: 999,
																overflow: "hidden",
																marginRight: 4,
															}}
														>
															{chain.iconUrl && (
																<img
																	alt={chain.name ?? "Chain icon"}
																	src={chain.iconUrl}
																	style={{ width: 12, height: 12 }}
																/>
															)}
														</div>
													)}
													{chain.name}
												</button>

												<button onClick={openAccountModal} type="button">
													{account.displayName}
													{account.displayBalance ? ` (${account.displayBalance})` : ""}
												</button>
											</div>
										);
									})()}
								</div>
							);
						}}
					</ConnectButton.Custom>
				</HeaderContainer>
			</Container>
		</HeaderStyled>
	);
};
