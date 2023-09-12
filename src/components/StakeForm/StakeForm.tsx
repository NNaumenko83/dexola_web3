export const StakeForm = () => {
	onsubmit = e => {
		e.preventDefault();
		const { stake } = e.target.elements;
		console.log("stake:", stake.value);
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
		>
			<input type="text" name="stake" />
			<button type="submit">STAKE</button>
		</form>
	);
};
