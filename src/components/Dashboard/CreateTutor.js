import Spinner from "../ui/Spinner";
import RootLayout from "../Layouts/RootLayout";
import { imageUploader } from "@/upload/upload";
import { useForm } from "react-hook-form";
import { usePostTutorMutation } from "@/redux/features/tutor/tutorApi";
import toast from "react-hot-toast";

const CreateTutor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createTutor, { isError, error, isLoading, isSuccess }] =
    usePostTutorMutation();

  const handleCreateTutor = async (data) => {
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
      description: data?.description,
      educationQualification: data?.educationQualification,
      preferedClasses: data?.preferedClasses,
      promfileImg: imageData?.data?.display_url,
    };
    createTutor(options);
  };

  if (isSuccess) {
    toast.success("Tutor Added Successfully");
  }

  return (
    <div className="my-20">
      {/*  {spinner && <Spinner></Spinner>} */}
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto mt-16 bg-base-200 rounded-xl p-6">
        {isLoading && <Spinner />}
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
          Create Tutor
        </h1>
        <form
          onSubmit={handleSubmit(handleCreateTutor)}
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
              <span className="label-text">Education Qualification</span>
            </label>
            <input
              type="text"
              placeholder="Enter Education Qualification"
              className="input input-bordered w-full"
              {...register("educationQualification", {
                required: "Education Qualification is Required",
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
              <span className="label-text">Prefered Classes</span>
            </label>
            <input
              type="text"
              placeholder="Enter Prefered Classes"
              className="input input-bordered w-full"
              {...register("preferedClasses", {
                required: "Prefered Classes is Required",
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
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is Required" })}
              className="input input-bordered w-full "
            />
            {errors.image && (
              <span role="alert" className="text-red-600">
                {errors.image.message}
              </span>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              {...register("description", {
                required: "Description is Required",
              })}
              className="input input-bordered w-full "
            />
            {errors.description && (
              <span role="alert" className="text-red-600">
                {errors.description.message}
              </span>
            )}
          </div>
          {isError && <p className="text-red-500">{error.data?.message}</p>}
          <input
            className="btn btn-primary w-full  bg-gradient-to-r from-primary to-secondary mt-5"
            type="submit"
            value="Create Tutor"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateTutor;

CreateTutor.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
