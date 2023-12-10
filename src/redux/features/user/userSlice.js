import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  accessToken: "",
  userLoader: true,
  profileImg: null,
  role: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.email = action.payload?.email;
      state.accessToken = action.payload?.accessToken;
      state.userLoader = false;
      state.profileImg = action.payload?.profileImg;
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
      state.accessToken = "";
      state.userLoader = false;
      state.profileImg = null;
      state.role = "";
    },
  },
});
export const { saveUser, removeUser, setAccessToken, setLoader } =
  userSlice.actions;
export default userSlice.reducer;
