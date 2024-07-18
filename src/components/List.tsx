import { useRecoilState } from "recoil";
import { fetchBookAll, BookAllState } from "./BookAllState";

const List = () => {
	const [state, setState] = useRecoilState(BookAllState);
	(async (state) => {
		const fetchData = await fetchBookAll(state);
		if (fetchData) setState(fetchData);
	})(state);
	return (
		<div>
			<h1>List</h1>
			<div>{JSON.stringify(state.cache)}</div>
		</div>
	);
};

export default List;
