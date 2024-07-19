import { useRecoilState } from "recoil";
import { updateBookAll, BookAllState } from "./BookAllState";
import { Link } from "react-router-dom";
import "../styles/list.css";

const List = () => {
	const [state, setState] = useRecoilState(BookAllState);
	updateBookAll(state, setState);
	return (
		<div className="list">
			{(() => {
				if (state.error) {
					return <div>[TODO] error</div>;
				} else if (state.data == null) {
					/* loading */
				} else {
					return state.data.sub_category_list.map((sub_category) => (
						<div className="sub_category" key={sub_category.id_category}>
							<div className="sub_category_name">
								{sub_category.name_category}
							</div>
							<div className="book_list">
								{(() =>
									sub_category.book_list.map((book) => (
										<Link to={"/book/" + book.id_book}>
											<div
												className="book"
												key={book.id_book}
												style={{ backgroundImage: `url(${book.img_url})` }}
											></div>
										</Link>
									)))()}
							</div>
						</div>
					));
				}
			})()}
		</div>
	);
};

export default List;
