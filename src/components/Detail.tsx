import { useParams, useLocation } from "react-router-dom";
import { Book, ResponseBookAll, TopCategory } from "../apis/client";
import { useRecoilState } from "recoil";
import { updateBookAll, BookAllState } from "./BookAllState";

const Detail = () => {
	function findBookByLocationState(): Book | null {
		const { state } = useLocation();
		const book: Book | null = state?.book;
		return book;
	}
	function findBookInTopCategory(
		id_book: string,
		topCategory: TopCategory,
	): Book | null {
		const target = topCategory.sub_category_list
			.map((i) => i.book_list)
			.flat()
			.filter((i) => i.id_book === id_book);
		return target.length > 0 ? target[0] : null;
	}
	function findBookByBookAllApi(): Book | null {
		const { id_book } = useParams();
		const [state, setState] = useRecoilState(BookAllState);
		updateBookAll(state, setState);
		const book = (() => {
			if (state.data) {
				return findBookInTopCategory(id_book, state.data);
			}
			return null;
		})();
		return book;
	}

	return (
		<div>
			<h1>Detail</h1>
			<p>locationState: {findBookByLocationState()?.author ?? "mishit"}</p>
			<p>BookAllApi: {findBookByBookAllApi()?.author ?? "mishit"}</p>
		</div>
	);
};

export default Detail;
