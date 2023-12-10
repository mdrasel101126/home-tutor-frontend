export const saveToLocalStorage = (user) => {
  //console.log(user);

  const homeTutor = {
    email: user?.newUserData?.email,
    accessToken: user?.accessToken,
    profileImg: user?.newUserData?.profileImg,
    role: user?.newUserData?.role,
  };

  //console.log(homeTutor);

  localStorage.setItem("homeTutor", JSON.stringify(homeTutor));
};

export const getFromLocalStorage = () => {
  let user = null;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("homeTutor");
  }

  if (user) {
    return JSON.parse(user);
  }

  return user;
};

export const removeFromLocalStorage = () => {
  localStorage.removeItem("homeTutor");
};
