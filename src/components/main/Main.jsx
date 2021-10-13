import React from "react";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { Track } from "../track/Track";
import "./main.css";

export function Main({ musics }) {
	return (
		<main className="app-main">
			<div className="main-container">
				<div className="main-header">
					<div className="srn-title">
						<div className="srn">#</div>
						<div className="title-artist">TITLE</div>
					</div>
					<div className="duration">
						<ScheduleIcon />
					</div>
				</div>
				<div className="main-list-container">
					<ul>
						{musics.map((track, index) => {
							return (
								<Track
									key={track.id}
									id={track.id}
									index={index}
									trackTitle={track.title}
									trackDuration={track.duration}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		</main>
	);
}
