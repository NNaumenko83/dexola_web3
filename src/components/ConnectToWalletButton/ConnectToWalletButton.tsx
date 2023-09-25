import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../Button/Button";
import styled from "styled-components";

export const ConnectWalletStyled = styled(Button)`
	width: 100%;
	height: 2.5rem;
	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		width: 223px;
		height: 48px;
	}
`;

const ButtonWrapper = styled.div`
	@media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
		display: flex;
		justify-content: center;
	}
`;

// В даному компоненті використаний код з https://www.rainbowkit.com/docs/custom-connect-button

// В даному компоненті використаний код з https://www.rainbowkit.com/docs/custom-connect-button

export const ConnectToWalletButton = () => {
	return (
		<ConnectButton.Custom>
			{({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
				// Примітка: Якщо ваш додаток не використовує аутентифікацію, ви можете видалити всі перевірки 'authenticationStatus'
				const ready = mounted && authenticationStatus !== "loading";
				const connected =
					ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

				return (
					<ButtonWrapper
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
								return <ConnectWalletStyled onClick={openConnectModal}>Connect Wallet</ConnectWalletStyled>;
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
									<button onClick={openChainModal} style={{ display: "flex", alignItems: "center" }} type="button">
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
													<img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
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
					</ButtonWrapper>
				);
			}}
		</ConnectButton.Custom>
	);
};
