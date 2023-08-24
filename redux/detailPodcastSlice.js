import { createSlice } from "@reduxjs/toolkit";

const initialStateDetailPodcast = {};

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