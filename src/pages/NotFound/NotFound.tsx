import { Container } from "../../components/Container/Container";
import { NotFoundContainer } from "./NotFound.styled";

const NotFound = () => {
	return (
		<NotFoundContainer>
			<Container>
				<p>Page not found</p>
			</Container>
		</NotFoundContainer>
	);
};

export default NotFound;
