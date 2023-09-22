import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.svg`
	animation: ${loadingAnimation} 1s linear infinite;
`;
