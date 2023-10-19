import {
  useDeleteTutorMutation,
  useGetTutorsQuery,
} from "@/redux/features/tutor/tutorApi";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AllTutors = () => {
  const { searchTerm, preferedClasses } = useSelector((state) => state.tutor);
  const { data, isError, isLoading, error } = useGetTutorsQuery({
    searchTerm,
    preferedClasses,
  });
  const [
    deleteTutor,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteTutorMutation();
  const tutors = data?.data?.data;
  console.log(data);
  const handleDeleteTutor = (id) => {
    console.log(id);
    deleteTutor(id);
  };
  if (isDeleteError) {
    toast.error(deleteError.data?.message);
  }
  if (isDeleteSuccess) {
    toast.success("User Deleted Successfully");
  }
  if (isError) {
    toast.error(error.data?.message);
  }
  return (
    <div className="my-20">
      {isLoading && <Spinner />}
      <h1 className="text-xl text-center font-bold my-4">
        All Tutors Of This Website
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tutors &&
              tutors.map((tutor, index) => (
                <tr key={tutor._id}>
                  <th>{index + 1}</th>
                  <td>{`${tutor.name.firstName} ${tutor.name.lastName}`}</td>
                  <td>{tutor.email}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteTutor(tutor._id)}
                      className="btn btn-sm text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {tutors?.length === 0 && (
        <p className="text-xl text-red-600 text-center">No Tutor Found!!</p>
      )}
    </div>
  );
};

export default AllTutors;
