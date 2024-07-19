import "../styles/detail.css";
import { useParams, useLocation } from "react-router-dom";
import { Book, TopCategory } from "../apis/client";
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

	const book = findBookByLocationState() ?? findBookByBookAllApi();
	if (book == null) {
		return <div>[TODO] this book has gone</div>;
	}
	return (
		<div className="detail">
			<div className="book_area">
				<div
					className="book"
					key={book.id_book}
					style={{ backgroundImage: `url(${book.img_url})` }}
				></div>
				<div className="book_description_area">
					<div className="line name">{book.name_book}</div>
					<div className="line tagline">
						<div className="left">
							<div className="tag">著者</div>
						</div>
						<div className="right">{book.author}</div>
					</div>
					<div className="line tagline">
						<div className="left">
							<div className="tag">出版社</div>
						</div>
						<div className="right">{book.publisher}</div>
					</div>
					<div className="line">
						<button>Mybookに追加</button>
						<button>読み放題中</button>
					</div>
				</div>
			</div>

			<div className="button_area"></div>
		</div>
	);
};

export default Detail;
