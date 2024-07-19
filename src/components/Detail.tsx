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

	interface button {
		id: string;
		label: string;
		imgPath: string;
	}

	const buttons: Array<button> = [
		{ id: "detail_btn_app", label: "アプリ学習", imgPath: "" },
		{ id: "detail_btn_test", label: "テスト", imgPath: "" },
		{ id: "detail_btn_voice", label: "音声(無料)", imgPath: "" },
		{ id: "detail_btn_sw", label: "SW トレ", imgPath: "" },
		{ id: "detail_btn_word", label: "単語一覧", imgPath: "" },
		{ id: "detail_btn_sheet", label: "マークシート", imgPath: "" },
		{ id: "detail_btn_record", label: "学習記録", imgPath: "" },
	];

	const book = findBookByLocationState() ?? findBookByBookAllApi();
	if (book == null) {
		return <div>[TODO] this book has gone</div>;
	}
	return (
		<div className="detail">
			<div className="detail_responsive">
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

				<div className="button_area">
					{buttons.map((button) => (
						<button className="button">
							<div className="label" key={button.id}>
								{button.label}
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Detail;
