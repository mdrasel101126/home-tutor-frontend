import React, { useState, useEffect } from "react";
import { getUserInfo } from "./auth.service";
import { useUserOwnProfileQuery } from "@/redux/api/userApi";
import { useTutorOwnProfileQuery } from "@/redux/api/tutorApi";
import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { useRouter } from "next/navigation";

const NotificationCounter = () => {
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const { data } = useUserOwnProfileQuery(undefined);
  const { data: tutorData } = useTutorOwnProfileQuery();

  useEffect(() => {
    if (role == "tutor") {
      setNotificationCount(tutorData?.data?.unseenNotification);
    } else {
      setNotificationCount(data?.data?.unseenNotification);
    }
  }, [role, data, tutorData]);
  const goTo = () => {
    role == "tutor"
      ? router.push("/tutor/offer")
      : router.push("/user/booking");
  };

  return (
    <Badge size="small" count={notificationCount}>
      <Avatar
        size="default"
        style={{
          margin: "5px 0 0",
        }}
        onClick={goTo}
        icon={<BellOutlined />}
      />
    </Badge>
  );
};

export default NotificationCounter;
