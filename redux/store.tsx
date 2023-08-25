import { configureStore } from "@reduxjs/toolkit";
import podcastListReducer from "./podcastListSlice";
import detailPodcastReducer from "./detailPodcastSlice";

export const store = configureStore({
    reducer: {
        list: podcastListReducer,
        detail: detailPodcastReducer,
    }
});