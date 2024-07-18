import "../node_modules/destyle.css/destyle.min.css";
import "./styles/app.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React from "react";
import List from "./components/List";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<div>
					<Link to="/list">List</Link>
				</div>
				<div>
					<Link to="/detail">Detail</Link>
				</div>
				<div className="main">
					<Routes>
						<Route path="/" element={<List />} />
						<Route path="/list" element={<List />} />
						<Route path="/detail" element={<Detail />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
