import { useRecoilState } from "recoil";
import { updateBookAll, BookAllState } from "./BookAllState";
import { Link } from "react-router-dom";
import "../styles/list.css";
import { Busy } from "./Errors";

const List = () => {
	const [state, setState] = useRecoilState(BookAllState);
	updateBookAll(state, setState);
	return (
		<main className="list">
			{(() => {
				if (state.error) {
					return Busy();
				} else if (state.data == null) {
					/* loading */
				} else {
					return state.data.sub_category_list.map((sub_category) => (
						<section className="sub_category" key={sub_category.id_category}>
							<h1 className="sub_category_name">
								{sub_category.name_category}
							</h1>
							<section className="book_list">
								{(() =>
									sub_category.book_list.map((book) => (
										<Link to={"/book/" + book.id_book} state={{ book: book }}>
											<figure
												className="book"
												key={book.id_book}
												style={{ backgroundImage: `url(${book.img_url})` }}
											></figure>
										</Link>
									)))()}
							</section>
						</section>
					));
				}
			})()}
		</main>
	);
};

export default List;
