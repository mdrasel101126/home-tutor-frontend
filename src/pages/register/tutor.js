import RootLayout from "@/components/Layouts/RootLayout";
import Spinner from "@/components/ui/Spinner";
import { useCreateTutorMutation } from "@/redux/features/user/userApi";
import { saveUser } from "@/redux/features/user/userSlice";
import { imageUploader } from "@/upload/upload";
import { saveToLocalStorage } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const RegisterTutor = () => {
  const router = useRouter();
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [postSignup, { isError, error, isLoading, data: user }] =
    useCreateTutorMutation();
  if (user) {
    saveToLocalStorage(user?.data);
    dispatch(
      saveUser({
        email: user.data?.newUserData?.email,
        accessToken: user.data?.accessToken,
        profileImg: user.data?.newUserData?.profileImg,
        role: user.data?.newUserData?.role,
      })
    );
  }
  const handleLoin = async (data) => {
    // console.log(data);
    const image = data.image[0];
    let imageData = null;
    if (image) {
      imageData = await imageUploader(image);
      if (imageData?.success === "false") {
        //console.log(imageData);
        toast.error("Image upload failed!");
      }
    }
    const tutionArea = data?.tutionArea?.split("|");
    const preferedClasses = data?.preferedClasses?.split("|");
    const preferedSubjects = data?.preferedSubjects?.split("|");
    const options = {
      password: data?.password,
      email: data?.email,
      profileImg: imageData?.data?.display_url,
      tutor: {
        name: {
          firstName: data?.firstName,
          lastName: data?.lastName,
        },
        email: data?.email,
        contactNo: data?.contactNo,
        division: data?.division,
        district: data?.district,
        policeStation: data?.policeStation,
        sallaryRange: data?.sallaryRange,
        description: data?.description,
        educationQualification: data?.educationQualification,
        institutionName: data?.institutionName,
        tutionArea: tutionArea,
        preferedClasses: preferedClasses,
        preferedSubjects: preferedSubjects,
      },
    };
    //console.log(options);
    postSignup(options);
  };
  if (email) {
    router.push("/");
  }
  return (
    <div className="my-20">
      {isLoading && <Spinner></Spinner>}
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto mt-16 bg-base-200 rounded-xl p-6">
        {isLoading && <Spinner />}
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
          Please Register
        </h1>
        <div className="text-center">
          <p className="font-bold">You are not a tutor? Please </p>
          <Link href="/register" className="text-blue-600 font-bold">
            Click Here
          </Link>
        </div>
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
              <span className="label-text">Division</span>
            </label>
            <input
              type="text"
              placeholder="Enter Division"
              className="input input-bordered w-full"
              {...register("division", { required: "Division is Required" })}
            />
            {errors.division && (
              <p>
                <small className="text-red-600">
                  {errors.division.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <input
              type="text"
              placeholder="Enter District"
              className="input input-bordered w-full"
              {...register("district", { required: "District is Required" })}
            />
            {errors.district && (
              <p>
                <small className="text-red-600">
                  {errors.district.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Police Station</span>
            </label>
            <input
              type="text"
              placeholder="Enter Police Station"
              className="input input-bordered w-full"
              {...register("policeStation", {
                required: "Police Station is Required",
              })}
            />
            {errors.policeStation && (
              <p>
                <small className="text-red-600">
                  {errors.policeStation.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Sallary Range</span>
            </label>
            <input
              type="text"
              placeholder="Enter Salary Range"
              className="input input-bordered w-full"
              {...register("sallaryRange", {
                required: "Sallary Range is Required",
              })}
            />
            {errors.sallaryRange && (
              <p>
                <small className="text-red-600">
                  {errors.sallaryRange.message}
                </small>
              </p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Education Qualification</span>
            </label>
            <input
              type="text"
              placeholder="Enter Education Qualification"
              className="input input-bordered w-full"
              {...register("educationQualification", {
                required: "EducationQualification is Required",
              })}
            />
            {errors.educationQualification && (
              <p>
                <small className="text-red-600">
                  {errors.educationQualification.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Institution Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Institution Name"
              className="input input-bordered w-full"
              {...register("institutionName", {
                required: "Institution Name is Required",
              })}
            />
            {errors.institutionName && (
              <p>
                <small className="text-red-600">
                  {errors.institutionName.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              placeholder="Enter Description"
              className="textarea textarea-bordered w-full"
              {...register("description", {
                required: "Description is Required",
              })}
            />
            {errors.description && (
              <p>
                <small className="text-red-600">
                  {errors.description.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Tution Area</span>
            </label>
            <input
              type="text"
              placeholder="Enter Tuition Area. Please Use '|' Sign for Multiple Area"
              className="textarea textarea-bordered w-full"
              {...register("tutionArea", {
                required: "Tution Area is Required",
              })}
            />
            {errors.tutionArea && (
              <p>
                <small className="text-red-600">
                  {errors.tutionArea.message}
                </small>
              </p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Prefered Classes</span>
            </label>
            <input
              type="text"
              placeholder="Enter Prefered Classes. Please Use '|' Sign for Multiple Prefered Classes"
              className="textarea textarea-bordered w-full"
              {...register("preferedClasses", {
                required: "Tution Area is Required",
              })}
            />
            {errors.preferedClasses && (
              <p>
                <small className="text-red-600">
                  {errors.preferedClasses.message}
                </small>
              </p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Prefered Subjects</span>
            </label>
            <input
              type="text"
              placeholder="Enter Prefered Subjects. Please Use '|' Sign for Multiple Prefered Subjects"
              className="textarea textarea-bordered w-full"
              {...register("preferedSubjects", {
                required: "Prefered Subjects is Required",
              })}
            />
            {errors.preferedSubjects && (
              <p>
                <small className="text-red-600">
                  {errors.preferedSubjects.message}
                </small>
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

export default RegisterTutor;

RegisterTutor.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
