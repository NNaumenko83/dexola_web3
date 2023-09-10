import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { AppWrapper, SuspenseWrapper } from "./SharedLayout.styled";
import { Main } from "../Main/Main";
import { Hero } from "../Hero/Hero";

export const SharedLayout = () => {
	return (
		<AppWrapper>
			<Header />
			<Main>
				<Hero />
				<nav>
					<NavLink to="/">Stake</NavLink>
					<NavLink to="withdraw">Withdraw</NavLink>
					<NavLink to="claimrewards">ClaimRewards</NavLink>
				</nav>
				<Suspense
					fallback={
						<SuspenseWrapper>
							<p>LOADING...</p>
						</SuspenseWrapper>
					}
				>
					<Outlet />
				</Suspense>
			</Main>
			<Footer />
		</AppWrapper>
	);
};
