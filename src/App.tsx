import "../node_modules/destyle.css/destyle.min.css";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React from "react";
import List from "./components/List";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";
import { ApiBookAll } from "./apis/client";
function App() {
	(async () => {
		const it = await ApiBookAll();
		console.log(it.data);
	})();
	return (
		<BrowserRouter>
			<div className="App">
				<div>
					<Link to="/list">List</Link>
				</div>
				<div>
					<Link to="/detail">Detail</Link>
				</div>
				<Routes>
					<Route path="/" element={<List />} />
					<Route path="/list" element={<List />} />
					<Route path="/detail" element={<Detail />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
