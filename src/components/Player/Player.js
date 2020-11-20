import React, { useState, useRef } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import Slider from "@material-ui/core/Slider";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import "./Player.css";

function getMinSec(inputTime) {
  let minutes = Math.floor(inputTime / 60);
  let seconds = Math.floor(inputTime - 60 * minutes);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  let time = `${minutes}:${seconds}`;
  return time;
}

function Player({ musics, currentPlay, changeTrack }) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [volumeValue, setVolumeValue] = useState(0.5);
  const [trackValue, setTrackValue] = useState(0);
  const [trackDuration, setTrackDuration] = useState("0.00");
  const [isMute, setIsMute] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.5);
  const [isLike, setIsLike] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const audioEl = useRef(null);

  if (currentPlay !== currentTrack) {
    if (isPlay) {
      // console.log("Pause ||");
      setIsPlay(false);
      audioEl.current.pause();
      setIsDisable(true);
      // console.log("Disable");
      setCurrentTrack(currentPlay);
      // console.log(currentPlay);
    } else {
      setIsDisable(true);
      setCurrentTrack(currentPlay);
    }
  }

  function setPlay() {
    // console.log("play it...", audioEl.current.duration);
    setTrackDuration(audioEl.current.duration);
    if (isDisable) {
      setIsDisable(false);
      // console.log("Enable");
      // console.log("Play >");
      setIsPlay(true);
      audioEl.current.play();
    }
  }

  function playPause() {
    if (isPlay) {
      setIsPlay(false);
      audioEl.current.pause();
    } else {
      setIsPlay(true);
      audioEl.current.play();
    }
  }

  function setSlider() {
    setTrackValue(audioEl.current.currentTime);
  }

  function setTrack() {
    audioEl.current.currentTime = trackValue;
  }

  function setCurrentTime(event, newValue) {
    setTrackValue(newValue);
  }

  function handleTrackEnd() {
    // console.log("Pause ||");
    setIsPlay(false);
    audioEl.current.pause();
    playNext();
  }

  function setVolume(event, newValue) {
    if (isMute) {
      setIsMute(false);
    }
    setVolumeValue(newValue);
    audioEl.current.volume = newValue;
  }

  function muteUnmute() {
    if (isMute) {
      setVolumeValue(prevVolume);
      audioEl.current.volume = prevVolume;
      setIsMute(false);
    } else {
      setPrevVolume(volumeValue);
      setVolumeValue(0);
      audioEl.current.volume = 0;
      setIsMute(true);
    }
  }

  function handleLike() {
    if (isLike) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  }

  function handleShowHide() {
    if (isShow) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }

  function playNext() {
    if (currentTrack < musics.length - 1) {
      // console.log("inside play next", currentTrack);
      changeTrack(currentTrack + 1);
    }
  }

  function playPrevious() {
    if (currentTrack > 0) {
      changeTrack(currentTrack - 1);
    }
  }

  /* MiniPlayer */
  const miniPlayer = (
    <div className="miniplayer">
      <div className="mini-track-thumbnail" onClick={handleShowHide}>
        <img
          src="https://i.insider.com/5d113b41e3ecba51db1aef36?width=500&format=jpeg&auto=webp"
          alt="Track Thumbnail"
        />
      </div>
      <div className="mini-track-title" onClick={handleShowHide}>
        {musics[currentTrack] ? musics[currentTrack].title : "Track Title"}
      </div>
      <div className="mini-play-pause-btn">
        <button onClick={playPause} disabled={isDisable ? true : ""}>
          {isPlay ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
      </div>
    </div>
  );

  //Mobile Player
  const mobilePLayer = (
    <div className={isShow ? "show" : "hide"}>
      <div className="mobile-player">
        <div className="mobile-player-header">
          <button onClick={handleShowHide}>
            <KeyboardArrowDownIcon />
          </button>
        </div>
        <div className="mobile-player-track-thumbnail">
          <img
            src="https://i.insider.com/5d113b41e3ecba51db1aef36?width=500&format=jpeg&auto=webp"
            alt="Track Thumbnail"
          />
        </div>
        <div className="mobile-player-track-title">
          <h4>
            {musics[currentTrack] ? musics[currentTrack].title : "Track Title"}
          </h4>
        </div>
        <div className="mobile-player-track-artist">
          <h5>Benjamin Tissot</h5>
        </div>
        <div className="mobile-player-track-slidet">
          <Slider
            value={trackValue}
            min={0.0}
            max={Number(trackDuration)}
            step={0.01}
            onChange={setCurrentTime}
            onChangeCommitted={setTrack}
          />
        </div>
        <div className="mobile-player-track-time">
          <div className="mobile-player-track-current-time">
            {getMinSec(trackValue)}
          </div>
          <div className="mobile-player-track-duration">
            {getMinSec(trackDuration)}
          </div>
        </div>
        <div className="mobile-player-controls">
          <button onClick={playPrevious}>
            <SkipPreviousIcon />
          </button>
          <button
            className="play-pause-btn"
            onClick={playPause}
            disabled={isDisable ? true : ""}
          >
            {isPlay ? <PauseCircleFilledIcon /> : <PlayCircleFilledWhiteIcon />}
          </button>
          <button onClick={playNext}>
            <SkipNextIcon />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="player-container">
        <div className="player-left">
          <div className="playing-track-thumbnail">
            <img
              src="https://i.insider.com/5d113b41e3ecba51db1aef36?width=500&format=jpeg&auto=webp"
              alt="Track Thumbnail"
            />
          </div>
          <div className="track-info">
            <span className="track-name">
              {musics[currentTrack]
                ? musics[currentTrack].title
                : "Track Title"}
            </span>
            <br />
            <span className="artists">Benjamin Tissot </span>
          </div>
          <button className="fav-btn" onClick={handleLike}>
            {isLike ? (
              <FavoriteIcon className="like" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
        </div>
        <div className="player-center">
          <div className="player-controls">
            <button>
              <ShuffleIcon />
            </button>
            <button onClick={playPrevious}>
              <SkipPreviousIcon />
            </button>
            <button
              className="play-pause-btn"
              onClick={playPause}
              disabled={isDisable ? true : ""}
            >
              {isPlay ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
            </button>
            <button onClick={playNext}>
              <SkipNextIcon />
            </button>
            <button>
              <RepeatIcon />
            </button>
          </div>
          <div className="player-slider">
            <div className="time">{getMinSec(trackValue)}</div>
            <audio
              src={musics[currentTrack] ? musics[currentTrack].link : ""}
              ref={audioEl}
              onCanPlayThrough={setPlay}
              onTimeUpdate={setSlider}
              onEnded={handleTrackEnd}
            />
            <Slider
              value={trackValue}
              min={0.0}
              max={Number(trackDuration)}
              step={0.01}
              onChange={setCurrentTime}
              onChangeCommitted={setTrack}
            />
            <div className="time">{getMinSec(trackDuration)}</div>
          </div>
        </div>
        <div className="player-right">
          <button>
            <QueueMusicIcon />
          </button>
          <button onClick={muteUnmute}>
            {isMute ? (
              <VolumeOffIcon />
            ) : volumeValue > 0 ? (
              volumeValue <= 0.5 ? (
                <VolumeDownIcon />
              ) : (
                <VolumeUpIcon />
              )
            ) : (
              <VolumeMuteIcon />
            )}
          </button>
          <Slider
            value={volumeValue}
            min={0.0}
            max={1.0}
            step={0.01}
            onChange={setVolume}
          />
        </div>
      </div>
      {miniPlayer}
      {mobilePLayer}
    </>
  );
}

export default Player;

//https://bit.ly/3oY0fwk
