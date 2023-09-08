import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";

import { useAccount, useDisconnect } from "wagmi";

// import Web3 from "web3";

// import { infuraProvider } from "wagmi/providers/infura";

import { HeaderContainer, HeaderStyled } from "./Header.styled";

import { ConnectButton } from "@rainbow-me/rainbowkit";

// import contractInterface from "../../contracts/contract-abi.json";

import { useEffect } from "react";
import Web3 from "web3";

export const Header = () => {
	const { address, isConnected } = useAccount();

	// const [contractData, setContractData] = useState("");
	// const [loading, setLoading] = useState(false);

	useEffect(() => {
		const web3 = new Web3(`https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2`);
		console.log("web3:", web3);

		const test = async () => {
			const balance = await web3.eth.getBalance(address);
			console.log(balance);
		};

		test();

		// web3.eth.getBalance("0x16a370583Ad9318049700d02f88b752761001a97", (error, balance) => {
		// 	if (!error) {
		// 		console.log(`Баланс гаманця ${address}: ${web3.utils.fromWei(balance, "ether")} ETH`);
		// 	} else {
		// 		console.error("Помилка отримання балансу:", error);
		// 	}
		// });

		// Адреса контракту і його ABI (Application Binary Interface)
		// const contractAddress = "0x2F112ED8A96327747565f4d4b4615be8fb89459d";
		// const contractABI = contractInterface;

		// Створення інстанції контракту
		// const contract = new web3.eth.Contract(contractABI, contractAddress);
		// console.log("contract:", contract);

		// Функція для отримання інформації про контракт
		// async function getContractInfo() {
		// 	try {
		// 		setLoading(true);
		// 		const result = await contract.methods.balanceOf();
		// 		console.log("result:", result);
		// 		setContractData(result);
		// 	} catch (error) {
		// 		console.error("Помилка виклику функції:", error);
		// 	} finally {
		// 		setLoading(false);
		// 	}
		// }

		// // Виклик функції для отримання інформації про контракт при завантаженні компонента
		// getContractInfo();
	}, []);

	const { disconnect } = useDisconnect();

	if (isConnected)
		return (
			<div>
				Connected to {address}
				<button onClick={() => disconnect()}>Disconnect</button>
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
							// Note: If your app doesn't use authentication, you
							// can remove all 'authenticationStatus' checks
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
