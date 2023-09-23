import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { AppWrapper, SuspenseWrapper, PagesWrapper } from "./SharedLayout.styled";
import { Main } from "../Main/Main";
import { Hero } from "../Hero/Hero";
import { Navigation } from "../Navigation/Navigation";
import { Spinner } from "../Spinner/Spinner";
import { TransactionStatusWrapper } from "../TransactionStatusWrapper/TransactionStatusWrapper";
import { SuccessInfo } from "../SuccessInfo/SuccessInfo";

export const SharedLayout = () => {
	return (
		<AppWrapper>
			<Header />
			<Main>
				<Hero />
				<PagesWrapper>
					<Navigation />
					<Suspense
						fallback={
							<SuspenseWrapper>
								<Spinner />
								<p>LOADING...</p>
							</SuspenseWrapper>
						}
					>
						<Outlet />
					</Suspense>

					{"isSuccessApprove" && (
						<TransactionStatusWrapper>
							<SuccessInfo>
								<p>Successfully approved</p>
							</SuccessInfo>
						</TransactionStatusWrapper>
					)}
				</PagesWrapper>
			</Main>
			<Footer />
		</AppWrapper>
	);
};
