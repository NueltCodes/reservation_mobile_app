import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import SavedReducer from "./SavedReducer";

const middleware = getDefaultMiddleware({
  serializableCheck: false, // Disable serializable value check
});

const store = configureStore({
  reducer: {
    booking: SavedReducer,
  },
  middleware: middleware,
});

export default store;
