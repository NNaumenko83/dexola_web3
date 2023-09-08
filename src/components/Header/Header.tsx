import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";

import { useAccount, useDisconnect } from "wagmi";

// import Web3 from "web3";

// import { infuraProvider } from "wagmi/providers/infura";

import { HeaderContainer, HeaderStyled } from "./Header.styled";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import contractInterface from "../../contracts/contract-abi.json";
console.log("contractInterface:", contractInterface);

export const Header = () => {
	const { address, isConnected } = useAccount();

	const { connector } = useAccount();
	// const web3 = new Web3(connector);
	console.log("connector:", connector);

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
