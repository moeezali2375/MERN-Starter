import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for the user
interface User {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Default values for context
const defaultUserContextValue: UserContextType = {
  user: null,
  setUser: () => {},
};

// Create the UserContext with default values
const UserContext = createContext<UserContextType>(defaultUserContextValue);

// UserProvider component to provide user state
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
