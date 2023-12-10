import RootLayout from "@/components/Layouts/RootLayout";
import Spinner from "@/components/ui/Spinner";
import { useLoginUserMutation } from "@/redux/features/user/userApi";
import { saveUser } from "@/redux/features/user/userSlice";
import { saveToLocalStorage } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { email } = useSelector((state) => state.user);
  const [postLogin, { isError, error, isSuccess, isLoading, data: user }] =
    useLoginUserMutation();
  const dispatch = useDispatch();
  if (user) {
    console.log(user?.data);
    saveToLocalStorage(user?.data);
    dispatch(
      saveUser({
        email: user?.data?.newUserData?.email,
        accessToken: user?.data?.accessToken,
        profileImg: user?.data?.newUserData?.profileImg,
        role: user?.data?.newUserData?.role,
      })
    );
  }
  if (email) {
    router.push("/");
  }

  const handleLogin = (data) => {
    //console.log(data);
    const options = {
      email: data.email,
      password: data.password,
    };
    postLogin(options);
  };
  //console.log(error?.data?.message);
  if (isSuccess) {
    toast.success("Login Successfull!");
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
    </div>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
