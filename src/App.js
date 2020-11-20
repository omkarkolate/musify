import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Player from "./components/Player/Player";
import "./styles.css";

export default function App() {
  const [musics, setMusics] = useState([]);
  const [playTrack, setPlayTrack] = useState(0);

  useEffect(() => {
    db.collection("musics").onSnapshot((snapshot) =>
      setMusics(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  function selectedTrack(TrackId) {
    setPlayTrack(TrackId);
  }

  if (musics.length) {
    return (
      <div className="App">
        <header className="app-header">
          <Header />
        </header>
        <aside className="app-nav">
          <Navbar />
        </aside>
        <main className="app-main">
          <Main musics={musics} getPlayTrack={selectedTrack} />
        </main>
        <footer className="app-player">
          <Player
            musics={musics}
            currentPlay={playTrack}
            changeTrack={selectedTrack}
          />
        </footer>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h2 className="loadding">Loadding...</h2>
      </div>
    );
  }
}
