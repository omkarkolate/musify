import React from "react";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicOutlinedIcon from "@material-ui/icons/LibraryMusic";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <MusicNoteIcon />
        <h2>Musify</h2>
      </div>
      <div className="menu">
        <ul>
          <li className="home">
            <HomeIcon />
            <span className="text">Home</span>
          </li>
          <li>
            <SearchIcon />
            <span className="text">Search</span>
          </li>
          <li>
            <LibraryMusicOutlinedIcon />
            <span className="text">Your Library</span>
          </li>
          <li className="avatar">
            <Avatar />
          </li>
        </ul>
      </div>
      <div className="playlists">
        <ul>
          <li className="text-playlists">PLAYLISTS</li>
          <li>
            <span className="add icon-bg">
              <AddIcon />
            </span>
            <span className="text">Create Playlist</span>
          </li>
          <li>
            <span className="fav icon-bg">
              <FavoriteIcon />
            </span>
            <span className="text">Liked Songs</span>
          </li>
          <hr />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
