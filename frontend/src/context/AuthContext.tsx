import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  logout: () => void;
}

const defaultContextValue: AuthContextType = {
  authToken: null,
  setAuthToken: () => {},
  logout: () => {},
};

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>(defaultContextValue);

// AuthProvider component to provide auth state
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken") || null
  );

  // Function to handle setting the auth token and updating localStorage
  const handleSetAuthToken = (token: string | null) => {
    console.log("he");
    setAuthToken(token);
    localStorage.setItem("authToken", token || "");
  };

  // Function to handle logging out
  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: handleSetAuthToken,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
