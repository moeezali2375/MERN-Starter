import { useContext } from "react";
import UserContext from "./UserContext";

const useUser = () => {
  const context = useContext(UserContext);
  if (context == undefined)
    throw new Error("User Context is being used outside the scope");
  return context;
};

export default useUser;
