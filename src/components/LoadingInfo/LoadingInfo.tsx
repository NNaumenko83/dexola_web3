import React, { ReactNode } from "react";
import { Loader, LoadingContainer } from "./LoadinfInfo.styled";

interface ILoadingInfoProps {
	children: ReactNode;
	mobile?: boolean | undefined;
}

export const LoadingInfo: React.FC<ILoadingInfoProps> = ({ children, mobile }) => {
	return (
		<LoadingContainer $mobile={mobile}>
			<Loader xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
				<g opacity="0.3">
					<mask id="path-1-inside-1_3230_1048" fill="white">
						<path d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16Z" />
					</mask>
					<path
						d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16Z"
						stroke="#6E758B"
						strokeWidth="6"
						mask="url(#path-1-inside-1_3230_1048)"
					/>
				</g>
				<path
					d="M16 2C16 0.895431 16.8989 -0.0128753 17.9948 0.124839C19.4105 0.302737 20.7991 0.669597 22.1229 1.21793C24.0641 2.022 25.828 3.20055 27.3137 4.68629C28.7994 6.17203 29.978 7.93586 30.7821 9.87707C31.3304 11.2009 31.6973 12.5895 31.8752 14.0052C32.0129 15.1011 31.1046 16 30 16C28.8954 16 28.017 15.0985 27.8337 14.0092C27.6839 13.1188 27.4337 12.246 27.0866 11.4078C26.4835 9.95189 25.5996 8.62902 24.4853 7.51472C23.371 6.40042 22.0481 5.5165 20.5922 4.91345C19.754 4.56627 18.8812 4.31608 17.9908 4.16628C16.9015 3.98304 16 3.10457 16 2Z"
					fill="#20FE51"
				/>
			</Loader>
			{children}
		</LoadingContainer>
	);
};
