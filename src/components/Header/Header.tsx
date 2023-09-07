import { Container } from "../Container/Container";

import { useConnect } from "wagmi";

import { /* Button,*/ HeaderContainer, HeaderStyled } from "./Header.styled";

export const Header = () => {
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

	// const connectWalletHandler = () => {
	// 	console.log("connectWalletHandler");
	// 	connect();
	// };

	return (
		<HeaderStyled>
			<Container>
				<HeaderContainer>
					{/* <Icon name="logo" width={35} height={20} />
					<Button onClick={connectWalletHandler}> Connect wallet</Button> */}

					<div>
						{connectors.map(connector => (
							<button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
								{connector.name}
								{!connector.ready && " (unsupported)"}
								{isLoading && connector.id === pendingConnector?.id && " (connecting)"}
							</button>
						))}

						{error && <div>{error.message}</div>}
					</div>
				</HeaderContainer>
			</Container>
		</HeaderStyled>
	);
};
