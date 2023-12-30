import LoginPage from "@/components/LoginAndRegistration/UserLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Tutor"
};

const Login = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default Login;
