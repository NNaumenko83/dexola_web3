import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";

import { useAccount, useDisconnect } from "wagmi";

// import Web3 from "web3";

// import { infuraProvider } from "wagmi/providers/infura";

import { HeaderContainer, HeaderStyled } from "./Header.styled";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import contractABI from "../../contracts/contract-abi.json";
import contractStrABI from "../../contracts/contract-str-abi.json";
import { useEffect } from "react";
import Web3, { AbiBaseFragment } from "web3";

const contractAddress = "0x2f112ed8a96327747565f4d4b4615be8fb89459d";
const contractStrAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

// interface ContractMethodsInterface {
// 	methods: {
// 		balanceOf: (address: string) => {
// 			call: () => Promise<number>; // Ви можете змінити тип відповідно до видачі методу
// 		};
// 	};
// }
// interface ContractStr {
// 	methods: {
// 		balanceOf: (address: string) => {
// 			call: () => Promise<number>; // Ви можете змінити тип відповідно до видачі методу
// 		};
// 	};
// }

// const web3 = new Web3(`https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2`);

export const Header = () => {
	const { address, isConnected } = useAccount();
	const web3 = new Web3(
		new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2"),
	);

	const contractOne = new web3.eth.Contract(contractABI, contractAddress);
	const contractStrTest = new web3.eth.Contract(contractStrABI, contractStrAddress);

	// const [contractData, setContractData] = useState("");
	// const [loading, setLoading] = useState(false);

	useEffect(() => {
		const test = async () => {
			const balance = await web3.eth.getBalance("0x16a370583Ad9318049700d02f88b752761001a97");
			console.log("balance:", balance);

			if (address) {
				const testOne = await contractOne.methods.balanceOf(address).call();
				console.log("testOne:", testOne);
			}

			if (address) {
				const strBalance = await contractStrTest.methods.balanceOf(address).call();
				console.log("strBalance:", strBalance);
			}

			// const testOne = await contractOne.methods.getRewardForDuration().call();

			// const testTwo = await contractOne.methods.periodFinish().call();
		};

		test();

		// 0x16a370583ad9318049700d02f88b752761001a97;

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
