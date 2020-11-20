import React from "react";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Track from "./Track";
import "./Main.css";

function Main({ musics, getPlayTrack }) {
  // console.log(musics.length ? musics[0] : "empty");

  function selectedTrack(TrackId) {
    getPlayTrack(TrackId);
  }

  return (
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
                key={index}
                id={index}
                trackTitle={track.title}
                trackDuration={track.duration}
                getTrack={selectedTrack}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Main;
