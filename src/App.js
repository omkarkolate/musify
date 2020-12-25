import React, { useState } from "react";
import { MusicProvider } from "./MusicContext";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Player from "./components/Player/Player";
import Loadding from "./Loadding";
import "./styles.css";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  function getLoadStatus(status) {
    if (status) {
      setIsLoaded(true);
    }
  }

  if (isLoaded) {
    return (
      <div className="App">
        <header className="app-header">
          <Header />
        </header>
        <aside className="app-nav">
          <Navbar />
        </aside>
        <MusicProvider>
          <main className="app-main">
            <Main />
          </main>
          <footer className="app-player">
            <Player />
          </footer>
        </MusicProvider>
      </div>
    );
  } else {
    return (
      <MusicProvider>
        <Loadding setLoadStatus={getLoadStatus} />
      </MusicProvider>
    );
  }
}
