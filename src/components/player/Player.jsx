import React, { useState, useRef } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import Slider from "@material-ui/core/Slider";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import { useData } from "../../dataProvider/DataProvider";
import "./player.css";

function getMinSec(inputTime) {
	let minutes = Math.floor(inputTime / 60);
	let seconds = Math.floor(inputTime - 60 * minutes);
	seconds = seconds < 10 ? `0${seconds}` : seconds;
	let time = `${minutes}:${seconds}`;
	return time;
}

export function Player() {
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [isPlay, setIsPlay] = useState(false);
	const [volumeValue, setVolumeValue] = useState(0.5);
	const [trackValue, setTrackValue] = useState(0);
	const [trackDuration, setTrackDuration] = useState("0.00");
	const [isMute, setIsMute] = useState(false);
	const [prevVolume, setPrevVolume] = useState(0.5);
	const [isShow, setIsShow] = useState(false);
	const audioEl = useRef(null);

	const {
		state: { musics, playTrack, likedMusics, playlist },
		dispatch
	} = useData();

	const inLikedMusics = likedMusics.find(
		(music) => music.id === playTrack.id
	);

	const inPlaylist = playlist.find((music) => music.id === playTrack.id);

	const musicIndex = musics.findIndex((music) => music.id === playTrack.id);

	function handleAutoplay() {
		if (isFirstLoad) {
			setIsFirstLoad(false);
		} else {
			setIsPlay(true);
			audioEl.current.play();
		}
	}

	function setDuration() {
		setTrackDuration(audioEl.current.duration);
	}

	function handlePlayPause() {
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
		setIsPlay(false);
		audioEl.current.pause();
		playNextTrack();
	}

	function setVolume(event, newValue) {
		if (isMute) {
			setIsMute(false);
		}
		setVolumeValue(newValue);
		audioEl.current.volume = newValue;
	}

	function handleMuteUnmute() {
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

	async function handleLike() {
		if (!inLikedMusics) {
			await dispatch({
				type: "ADD_TO_LIKED_MUSICS",
				payload: playTrack
			});
		} else {
			await dispatch({
				type: "REMOVE_FROM_LIKED_MUSICS",
				payload: playTrack.id
			});
		}
	}

	async function handlePlaylist() {
		if (!inPlaylist) {
			await dispatch({
				type: "ADD_TO_PLAYLIST",
				payload: playTrack
			});
		} else {
			await dispatch({
				type: "REMOVE_FROM_PLAYLIST",
				payload: playTrack.id
			});
		}
	}

	function handleShowHideMobilePlayer() {
		if (isShow) {
			setIsShow(false);
		} else {
			setIsShow(true);
		}
	}

	async function playNextTrack() {
		if (musicIndex < musics.length - 1) {
			await dispatch({
				type: "SET_PLAY_TRACK",
				payload: musics[musicIndex + 1]
			});
		}
	}

	async function playPreviousTrack() {
		if (musicIndex > 0) {
			await dispatch({
				type: "SET_PLAY_TRACK",
				payload: musics[musicIndex - 1]
			});
		}
	}

	/* MiniPlayer */
	const miniPlayer = (
		<div className="miniplayer">
			<div
				className="mini-track-thumbnail"
				onClick={handleShowHideMobilePlayer}
			>
				<img src={playTrack.thumbnail} alt="Track Thumbnail" />
			</div>
			<div
				className="mini-track-title"
				onClick={handleShowHideMobilePlayer}
			>
				{playTrack.title}
			</div>
			<div className="mini-play-pause-btn">
				<button onClick={handlePlayPause}>
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
					<button onClick={handleShowHideMobilePlayer}>
						<KeyboardArrowDownIcon />
					</button>
				</div>
				<div className="mobile-player-track-thumbnail">
					<img src={playTrack.thumbnail} alt="Track Thumbnail" />
				</div>
				<div className="mobile-player-track-title">
					<h4>{playTrack.title}</h4>
				</div>
				<div className="mobile-player-track-artist">
					<h5>Benjamin Tissot</h5>
				</div>
				<div className="mobile-player-track-slider">
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
					<button className="fav-btn" onClick={handleLike}>
						{inLikedMusics ? (
							<FavoriteIcon className="like" />
						) : (
							<FavoriteBorderIcon />
						)}
					</button>
					<button onClick={playPreviousTrack}>
						<SkipPreviousIcon />
					</button>
					<button
						className="play-pause-btn"
						onClick={handlePlayPause}
					>
						{isPlay ? (
							<PauseCircleFilledIcon />
						) : (
							<PlayCircleFilledWhiteIcon />
						)}
					</button>
					<button onClick={playNextTrack}>
						<SkipNextIcon />
					</button>
				</div>
				<div className="upgrade">
					<button onClick={handlePlaylist}>
						{inPlaylist
							? "Remove from playlist"
							: "Add to playlist"}
					</button>
				</div>
			</div>
		</div>
	);

	return (
		<div className="app-player">
			{/* Desktop player view */}
			<div className="player-container">
				<div className="player-left">
					<div className="playing-track-thumbnail">
						<img src={playTrack.thumbnail} alt="Track Thumbnail" />
					</div>
					<div className="track-info">
						<span className="track-name">{playTrack.title}</span>
						<br />
						<span className="artists">Benjamin Tissot </span>
					</div>
					<button className="fav-btn" onClick={handleLike}>
						{inLikedMusics ? (
							<FavoriteIcon className="like" />
						) : (
							<FavoriteBorderIcon />
						)}
					</button>
				</div>
				<div className="player-center">
					<div className="player-controls">
						<button onClick={playPreviousTrack}>
							<SkipPreviousIcon />
						</button>
						<button
							className="play-pause-btn"
							onClick={handlePlayPause}
						>
							{isPlay ? (
								<PauseCircleOutlineIcon />
							) : (
								<PlayCircleOutlineIcon />
							)}
						</button>
						<button onClick={playNextTrack}>
							<SkipNextIcon />
						</button>
					</div>
					<div className="player-slider">
						<div className="time">{getMinSec(trackValue)}</div>
						<audio
							src={playTrack.link}
							preload="metadata"
							ref={audioEl}
							onLoadedMetadata={setDuration}
							onTimeUpdate={setSlider}
							onEnded={handleTrackEnd}
							onCanPlay={handleAutoplay}
							onPause={() => {
								setIsPlay(false);
							}}
							onPlay={() => {
								setIsPlay(true);
							}}
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
					<div className="upgrade">
						<button onClick={handlePlaylist}>
							{inPlaylist
								? "Remove from playlist"
								: "Add to playlist"}
						</button>
					</div>
					<button onClick={handleMuteUnmute}>
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
		</div>
	);
}

export default Player;
