import "../node_modules/destyle.css/destyle.min.css";
import "./styles/app.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import List from "./components/List";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="main">
					<div>
						<Link to="/list">[戻る]</Link>
					</div>
					<Routes>
						<Route path="/" element={<List />} />
						<Route path="/list" element={<List />} />
						<Route path="/book/:id_book" element={<Detail />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
