import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preferedClasses: "",
  searchTerm: "",
};

const tutorSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    setPreferedClasses: (state, action) => {
      state.publicationDate = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});
export const { setPreferedClasses, setSearchTerm } = tutorSlice.actions;
export default tutorSlice.reducer;
