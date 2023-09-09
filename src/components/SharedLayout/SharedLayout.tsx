import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SuspenseWrapper } from "./SharedLayout.styled";

export const SharedLayout = () => {
	return (
		<>
			<Header />
			<div>
				<nav>
					<NavLink to="/">Stake</NavLink>
					<NavLink to="withdraw">Withdraw</NavLink>
					<NavLink to="claimrewards">ClaimRewards</NavLink>
				</nav>
			</div>
			<Suspense
				fallback={
					<SuspenseWrapper>
						<p>LOADING...</p>
					</SuspenseWrapper>
				}
			>
				<Outlet />
			</Suspense>
			<Footer />
		</>
	);
};
