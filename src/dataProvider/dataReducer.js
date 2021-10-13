export function dataReducer(state, { type, payload }) {
	switch (type) {
		case "ADD_MUSICS":
			return { ...state, musics: payload };

		case "ADD_TO_LIKED_MUSICS":
			return { ...state, likedMusics: [...state.likedMusics, payload] };

		case "REMOVE_FROM_LIKED_MUSICS":
			return {
				...state,
				likedMusics: state.likedMusics.filter(
					(music) => music.id !== payload
				)
			};

		case "ADD_TO_PLAYLIST":
			return { ...state, playlist: [...state.playlist, payload] };

		case "REMOVE_FROM_PLAYLIST":
			return {
				...state,
				playlist: state.playlist.filter(
					(music) => music.id !== payload
				)
			};

		case "SET_PLAY_TRACK":
			return { ...state, playTrack: payload };

		default:
			break;
	}
}
