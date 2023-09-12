import React from "react";
import { toBigInt } from "web3-utils";
import { useWeb3 } from "../../hooks/useWeb3";
import { useAccount } from "wagmi";

export const StakeForm = () => {
	const { address } = useAccount();
	console.log("address:", address);
	// Треба використати метод approve
	// approve(address spender, uint256 allowance) - стандарт ERC20, дозвіл на зняття
	// 0x2f112ed8a96327747565f4d4b4615be8fb89459d;
	// токенів з контракту, перший аргумент адреса кому дозволяємо, в нашому випадку
	// контракт стейкінгу, allowance сума на яку даємо дозвіл

	const { contractStaking, contractStarRunnerToken } = useWeb3();
	console.log("contractStaking:", contractStaking);
	console.log("contractStarRunnerToken:", contractStarRunnerToken);

	const stakeToken = async (numberStake: bigint) => {
		try {
			await contractStarRunnerToken.methods
				.approve("0x2f112ed8a96327747565f4d4b4615be8fb89459d", numberStake)
				.send({ from: address });
			console.log("before contractStaking");
			await contractStaking.methods.stake(numberStake).send({ from: address });
		} catch (error) {
			console.error(error);
		}
	};

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		const { stake } = e.target.elements;

		const myNumber = toBigInt(stake.value);
		console.log("myNumber:", myNumber);

		stakeToken(myNumber);
	};
	return (
		<form
			style={{
				display: "flex",
				flexDirection: "column",
				width: "350px",
				gap: "25px",
				marginTop: "25px",
				padding: "20px",
				border: "1px solid red",
			}}
			onSubmit={onSubmitHandler}
		>
			<input type="text" name="stake" />
			<button type="submit">STAKE</button>
		</form>
	);
};
