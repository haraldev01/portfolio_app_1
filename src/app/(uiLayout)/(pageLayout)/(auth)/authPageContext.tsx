"use client";

import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";

interface AuthPageContextType {
  isLogin: boolean | undefined;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const AuthPageContext = createContext<AuthPageContextType | undefined>(
  undefined,
);

export const useAuthPage = (): AuthPageContextType => {
  const context = useContext(AuthPageContext);
  if (!context) {
    throw new Error("useAuthPage must be used within AuthPageProvider");
  }
  return context;
};

export const AuthPageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean | undefined>(undefined);

  return (
    <AuthPageContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthPageContext.Provider>
  );
};
