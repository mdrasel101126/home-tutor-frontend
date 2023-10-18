import { useDispatch } from "react-redux";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import {
  saveUser,
  setAccessToken,
  setLoader,
} from "@/redux/features/user/userSlice";
import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }) => {
  const dispatch = useDispatch();
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("homeTutor");
  }
  const { data: user, isError } = useGetUserQuery(undefined);
  // console.log(user);
  if (isError) {
    dispatch(setLoader());
  }

  if (token) {
    dispatch(setAccessToken(token));
  }
  if (user && token) {
    dispatch(
      saveUser({
        email: user.data?.email,
        _id: user.data?._id,
        accessToken: token,
        promfileImg: user?.data?.promfileImg,
      })
    );
  }
  if (!token) {
    dispatch(setLoader());
  }
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </>
  );
};

export default RootLayout;
