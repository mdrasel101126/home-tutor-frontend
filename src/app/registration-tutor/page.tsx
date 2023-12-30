import TutorRegistration from "@/components/LoginAndRegistration/TutorRegistration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Tutor | Tutor Registration",
};

const Login = () => {
  return (
    <>
      <TutorRegistration />
    </>
  );
};

export default Login;
