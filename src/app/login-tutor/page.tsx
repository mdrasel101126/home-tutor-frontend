import TutorLogin from "@/components/LoginAndRegistration/TutorLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Tutor | Tutor Login",
};

const Login = () => {
  return (
    <>
      <TutorLogin />
    </>
  );
};

export default Login;
