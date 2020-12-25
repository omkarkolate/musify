import React, { createContext, useState, useEffect } from "react";
import { db } from "./firebase";

export const MusicContext = createContext();

export function MusicProvider(props) {
  // console.log("This is context" + props.children);
  const [musics, setMusics] = useState([]);
  const [playTrack, setPlayTrack] = useState(0);

  useEffect(() => {
    db.collection("musics").onSnapshot((snapshot) =>
      setMusics(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  // if (musics.length) {
  //   console.log(musics.length);
  // } else {
  //   console.log("Loadding...");
  // }

  return (
    <MusicContext.Provider
      value={{
        musics: musics,
        playTrack: playTrack,
        setPlayTrack: setPlayTrack
      }}
    >
      {props.children}
    </MusicContext.Provider>
  );
}
