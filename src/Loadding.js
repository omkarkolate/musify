import React, { useContext, useEffect } from "react";
import { MusicContext } from "./MusicContext";

export default function Loadding({ setLoadStatus }) {
  const { musics } = useContext(MusicContext);

  useEffect(() => {
    if (musics.length) {
      // console.log(musics);
      setLoadStatus(true);
    } else {
      // console.log(musics.length);
    }
  });

  return <h2 className="loadding">Loadding...</h2>;
}
