import styled, { css, keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div<{ $mobile: boolean | undefined }>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	color: ${props => props.theme.colors.infoColor};
	line-height: 1.71;

	${props =>
		props.$mobile
			? css`
					@media screen and (min-width: 744px) {
						position: absolute;
						width: 1px;
						height: 1px;
						margin: -1px;
						border: 0;
						padding: 0;

						white-space: nowrap;
						clip-path: inset(100%);
						clip: rect(0 0 0 0);
						overflow: hidden;
					}
			  `
			: css`
					@media screen and (max-width: 743px) {
						position: absolute;
						width: 1px;
						height: 1px;
						margin: -1px;
						border: 0;
						padding: 0;

						white-space: nowrap;
						clip-path: inset(100%);
						clip: rect(0 0 0 0);
						overflow: hidden;
					}
			  `}
`;

export const Loader = styled.svg`
	animation: ${loadingAnimation} 1s linear infinite;
`;
