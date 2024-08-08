import { createContext } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  token: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
