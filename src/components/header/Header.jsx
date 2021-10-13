import React from "react";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import "./header.css";

export function Header({ title }) {
	return (
		<header className="app-header">
			<div className="header-container">
				<div className="mobile-view">
					<MusicNoteIcon />
					<h2>Musify</h2>
				</div>
				<div className="header-left">
					<h1>{title}</h1>
				</div>
			</div>
		</header>
	);
}
