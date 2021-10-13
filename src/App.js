import React from "react";
import { Home, LikedMusics, Playlist } from "./pages/index";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Player } from "./components/index";

export default function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/liked-musics" element={<LikedMusics />} />
				<Route path="/playlist" element={<Playlist />} />
			</Routes>
			<Player />
		</div>
	);
}
