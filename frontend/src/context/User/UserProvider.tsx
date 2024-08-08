import { useState } from "react";
import UserContext from "./UserContext";

type User = {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  token: string;
};

const UserProvider = ({children}) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const logout = () => {
    if (user) {
      localStorage.removeItem("user");
      setUser(null);
    }
  };
  const addUser = (value: User) => {
    const str = JSON.stringify(value);
    localStorage.setItem("user", str);
    setUser(value);
  };
  return (
    <UserContext.Provider value={{ user, setUser: addUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
