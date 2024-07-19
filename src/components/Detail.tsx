import { useParams } from "react-router-dom";

const Detail = () => {
	const { id_book } = useParams();

	return (
		<div>
			<h1>Detail</h1>
			id:{id_book}
		</div>
	);
};

export default Detail;
