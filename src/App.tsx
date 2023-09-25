import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy } from "react";

import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import Theme from "./Theme/Theme";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
// // Pages
const ClaimRewards = lazy(() => import("./pages/ClaimRewards/ClaimRewards"));
const Stake = lazy(() => import("./pages/Stake/Stake"));
const Withdraw = lazy(() => import("./pages/Withdraw/Withdraw"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

import { Web3Provider } from "./context/Web3Context";

// Імпортуємо ключі з середовища
const infuraApiKey = import.meta.env.VITE_APP_INFURA_API_KEY;
const appProjectId = import.meta.env.VITE_APP_PROJECT_ID;

const { chains, publicClient } = configureChains(
	[sepolia],
	[infuraProvider({ apiKey: infuraApiKey }), publicProvider()],
);

const { connectors } = getDefaultWallets({
	appName: "My RainbowKit App",
	projectId: appProjectId,
	chains,
});

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
					<Web3Provider>
						<Routes>
							<Route path="/" element={<SharedLayout />}>
								<Route index element={<Stake />} />
								<Route path="withdraw" element={<Withdraw />} />
								<Route path="claimrewards" element={<ClaimRewards />} />
								<Route path="*" element={<NotFound />} />
							</Route>
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
					</Web3Provider>
				</Theme>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default App;
