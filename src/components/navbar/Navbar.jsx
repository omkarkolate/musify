import React from "react";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import HomeIcon from "@material-ui/icons/Home";
import LibraryMusicOutlinedIcon from "@material-ui/icons/LibraryMusic";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./navbar.css";
import { Link } from "react-router-dom";

export function Navbar({ page }) {
	return (
		<aside className="app-nav">
			<nav>
				<div className="logo">
					<MusicNoteIcon />
					<h2>Musify</h2>
				</div>
				<div className="menu">
					<ul>
						<Link to="/">
							<li className={page === "home" ? "open-page" : ""}>
								<HomeIcon />
								<span className="text">Home</span>
							</li>
						</Link>
						<Link to="/playlist">
							<li
								className={
									page === "playlist" ? "open-page" : ""
								}
							>
								<LibraryMusicOutlinedIcon />
								<span className="text">Playlist</span>
							</li>
						</Link>
						<Link to="/liked-musics">
							<li
								className={
									page === "likedMusics" ? "open-page" : ""
								}
							>
								<span className="fav icon-bg">
									<FavoriteIcon />
								</span>
								<span className="text">Liked Songs</span>
							</li>
						</Link>
					</ul>
				</div>
			</nav>
		</aside>
	);
}
