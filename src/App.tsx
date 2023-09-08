import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
	[sepolia, mainnet, polygon, optimism, arbitrum, base, zora],
	[infuraProvider({ apiKey: "35a6a592708b48bc8707f2ba01b3aaf2" }), publicProvider()],
);

console.log(publicClient);

const projectId = "d2e5b14023db785f96b1bbb053881d95";

const connectors = connectorsForWallets([
	{
		groupName: "Recommended",
		wallets: [injectedWallet({ chains }), metaMaskWallet({ projectId, chains })],
	},
]);

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

import Theme from "./Theme/Theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import { Main } from "./components/Main/Main";
import { TestInfoSection } from "./components/TestInfoSection/TestInfoSection";

function App() {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>
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
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default App;
