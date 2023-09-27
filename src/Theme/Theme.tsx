import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
	colors: {
		white: "#FFFFFF",
		black: "#000000",
		accentBlue: "#09237E",
		darkGrey: "#2F2F2F",
		lightGrey: "#B3B3B3",
		background: "#060412",
		warningRose: "#e2e2e2",
		//
		// Title color
		title: "#FFFFFF",
		// Table text color
		tableTextColor: "#FFFFFF",
		// Mobile help icon color
		helpIconColorMobile: "#B3B3B3",
		// Tablet and Web help icon color
		helpIconColorTabletWeb: "#FFFFFF",
		// Active page link color
		activePageLinkColor: "#FFFFFF",
		// Active page link border color
		activePageLinkBorderColor: "#204FFE",
		// Tablet and deskrop background footer color
		footerTabletBgColor: "#000000",
		// Balance color
		balanceColor: "#FFFFFF",
		// Info Loading and error text color
		infoColor: "#FFFFFF",
		// Placeholder color
		placeholderColor: "#B3B3B3",
		// Input border botom color
		inputBorderBotomColor: "#FFFFFF",
		// Input text color
		inputTextColor: "#FFFFFF",
		// footer borders
		footerBordersColor: "#204FFE",
		// Subtitle color
		subtitle: "#FFFFFF",
		//Footer text color
		footerTextColor: "#B3B3B3",
		//ButtonColors
		buttonTextColor: "#FFFFFF",
		buttonBackgroundColor: "#272A2E",
		buttonHoverBackgroundColor: "rgba(39, 42, 46, 0.9)",
	},

	fontSizes: {
		title: {
			web: "3rem",
			tablet: "2.5rem",
			mobile: "1.75rem",
		},

		textValueTable: {
			web: "2.25rem",
			tablet: "1.75rem",
			mobile: "1.125rem",
		},

		subTitle: {
			web: "1.5rem",
			tablet: "1.5rem",
			mobile: "1.125rem",
		},

		table: {
			web: "1rem",
			tablet: "1rem",
			mobile: "0.75rem",
		},

		body: {
			web: "1.125rem",
			tablet: "1rem",
			mobile: "0.875rem",
		},

		placeholder: {
			tablet: "1rem",
			mobile: "0.875rem",
		},

		navLink: {
			web: "1.125rem",
			tablet: "1rem",
			mobile: "0.875rem",
		},

		headerBalance: {
			big: "0.875rem",
			small: "0.75rem",
		},

		button: {
			small: "0.875rem",
			medium: "1rem",
		},

		footerText: { tablet: "0.875rem", mobile: "0.6875rem" },
	},

	fontWeights: {
		normal: 400,
		medium: 500,
		semiBold: 600,
		bold: 700,
	},

	breakpoints: {
		web: "1440px",
		maxTablet: "1439px",
		tablet: "744px",
		maxMobile: "743px",
		mobile: "375px",
	},
};

interface IPropsTheme {
	children: ReactNode;
}

export default function Theme({ children }: IPropsTheme) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
