import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { AppWrapper, SuspenseWrapper, Test } from "./SharedLayout.styled";
import { Main } from "../Main/Main";
import { Hero } from "../Hero/Hero";
import { Navigation } from "../Navigation/Navigation";

export const SharedLayout = () => {
	return (
		<AppWrapper>
			<Header />
			<Main>
				<Hero />
				<Test>
					<Navigation />

					<Suspense
						fallback={
							<SuspenseWrapper>
								<p>LOADING...</p>
							</SuspenseWrapper>
						}
					>
						<Outlet />
					</Suspense>
				</Test>
			</Main>
			<Footer />
		</AppWrapper>
	);
};
