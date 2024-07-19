import "../styles/detail.css";
import "../styles/icons.css";
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
		darkImg: string;
		lightImg: string;
	}

	const buttons: Array<button> = [
		{
			id: "detail_btn_quiz",
			label: "アプリ学習",
			darkImg: "dark_icon_study_quiz",
			lightImg: "light_icon_study_quiz",
		},
		{
			id: "detail_btn_test",
			label: "テスト",
			darkImg: "dark_icon_study_test",
			lightImg: "light_icon_study_test",
		},
		{
			id: "detail_btn_sound",
			label: "音声(無料)",
			darkImg: "dark_icon_study_sound",
			lightImg: "light_icon_study_sound",
		},
		{
			id: "detail_btn_sw",
			label: "SW トレ",
			darkImg: "dark_icon_study_sw",
			lightImg: "light_icon_study_sw",
		},
		{
			id: "detail_btn_vocab",
			label: "単語一覧",
			darkImg: "dark_icon_study_vocab",
			lightImg: "light_icon_study_vocab",
		},
		{
			id: "detail_btn_marksheet",
			label: "マークシート",
			darkImg: "dark_icon_study_marksheet",
			lightImg: "light_icon_study_marksheet",
		},
		{
			id: "detail_btn_record",
			label: "学習記録",
			darkImg: "dark_icon_study_record",
			lightImg: "light_icon_study_record",
		},
	];

	const isDark = () => {
		const html = document.querySelector("html");
		const style = getComputedStyle(html);
		const css = style.getPropertyValue("--isDarkmode");
		return css === "ture";
	};

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
							<button className="button">Mybookに追加</button>
							<button className="button">読み放題中</button>
						</div>
					</div>
				</div>

				<div className="button_area">
					{buttons.map((button) => (
						<button className="square-button" key={button.id}>
							<img className={isDark ? button.darkImg : button.lightImg} />
							<div className="label">{button.label}</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Detail;
