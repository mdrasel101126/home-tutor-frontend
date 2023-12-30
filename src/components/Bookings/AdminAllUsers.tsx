import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Dropdown, MenuProps, message } from "antd";
import ModalComponent from "../ui/Modal";
import { useState } from "react";
import { useChangeRoleMutation } from "@/redux/api/userApi";
import Link from "next/link";

const AdminAllUsers = (data: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [newRole, setNewRole] = useState<string>("");

  const [roleChange] = useChangeRoleMutation(undefined);
  const changeRole = (cRole: string) => {
    setNewRole(cRole);
    setOpen(true);
  };
  let items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button
          style={{
            backgroundColor: "#c3ffbd",
            color: "#07b318",
            width: "100%",
          }}
          onClick={() => changeRole("super_admin")}
        >
          Super Admin
        </Button>
      ),
    },
    {
      key: "1",
      label: (
        <Button
          style={{
            backgroundColor: "#c3ffbd",
            color: "#07b318",
            width: "100%",
          }}
          onClick={() => changeRole("admin")}
        >
          Admin
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          style={{
            backgroundColor: "#c3ffbd",
            color: "#07b318",
            width: "100%",
          }}
          onClick={() => changeRole("admin_tutor")}
        >
          Admin Tutor
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          style={{
            backgroundColor: "#c3ffbd",
            color: "#07b318",
            width: "100%",
          }}
          onClick={() => changeRole("admin_user")}
        >
          Admin User
        </Button>
      ),
    },
    {
      key: "4",
      label: (
        <Button
          style={{
            backgroundColor: "#c3ffbd",
            color: "#07b318",
            width: "100%",
          }}
          onClick={() => changeRole("user")}
        >
          User
        </Button>
      ),
    },
  ];

  const { role } = getUserInfo() as any;
  return (
    <Card
      hoverable
      style={{
        width: 280,
        margin: "0 auto 0 auto",
        backgroundColor: "#f3f4de",
      }}
    >
      <h3
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          textAlign: "center",
        }}
      >
        {data?.data?.role}
      </h3>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Name:</span> {data?.data?.fullName}
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Email:</span> {data?.data?.email}
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Phone:</span>{" "}
        {data?.data?.phoneNumber}
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Total Tuition Given:</span>{" "}
        {data?.data?.history?.length}
      </p>
      {role !== "admin_tutor" && (
        <Link href={`/dashboard/update-user/${data?.data?._id}`}>
          <Button
            style={{
              backgroundColor: "#c3ffbd",
              color: "#07b318",
              fontWeight: "bold",
              width: "100%",
              padding: "0",
            }}
          >
            <h5>Update</h5>
          </Button>
        </Link>
      )}
      {role == "super_admin" && (
        <Dropdown menu={{ items }}>
          <Button
            style={{
              backgroundColor: "#ffbdbd",
              color: "#b30707",
              fontWeight: "bold",
              width: "100%",
              marginTop: "12px",
              padding: "0",
            }}
          >
            <h5>Change Role</h5>
          </Button>
        </Dropdown>
      )}

      <ModalComponent
        title="Tutor Booking"
        isOpen={open}
        closeModal={() => {
          setOpen(false);
        }}
        handleOk={async () => {
          try {
            const res = await roleChange({
              data: { role: newRole },
              id: data?.data?._id,
            }).unwrap();
            if (res.statusCode === 500) {
              message.error(res.message);
              setOpen(false);
            } else {
              setOpen(false);
              message.success("Role successfully changed!!!");
            }
          } catch (error) {
            message.error("Something went wrong");
          }
        }}
      >
        <p className="my-5">
          Are you sure to Change the role of {data?.data?.fullName} as {newRole}
          ?
        </p>
      </ModalComponent>
    </Card>
  );
};

export default AdminAllUsers;
