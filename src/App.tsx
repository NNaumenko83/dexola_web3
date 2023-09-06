import Theme from "./Theme/Theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import { Main } from "./components/Main/Main";
import { TestInfoSection } from "./components/TestInfoSection/TestInfoSection";

function App() {
	return (
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
	);
}

export default App;
