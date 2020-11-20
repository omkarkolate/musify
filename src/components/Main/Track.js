import React from "react";

export default function Track(props) {
  function selectTrack() {
    props.getTrack(props.id);
  }

  return (
    <li className="track-li" onClick={selectTrack}>
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
