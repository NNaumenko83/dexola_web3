import { useContext } from "react";
import { Web3Context, Web3ContextType } from "../context/Web3Context";

export const useWeb3 = (): Web3ContextType => {
	const context = useContext(Web3Context);
	if (context === undefined) {
		throw new Error("useWeb3 повинен використовуватись в межах Web3Provider");
	}
	return context;
};
