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

const { chains, publicClient } = configureChains(
	[sepolia],
	[infuraProvider({ apiKey: "35a6a592708b48bc8707f2ba01b3aaf2" }), publicProvider()],
);

const { connectors } = getDefaultWallets({
	appName: "My RainbowKit App",
	projectId: "d2e5b14023db785f96b1bbb053881d95",
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
