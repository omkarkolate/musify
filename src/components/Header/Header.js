import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Avatar from "@material-ui/core/Avatar";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <div className="mobile-view">
        <MusicNoteIcon />
        <h2>Musify</h2>
      </div>
      <div className="header-left">
        <button className="back-button">
          <ArrowBackIosIcon />
        </button>
        <button className="forword-button">
          <ArrowForwardIosIcon />
        </button>
      </div>
      <div className="header-right">
        <div className="upgrade">
          <button>UPGRADE</button>
        </div>
        <div className="login-user">
          <Avatar />
          <h3>User</h3>
          <div className="drop-down-arrow">
            <ArrowDropDownIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
