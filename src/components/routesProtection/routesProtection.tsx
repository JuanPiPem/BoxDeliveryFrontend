import { userServiceMe } from "../../services/user.service";
import { setUser } from "../../state/user";
import React, { useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";

const RoutesProtection = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    userServiceMe()
      .then((user) => {
        if (user) dispatch(setUser(user));
      })
      .catch(() => {});
  }, []);
  return <>{children}</>;
};

export default RoutesProtection;
