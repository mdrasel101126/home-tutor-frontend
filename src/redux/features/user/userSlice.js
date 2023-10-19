import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  _id: "",
  accessToken: "",
  userLoader: true,
  promfileImg: null,
  role: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.email = action.payload?.email;
      state._id = action.payload?._id;
      state.accessToken = action.payload?.accessToken;
      state.userLoader = false;
      state.promfileImg = action.payload?.promfileImg;
      state.role = action.payload?.role;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setLoader: (state) => {
      state.userLoader = false;
    },
    removeUser: (state) => {
      state.email = "";
      state._id = "";
      state.accessToken = "";
      state.userLoader = false;
      state.promfileImg = null;
      state.role = "";
    },
  },
});
export const { saveUser, removeUser, setAccessToken, setLoader } =
  userSlice.actions;
export default userSlice.reducer;
