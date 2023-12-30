import { message } from "antd";
import { getUserInfo } from "./auth.service";

export const addToLocalStorage = (
  id: string,
  name: string,
  medium: string,
  preferredClass: string,
  expectedMinSalary: number
) => {
  const { role } = getUserInfo() as any;
  if (role == "tutor") {
    message.info(
      "You are a tutor, please login as a user to add him in cart...."
    );
    return;
  }
  const tutor = {
    id,
    name,
    medium,
    class: preferredClass,
    salary: expectedMinSalary,
  };
  const storage = localStorage.getItem("tutor");
  if (storage !== null) {
    const addedAllTutorOnCard = JSON.parse(storage);
    const selectedTutor = addedAllTutorOnCard.find(
      (cartTutor: any) => cartTutor?.id == id
    );
    if (selectedTutor) {
      message.info(`You already add ${name} on your cart.`);
    } else {
      message.success(`Added ${name} on your cart successfully....`);
      addedAllTutorOnCard.push(tutor);
      localStorage.setItem("tutor", JSON.stringify(addedAllTutorOnCard));
    }
  } else {
    localStorage.setItem("tutor", JSON.stringify([tutor]));
  }
};

export const removeFromLocalStorage = (id: string, name: string) => {
  const storage = localStorage.getItem("tutor");
  const addedAllTutorOnCard = JSON.parse(storage!);
  const newCard = addedAllTutorOnCard.filter((item: any) => item.id !== id);
  localStorage.setItem("tutor", JSON.stringify(newCard));
  message.success(`Removed ${name} from your cart successfully....`);
};
