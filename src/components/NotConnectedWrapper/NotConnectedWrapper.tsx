import { useAccount } from "wagmi";

import { StakeForm } from "../../components/StakeForm/StakeForm";
import { ConnectToWalletButton } from "../../components/ConnectToWalletButton/ConnectToWalletButton";
import Icon from "../../components/Icon/Icon";
import { Break, IconAndTextWrapper, NotConnectedWrapperStyled, Text } from "./NotConnectedWrapper.styled";

export const NotConnectedWrapper = () => {
	const { isConnected } = useAccount();

	return (
		<>
			{!isConnected ? (
				<NotConnectedWrapperStyled>
					<IconAndTextWrapper>
						<Icon name="not_connected_wallet" width={96} height={96} />

						<Text>
							To start staking you need <Break />
							to connect your wallet first
						</Text>
					</IconAndTextWrapper>
					<ConnectToWalletButton />
				</NotConnectedWrapperStyled>
			) : (
				<StakeForm />
			)}
		</>
	);
};
