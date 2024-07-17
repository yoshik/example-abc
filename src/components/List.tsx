import { useRecoilState } from "recoil";
import { ListState } from "./ListState";
import { ApiBookAll } from "../apis/client";
import { Loaded } from "../models/NetworkState";

const List = () => {
	const [state, setState] = useRecoilState(ListState);
	(async () => {
		const data = (await ApiBookAll()).data;
		setState({
			networkState: Loaded,
			cache: data,
			expiredAt: new Date(1000 * 60),
		});
	})();
	return (
		<div>
			<h1>List</h1>
			<div>{JSON.stringify(state.cache)}</div>
		</div>
	);
};

export default List;
