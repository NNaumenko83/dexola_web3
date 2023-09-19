import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
	display: flex;
`;

export const Loader = styled.div`
	animation: ${loadingAnimation} 1s linear infinite;
`;
