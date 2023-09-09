import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import "react-toastify/dist/ReactToastify.css";

import Theme from "./Theme/Theme";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";

// Pages
import ClaimRewards from "./pages/ClaimRewards/ClaimRewards";
import Stake from "./pages/Stake/Stake";
import Withdraw from "./pages/Withdraw/Withdraw";
import NotFound from "./pages/NotFound/NotFound";

const { chains, publicClient } = configureChains(
	[sepolia, mainnet, polygon, optimism, arbitrum, base, zora],
	[infuraProvider({ apiKey: "35a6a592708b48bc8707f2ba01b3aaf2" }), publicProvider()],
);

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

function App() {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>
				<Theme>
					<Routes>
						<Route path="/" element={<SharedLayout />}>
							<Route index element={<Stake />} />
							<Route path="withdraw" element={<Withdraw />} />
							<Route path="claimrewards" element={<ClaimRewards />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>

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
