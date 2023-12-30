import TutorLogin from "@/components/LoginAndRegistration/TutorLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Tutor | Tutor Login",
};

const Login = () => {
  return (
    <div style={{ maxWidth:"1400px",
    margin:"0 auto"}}>
      <TutorLogin />
    </div>
  );
};

export default Login;
