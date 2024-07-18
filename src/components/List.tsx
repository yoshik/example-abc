import { useRecoilState } from "recoil";
import { updateBookAll, BookAllState } from "./BookAllState";

const List = () => {
	const [state, setState] = useRecoilState(BookAllState);
	updateBookAll(state, setState);
	return (
		<div>
			<h1>List</h1>
			<div>{JSON.stringify(state.data)}</div>
		</div>
	);
};

export default List;
