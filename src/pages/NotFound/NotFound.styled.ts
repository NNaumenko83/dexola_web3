import { styled } from "styled-components";
import notFoundImage from "../../assets/10-error-404-page-examples-for-UX-design_min.jpg";

export const NotFoundContainer = styled.div`
	display: flex;
	padding: 1.25rem;
	color: black;
	font-size: 1.875rem;

	min-height: 27.625rem;
	background-color: black;
	background-image: url(${notFoundImage});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;

	font-size: ${props => props.theme.fontSizes.medium};
	font-weight: ${props => props.theme.fontWeights.bold};
`;
