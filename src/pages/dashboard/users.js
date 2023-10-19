import DashBoardLayout from "@/components/Layouts/DashBoardLayout";
import RootLayout from "@/components/Layouts/RootLayout";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const { data, isError, isLoading, error } = useGetAllUserQuery();
  const { _id } = useSelector((state) => state.user);
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDeleteSuccess }] = useDeleteUserMutation();
  const users = data?.data;
  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  const handleMakeAdmin = (id) => {
    const options = {
      id: id,
      data: {
        role: "admin",
      },
    };
    //console.log(options);
    updateUser(options);
  };
  if (isUpdateSuccess) {
    toast.success("Successfull!!");
  }
  if (isDeleteSuccess) {
    toast.success("User Deleted Successfully");
  }
  return (
    <div className="my-20">
      <h1 className="text-xl text-center font-bold my-4">
        All Users Of This Website
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{`${user.name.firstName} ${user.name.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      disabled={
                        (_id === user._id) | (user?.role === "super_admin")
                      }
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-sm text-red-600"
                    >
                      Delete
                    </button>
                    <button
                      disabled={
                        (_id === user._id) |
                        (user?.role === "super_admin") |
                        (user?.role === "admin")
                      }
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm text-green-600 ml-2"
                    >
                      Make Admin
                    </button>
                  </td>
                  <td>{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {users?.length === 0 && (
        <p className="text-xl text-red-600 text-center">No User Found!!</p>
      )}
    </div>
  );
};

export default AllUsers;
AllUsers.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <DashBoardLayout>{page}</DashBoardLayout>
    </RootLayout>
  );
};
