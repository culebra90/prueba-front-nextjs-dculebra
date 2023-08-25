import { createSlice } from "@reduxjs/toolkit";
import { propertiesEpisodes, propetiesMedia} from "../utils/types";

const initialMedia : propetiesMedia = {
    length: "",
    type: "",
    url: "",
}

const initialStateDetailPodcast : propertiesEpisodes = {
    title: "",
    date: "",
    description: "",
    duration: "",
    id: "",
    media: initialMedia
};

export const detailPodcastSlice = createSlice({
    name: "detailPodcast",
    initialState: initialStateDetailPodcast,
    reducers: {
        addPodcast: (state, action) => {
            return action.payload;
        }
    }
});

export const { addPodcast } = detailPodcastSlice.actions;
export default detailPodcastSlice.reducer;