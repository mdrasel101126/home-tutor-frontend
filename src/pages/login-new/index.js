import Image from "next/image";
import React from "react";
import loginImage from "../../assets/login-register-image.jpg";
import Link from "next/link";
import RootLayout from "@/components/Layouts/RootLayout";

const Login = () => {
  return (
    <div className="flex flex-row p-4 w-full md:w-4/5 lg:w-3/5 mx-auto my-6">
      <div className="w-1/2">
        <Image src={loginImage} layout="responsive" alt="login image" />
      </div>
      <div className="w-1/2 flex flex-row  items-center">
        <div>
          <button>
            <Link
              href="/login-new/login-user"
              className="text-blue-700 font-bold text-xl"
            >
              Login
            </Link>
          </button>
          <br />
          <button>
            <Link
              href="/login-new/login-tutor"
              className="text-blue-700 font-bold text-xl"
            >
              Login as a Tutor
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

Login.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
