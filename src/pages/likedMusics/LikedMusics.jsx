import React from "react";
import { Header, Main, Navbar } from "../../components/index";
import { useData } from "../../dataProvider/DataProvider";

export function LikedMusics() {
	const {
		state: { likedMusics }
	} = useData();

	return (
		<>
			<Header title="Liked Musics" />
			<Navbar page="likedMusics" />
			<Main musics={likedMusics} />
		</>
	);
}
