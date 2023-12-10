import { useDispatch } from "react-redux";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { saveUser, setLoader } from "@/redux/features/user/userSlice";
import { Toaster } from "react-hot-toast";

import { getFromLocalStorage } from "@/utils/auth";
import { useEffect } from "react";

const RootLayout = ({ children }) => {
  const dispatch = useDispatch();
  const user = getFromLocalStorage();
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(
        saveUser({
          email: user?.email,
          accessToken: user?.accessToken,
          profileImg: user?.profileImg,
          role: user?.role,
        })
      );
    }
    if (!user) {
      dispatch(setLoader());
    }
  }, [dispatch, user]);

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
