import TutorRegistration from "@/components/LoginAndRegistration/TutorRegistration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Tutor | Tutor Registration",
};

const Login = () => {
  return (
    <div style={{ maxWidth:"1400px",
    margin:"0 auto"}}>
      <TutorRegistration />
    </div>
  );
};

export default Login;
