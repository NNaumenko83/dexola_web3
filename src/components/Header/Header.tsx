import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { Button, HeaderContainer, HeaderStyled } from "./Header.styled";

export const Header = () => {
	const { address, isConnected } = useAccount();
	const { connect } = useConnect({
		connector: new InjectedConnector(),
	});
	const { disconnect } = useDisconnect();

	const connectWalletHandler = () => {
		console.log("connectWalletHandler");
		connect();
	};

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
					<Button onClick={connectWalletHandler}> Connect wallet</Button>
				</HeaderContainer>
			</Container>
		</HeaderStyled>
	);
};
