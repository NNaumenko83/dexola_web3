import { styled } from "styled-components";

export const PageTitleWrapperStyled = styled.div`
	padding-bottom: 8px;
	border-bottom: 1px solid #2f2f2f;
	margin-bottom: 24px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	@media screen and (max-width: ${props => props.theme.breakpoints.maxMobile}) {
		margin-top: 29px;
	}
`;
