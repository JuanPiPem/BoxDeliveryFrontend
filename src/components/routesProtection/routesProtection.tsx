import { userServiceMe } from "../../services/user.service";
import { setUser } from "../../state/user";
import React, { useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";

interface User {
  id: number;
  email: string;
  name: string;
  last_name: string;
  profile_photo: string;
  is_admin: boolean;
  is_confirmed: boolean;
  is_enabled: boolean;
}

const RoutesProtection = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    userServiceMe()
      .then((user: User | null) => {
        if (user) dispatch(setUser(user));
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);
  return <>{children}</>;
};

export default RoutesProtection;
