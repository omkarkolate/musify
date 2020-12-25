import React, { useContext } from "react";
import { MusicContext } from "../../MusicContext";

export default function Track(props) {
  const { setPlayTrack } = useContext(MusicContext);

  return (
    <li
      className="track-li"
      onClick={() => {
        setPlayTrack(props.id);
      }}
    >
      <div className="track-details">
        <div className="srn-title">
          <div className="srn">{props.id + 1}</div>
          <div className="title-artist">
            <div className="title">{props.trackTitle}</div>
            <div className="artists">Benjamin Tissot </div>
          </div>
        </div>
      </div>
      <div className="duration">{props.trackDuration}</div>
    </li>
  );
}
