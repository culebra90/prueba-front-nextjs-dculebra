import { createSlice } from "@reduxjs/toolkit";
import { Podcast, propertiesImage} from "../utils/types";

const initialStateListPodcasts : Podcast[] = [];

export const podcastListSlice = createSlice({
    name: "listPodcast",
    initialState: initialStateListPodcasts,
    reducers: {
        addList: (state, action) => {
            return action.payload;
        }
    }
});

export const { addList } = podcastListSlice.actions;
export default podcastListSlice.reducer;