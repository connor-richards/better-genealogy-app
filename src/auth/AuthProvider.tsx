import React, { useContext, useState, useEffect, createContext } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";

interface AuthContextProps {
  currentUser: User | null;
  logout: () => void;
}

// Create the context, allowing undefined initially (for setup purposes)
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Helper hook to access the Auth context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth);
  };

  const value = {
    currentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
