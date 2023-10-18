import RootLayout from "@/components/Layouts/RootLayout";
import Spinner from "@/components/ui/Spinner";
import { useLoginUserMutation } from "@/redux/features/user/userApi";
import { saveUser } from "@/redux/features/user/userSlice";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [postLogin, { isError, error, isSuccess, isLoading, data: user }] =
    useLoginUserMutation();
  if (user) {
    dispatch(
      saveUser({
        email: user.data?.user?.email,
        _id: user.data?.user?._id,
        accessToken: user.data?.accessToken,
        promfileImg: user.data?.promfileImg,
      })
    );
    localStorage.setItem("homeTutor", user.data?.accessToken);
  }

  const handleLogin = (data) => {
    console.log(data);
    const options = {
      email: data.email,
      password: data.password,
    };
    postLogin(options);
  };
  //console.log(error?.data?.message);
  if (isSuccess) {
    toast.success("Congratulation! Registration Successfull!");
  }

  return (
    <div className="">
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto mt-16 bg-base-200 p-6 rounded-xl">
        {isLoading && <Spinner />}
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
          Please Login
        </h1>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered w-full "
              {...register("email", { required: "Email is Required" })}
            />
            {errors.email && (
              <p>
                <small className="text-red-600">{errors.email.message}</small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text ">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is Required",
              })}
            />
            {errors.password && (
              <p>
                <small className="text-red-600">
                  {errors.password.message}
                </small>
              </p>
            )}
            <label className="label">
              <button className="label-text text-black">
                Forgot Password?
              </button>
            </label>
          </div>
          {isError && <p className="text-red-500">{error?.data?.message}</p>}
          <input
            className="btn btn-primary w-full bg-gradient-to-r from-primary to-secondary "
            type="submit"
            value="Login"
          />
        </form>
        <label className="label">
          <p>
            <small>
              Already Have an Account?{" "}
              <Link href="/register" className="label-text text-primary">
                Please Register
              </Link>
            </small>
          </p>
        </label>
      </div>
      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: "https://pc-builder-xi.vercel.app/",
          })
        }
        className="btn btn-primary w-28 mt-6"
      >
        Github
      </button>
    </div>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
