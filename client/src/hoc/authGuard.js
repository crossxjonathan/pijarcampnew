import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "components/utils/loader";
import { useNavigate } from "react-router-dom";

export default function authGuard(ComposeComponent) {
  const AuthenticationCheck = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    // console.log(users, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<good");
    useEffect(() => {
      if (users && users.auth) {
        setIsAuth(true);
      } else {
        navigate("/sign_in");
      }
    }, [props, users]);

    if (!isAuth) {
      return <Loader full={true} />;
    } else {
      return <ComposeComponent users={users} {...props} />;
    }
  };
  return AuthenticationCheck;
}
