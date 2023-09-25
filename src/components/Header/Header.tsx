import { useAccount /*useDisconnect*/ } from "wagmi";
import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";
import {
	AdddressText,
	Delimiter,
	EtheriumInfoWrapper,
	HeaderBalanceInfoWrapper,
	HeaderContainer,
	HeaderStyled,
	IconBalanceWrapper,
	StruIcon,
} from "./Header.styled";
import { ConnectToWalletButtonHeader } from "../ConnectToWalletButtonHeader/ConnectToWalletButtonHeader";
import { useWeb3 } from "../../hooks/useWeb3";
// import { useEffect } from "react";
import { convertEthereumAddress } from "../../utils/convertEthereumAddress";

export const Header = () => {
	// Використовуємо хук для отримання аккаунта і стану підключення
	const { address, isConnected } = useAccount();
	const { balance, struBalance } = useWeb3();

	return (
		<HeaderStyled>
			<Container>
				<HeaderContainer>
					<Icon name="logo" width={35} height={20} />

					{isConnected ? (
						<HeaderBalanceInfoWrapper>
							<IconBalanceWrapper>
								<StruIcon></StruIcon>
								{struBalance} STRU
							</IconBalanceWrapper>

							<EtheriumInfoWrapper>
								<IconBalanceWrapper>
									<Icon name="eth_icon" width={32} height={32} />
									{balance} ETH
								</IconBalanceWrapper>

								<Delimiter>|</Delimiter>

								<AdddressText>{convertEthereumAddress(address)}</AdddressText>
							</EtheriumInfoWrapper>
							{/* При необхідності в майбутньому можна в майбутньому додати кнопку disconnect */}
							{/* <button onClick={() => disconnect()}>Disconnect</button> */}
						</HeaderBalanceInfoWrapper>
					) : (
						<ConnectToWalletButtonHeader />
					)}
				</HeaderContainer>
			</Container>
		</HeaderStyled>
	);
};
