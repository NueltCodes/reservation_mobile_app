import { createSlice } from "@reduxjs/toolkit";

export const SavedSlice = createSlice({
  name: "booking",
  initialState: {
    booking: [],
  },
  reducers: {
    savedPlaces: (state, action) => {
      const { timestamp, ...payload } = action.payload;
      const serializedTimestamp = timestamp.toDate().toISOString(); // Convert Firestore timestamp to ISO string

      state.booking.push({
        ...payload,
        timestamp: serializedTimestamp,
      });
    },
  },
});

export const { savedPlaces } = SavedSlice.actions;

export default SavedSlice.reducer;
