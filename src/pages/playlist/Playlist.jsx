import React from "react";
import { Header, Main, Navbar } from "../../components/index";
import { useData } from "../../dataProvider/DataProvider";

export function Playlist() {
	const {
		state: { playlist }
	} = useData();

	return (
		<>
			<Header title="Playlist" />
			<Navbar page="playlist" />
			<Main musics={playlist} />
		</>
	);
}
