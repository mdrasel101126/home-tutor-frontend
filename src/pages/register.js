import RootLayout from "@/components/Layouts/RootLayout";
import Spinner from "@/components/ui/Spinner";
import { useCreateUserMutation } from "@/redux/features/user/userApi";
import { saveUser } from "@/redux/features/user/userSlice";
import { imageUploader } from "@/upload/upload";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const router = useRouter();
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [postSignup, { isError, error, isLoading, data: user }] =
    useCreateUserMutation();
  if (user) {
    dispatch(
      saveUser({
        email: user.data?.user?.email,
        _id: user.data?.user?._id,
        accessToken: user.data?.accessToken,
        promfileImg: user.data?.promfileImg,
        role: user.data?.role,
      })
    );
    localStorage.setItem("homeTutor", user.data?.accessToken);
  }
  const handleLoin = async (data) => {
    console.log(data);
    const image = data.image[0];
    let imageData = null;
    if (image) {
      imageData = await imageUploader(image);
      if (imageData?.success === "false") {
        toast.error("Image upload failed!");
      }
    }
    const options = {
      name: {
        firstName: data?.firstName,
        lastName: data?.lastName,
      },
      email: data?.email,
      contactNo: data?.contactNo,
      address: data?.address,
      password: data?.password,
      promfileImg: imageData?.data?.display_url,
    };
    postSignup(options);
  };
  if (email) {
    router.push("/");
  }
  return (
    <div className="my-20">
      {/*  {spinner && <Spinner></Spinner>} */}
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto mt-16 bg-base-200 rounded-xl p-6">
        {isLoading && <Spinner />}
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
          Please Register
        </h1>
        <form
          onSubmit={handleSubmit(handleLoin)}
          className="flex flex-col gap-4"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="input input-bordered w-full"
              {...register("firstName", { required: "First Name is Required" })}
            />
            {errors.firstName && (
              <p>
                <small className="text-red-600">
                  {errors.firstName.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="input input-bordered w-full"
              {...register("lastName", { required: "Last Name is Required" })}
            />
            {errors.lastName && (
              <p>
                <small className="text-red-600">
                  {errors.lastName.message}
                </small>
              </p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered w-full"
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
              <span className="label-text">Contact Number</span>
            </label>
            <input
              type="tel"
              placeholder="Enter Contact No"
              className="input input-bordered w-full"
              {...register("contactNo", { required: "Contact No is Required" })}
            />
            {errors.contactNo && (
              <p>
                <small className="text-red-600">
                  {errors.contactNo.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="input input-bordered w-full"
              {...register("address", { required: "Address is Required" })}
            />
            {errors.address && (
              <p>
                <small className="text-red-600">{errors.address.message}</small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Use at least six characters",
                },
              })}
            />
            {errors.password && (
              <p>
                <small className="text-red-600">
                  {errors.password.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              {...register("image")}
              className="input input-bordered w-full "
            />
            {errors.image && (
              <span role="alert" className="text-red-600">
                {errors.image.message}
              </span>
            )}
          </div>
          {/*  {registerError && <p className="text-red-500">{registerError}</p>} */}
          <input
            className="btn btn-primary w-full  bg-gradient-to-r from-primary to-secondary mt-5"
            type="submit"
            value="Register"
          />
        </form>
        <label className="label">
          <p>
            <small>
              No Account?{" "}
              <Link href="/login" className="label-text text-primary">
                Please Login
              </Link>
            </small>
          </p>
        </label>
      </div>
    </div>
  );
};

export default Register;

Register.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
