import React, { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./dataReducer";

export const DataContext = createContext();

export function useData() {
	return useContext(DataContext);
}

export function DataProvider({ children }) {
	const [state, dispatch] = useReducer(dataReducer, {
		musics: [],
		likedMusics: [],
		playlist: [],
		playTrack: {}
	});

	return (
		<DataContext.Provider value={{ state, dispatch }}>
			{children}
		</DataContext.Provider>
	);
}
