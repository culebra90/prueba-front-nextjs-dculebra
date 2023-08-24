import { createSlice } from "@reduxjs/toolkit";

const initialStateListPodcasts = [];

export const podcastListSlice = createSlice({
    name: "listPodcast",
    initialState: initialStateListPodcasts,
    reducers: {
        addList: (state, action) => {
            console.log("action.payload => ", action.payload)
            return action.payload;
        }
    }
});

export const { addList } = podcastListSlice.actions;
export default podcastListSlice.reducer;