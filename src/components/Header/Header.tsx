import { useEffect } from "react";
import Web3 from "web3";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount, useDisconnect } from "wagmi";

import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";
import { HeaderContainer, HeaderStyled } from "./Header.styled";

import contractABI from "../../contracts/contract-abi.json";
import contractStrABI from "../../contracts/contract-str-abi.json";

const contractAddress = "0x2f112ed8a96327747565f4d4b4615be8fb89459d";
const contractStrAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

export const Header = () => {
	const { address, isConnected } = useAccount();
	const web3 = new Web3(
		new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/35a6a592708b48bc8707f2ba01b3aaf2"),
	);

	const contractOne = new web3.eth.Contract(contractABI, contractAddress);
	const contractStrTest = new web3.eth.Contract(contractStrABI, contractStrAddress);

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
		};

		test();
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
