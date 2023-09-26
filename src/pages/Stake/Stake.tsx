import { useAccount } from "wagmi";

import { Container } from "../../components/Container/Container";
import { NotConnectedWrapper } from "../../components/NotConnectedWrapper/NotConnectedWrapper";
import { PageTitleWrapper } from "../../components/PageTitleWrapper/PageTitleWrapper";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { useWeb3 } from "../../hooks/useWeb3";

import { StakedForm } from "../../components/StakedForm/StakedForm";
import { RewardQtyText, RewardRateText, StruWeekText } from "./Stake.styled";
import { useRef, useEffect, useCallback } from "react";

const Stake = () => {
	const { isConnected } = useAccount();
	const { rewardRate, getRewardRate, numberOfStakeSrtu } = useWeb3();

	// Змінна для відстеження інтервалу оновлення reward rate
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Функція для відстеження інтервалу
	const startGetRewardRateInterval = useCallback(() => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
		}

		if (numberOfStakeSrtu !== null) {
			// Запускаємо getRewardRate кожні 3 секунди
			intervalRef.current = setInterval(() => {
				getRewardRate(Number(numberOfStakeSrtu));
			}, 3000);
		}
	}, [getRewardRate, numberOfStakeSrtu]);

	useEffect(() => {
		getRewardRate(Number(numberOfStakeSrtu));
		startGetRewardRateInterval();
	}, [numberOfStakeSrtu, startGetRewardRateInterval, getRewardRate]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return (
		<Container>
			<PageWrapper>
				{!isConnected ? (
					<NotConnectedWrapper />
				) : (
					<>
						<PageTitleWrapper>
							<PageTitle>Stake</PageTitle>
							<RewardRateText>
								<span>Reward rate:</span>
								<RewardQtyText>{rewardRate}</RewardQtyText>
								<StruWeekText>STRU/week</StruWeekText>
							</RewardRateText>
						</PageTitleWrapper>
						<StakedForm />
					</>
				)}
			</PageWrapper>
		</Container>
	);
};

export default Stake;
