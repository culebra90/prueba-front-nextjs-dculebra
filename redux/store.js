import { configureStore } from "@reduxjs/toolkit";
import podcastListReducer from "./podcastSlice";

export const store = configureStore({
    reducer: {
        list: podcastListReducer,
    }
});