"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import Session from "supertokens-web-js/recipe/session";
import eventEmitter from "../utils/eventEmitter";
import { faker } from "@faker-js/faker";

interface User {
  email: string;
  username: string;
}

interface UserContextType {
  user: User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchUser = useCallback(async () => {
    if (await Session.doesSessionExist()) {
      const res = await fetch("/api/user");
      const data: User = await res.json();
      setUser(data);
    } else {
      setUser(undefined);
    }
  }, []);

  // useEffect(() => {
  //   fetchUser();
  //   eventEmitter.on("SESSION_CREATED", fetchUser);
  //   eventEmitter.on("SIGN_OUT", fetchUser);
  //   return () => {
  //     // Clean up listeners when the component unmounts
  //     eventEmitter.on("SESSION_CREATED", fetchUser);
  //     eventEmitter.on("SIGN_OUT", fetchUser);
  //   };
  // }, [fetchUser]);

  useEffect(() => {
    setUser(
      Math.random() > 0.5
        ? {
            email: faker.internet.email(),
            username: faker.internet.userName(),
          }
        : undefined,
    );
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
