import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { AppWrapper, SuspenseWrapper } from "./SharedLayout.styled";
import { Main } from "../Main/Main";
import { Hero } from "../Hero/Hero";
import { NavigateComponent } from "../NavigateComponent/NavigateComponent";

export const SharedLayout = () => {
	return (
		<AppWrapper>
			<Header />
			<Main>
				<Hero />
				<NavigateComponent />

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
