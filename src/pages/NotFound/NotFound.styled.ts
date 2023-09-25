import { styled } from "styled-components";
import notFoundImage from "../../assets/404-Not-Found-Black-min.jpeg";

export const NotFoundContainer = styled.div`
	display: flex;
	padding: 1.25rem;
	color: white;
	font-size: 1.875rem;

	min-height: 25rem;
	background-color: transparent;
	background-image: url(${notFoundImage});
	background-repeat: no-repeat;
	background-position: top;
	background-size: cover;

	font-size: ${props => props.theme.fontSizes.medium};
	font-weight: ${props => props.theme.fontWeights.bold};
`;
