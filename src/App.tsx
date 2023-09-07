// import { createPublicClient, http } from "viem";

import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";

import { infuraProvider } from "wagmi/providers/infura";

import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import Theme from "./Theme/Theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import { Main } from "./components/Main/Main";
import { TestInfoSection } from "./components/TestInfoSection/TestInfoSection";

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet],
	[infuraProvider({ apiKey: "35a6a592708b48bc8707f2ba01b3aaf2" }), publicProvider()],
);

const config = createConfig({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: "wagmi",
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				projectId: "prj_CvNDCcaftr8n4KYBRuDIlC0A6CFV",
			},
		}),
		new InjectedConnector({
			chains,
			options: {
				name: "Injected",
				shimDisconnect: true,
			},
		}),
	],
	publicClient,
	webSocketPublicClient,
});

function App() {
	return (
		<WagmiConfig config={config}>
			<Theme>
				<Header />
				<Main>
					<TestInfoSection />
				</Main>
				<Footer />
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</Theme>
		</WagmiConfig>
	);
}

export default App;
