import React, { useEffect, useState } from "react";
import { useData } from "../../dataProvider/DataProvider";

export function Track({ id, trackTitle, trackDuration, index }) {
	const {
		state: { musics, playTrack },
		dispatch
	} = useData();

	const [trackClass, setTrackClass] = useState("");

	useEffect(() => {
		if (playTrack.id === id) {
			setTrackClass("track-li active");
		} else {
			setTrackClass("track-li");
		}
	}, [playTrack, id]);

	async function setPlayTrack() {
		await dispatch({
			type: "SET_PLAY_TRACK",
			payload: musics.find((music) => music.id === id)
		});
	}

	return (
		<li className={trackClass} onClick={setPlayTrack}>
			<div className="track-details">
				<div className="srn-title">
					<div className="srn">{index + 1}</div>
					<div className="title-artist">
						<div className="title">{trackTitle}</div>
						<div className="artists">Benjamin Tissot </div>
					</div>
				</div>
			</div>
			<div className="duration">{trackDuration}</div>
		</li>
	);
}
