import React, { useState, useEffect } from "react";
import { Header, Main, Navbar } from "../../components/index";
import { db } from "../../firebase";
import { useData } from "../../dataProvider/DataProvider";

export function Home() {
	const {
		state: { musics },
		dispatch
	} = useData();
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!musics.length) {
			(async function () {
				try {
					const snapshot = await db.collection("musics").get();
					const docs = snapshot.docs;
					const musics = docs.map((doc) => {
						const id = doc.id;
						const data = doc.data();
						return { id, ...data };
					});
					await dispatch({
						type: "ADD_MUSICS",
						payload: musics
					});

					await dispatch({
						type: "SET_PLAY_TRACK",
						payload: musics[0]
					});
					setIsLoaded(true);
				} catch (error) {
					console.error(error);
					setError(error);
				}
			})();
		} else {
			setIsLoaded(true);
		}
	}, [dispatch, musics.length]);

	if (error) {
		return <h2 className="error">Error: Something Went wrong...</h2>;
	} else if (!isLoaded) {
		return <h2 className="loading">Loading...</h2>;
	} else {
		return (
			<>
				<Header title="Home" />
				<Navbar page="home" />
				<Main musics={musics} />
			</>
		);
	}
}
