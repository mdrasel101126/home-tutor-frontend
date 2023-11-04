import Spinner from "@/components/ui/Spinner";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  const { data, isLoading } = useGetUserQuery();
  const handleUpdateUser = async (data) => {
    console.log(data);

    const options = {
      name: {
        firstName: data?.firstName,
        lastName: data?.lastName,
      },
      email: data?.email,
      contactNo: data?.contactNo,
      address: data?.address,
      password: data?.password,
    };
    updateUser(options);
  };

  router.push("/profile");

  return (
    <div className="my-20">
      {/*  {spinner && <Spinner></Spinner>} */}
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto mt-16 bg-base-200 rounded-xl p-6">
        {isLoading && <Spinner />}
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
          Please Register
        </h1>
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="flex flex-col gap-4"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              defaultValue={data?.data?.name?.firstName}
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
              defaultValue={data?.data?.name?.lastName}
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
              defaultValue={data?.data?.email}
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
              defaultValue={data?.data?.contactNo}
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
              defaultValue={data?.data?.address}
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
              defaultValue={data?.data?.password}
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
          {/*  {registerError && <p className="text-red-500">{registerError}</p>} */}
          <input
            className="btn btn-primary w-full  bg-gradient-to-r from-primary to-secondary mt-5"
            type="submit"
            value="Update"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
