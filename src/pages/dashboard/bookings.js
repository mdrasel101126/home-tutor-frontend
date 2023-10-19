import DashBoardLayout from "@/components/Layouts/DashBoardLayout";
import RootLayout from "@/components/Layouts/RootLayout";
import Spinner from "@/components/ui/Spinner";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "@/redux/features/booking/bookingApi";
import toast from "react-hot-toast";

const Bookings = () => {
  const { data, isLoading } = useGetBookingsQuery();
  const tutors = data?.data;
  const [deleteBooking, { isError, error, isSuccess }] =
    useDeleteBookingMutation();
  const handleDeleteBooking = (id) => {
    deleteBooking(id);
  };
  if (isError) {
    toast.error(error.data?.message);
  }
  if (isSuccess) {
    toast.success("Booking Deleted Successfully");
  }
  return (
    <div className="my-20">
      {isLoading && <Spinner />}
      <h1 className="text-xl text-center font-bold my-4">All Booking Tutors</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tutors &&
              tutors.map((tutor, index) => (
                <tr key={tutor._id}>
                  <th>{index + 1}</th>
                  <td>{`${tutor.tutor.name.firstName} ${tutor.tutor.name.lastName}`}</td>
                  <td>{tutor.tutor.email}</td>
                  <td>{tutor.tutor.contactNo}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteBooking(tutor._id)}
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
        <p className="text-xl text-red-600 text-center">No Booking Found!!</p>
      )}
    </div>
  );
};

export default Bookings;

Bookings.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <DashBoardLayout>{page}</DashBoardLayout>
    </RootLayout>
  );
};
