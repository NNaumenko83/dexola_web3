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

		//
		//
		//
		//
		//
		//ButtonColors
		buttonTextColor: "#FFFFFF",
		buttonBackgroundColor: "#272A2E",
		buttonHoverBackgroundColor: "rgba(39, 42, 46, 0.9)",
		//Footer text color
		footerTextColor: "#B3B3B3",

		// Subtitle color
		subtitle: "#FFFFFF",
		// Card border color
		borderCard: "#09237E",
		// Bottom border for title
		titleBottomBorder: "#FFFFFF",
		// Hero images list border
		heroImagesListBorder: "#204FFE",
		// Hero images list border
		heroImagesBorder: "#204FFE",
		// header bottom border
		headerBottomColor: "#204FFE",
		// footer borders
		footerBordersColor: "#204FFE",
		// Table row second background
		tableRowSecondBackground: "#080B27",
		// Table head color
		tableHead: "#FFFFFF",
		// Table body color
		tableBody: "#FFFFFF",
		// Input border bottom
		inputBorderBottom: "#FFFFFF",
		// Input Error border bottom
		inputErrorBorderBottom: "#EB3795",
		// Input Star Color
		inputStarColor: "#EB3795",
		// Input text color
		inputTextColor: "#FFFFFF",
		// Hero text color
		heroTextColor: "#FFFFFF",
		// Input placeholder color
		inputPlaceholder: "#B3B3B3",
		// Form border color
		formBorderColor: "#204FFE",
		// Error message
		errorMessageColor: "#EB3795",
		// Eye default color
		eyeDefaultColor: "#FFFFFF",
		// Eye hover color
		eyeHoverColor: "#204FFE",
		// Scroll bottom border color
		scrollDownBorderolor: "#FFFFFF",
		// Starruner text color
		starrunerTextColor: "#FFFFFF",
		// Starruner rectangle background
		starrunerBackgroundRectangle: "#121456",
	},

	fontSizes: {
		title: {
			web: "3rem",
			tablet: "2.5rem",
			mobile: "1.75rem",
		},

		textValueTable: {
			web: "36px",
			tablet: "28px",
			mobile: "18px",
		},

		subTitle: {
			web: "24px",
			tablet: "24px",
			mobile: "18px",
		},

		table: {
			web: "16px",
			tablet: "16px",
			mobile: "12px",
		},

		body: {
			web: "1.125rem",
			tablet: "1rem",
			mobile: "0.875rem",
		},

		navLink: {
			web: "1.125rem",
			tablet: "1rem",
			mobile: "0.875rem",
		},

		button: {
			small: "0.875rem",
			medium: "1rem",
		},

		footerText: { tablet: "0.875rem", mobile: "0.6875rem" },

		// error: "0.8125rem",
	},

	fontWeights: {
		// normal: 400,
		medium: 500,
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
