import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preferedClasses: "",
  searchTerm: "",
  page: 0,
  limit: 10,
};

const filterSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    setPreferedClasses: (state, action) => {
      state.preferedClasses = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export const { setPreferedClasses, setSearchTerm, setLimit, setPage } =
  filterSlice.actions;
export default filterSlice.reducer;
