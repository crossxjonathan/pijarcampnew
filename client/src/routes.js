import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./hoc/mainLayout";
import AuthGuard from "hoc/authGuard";

import Header from "./components/navigation/header";
import RegisterLogin from "./components/auth";

import Dashboard from "./components/dashboard";
import UserInfo from "components/dashboard/user/info";
import AdminProducts from "components/dashboard/admin/products";
import AddProducts from "components/dashboard/admin/products/addEdit/add";
import EditProducts from "components/dashboard/admin/products/addEdit/edit";

import { useDispatch, useSelector } from "react-redux";
import { userIsAuth, userSignOut } from "store/actions/user.actions";

const backgroundImage = () => {
  return {
    width: "100%",
    height: "100%",
    backgroundSize: "auto",
    background: `url(${require("./images/balibg.png")})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
};

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut());
  };

  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
        <>
          <div style={backgroundImage()}>
            <Header users={users} signOutUser={signOutUser} />
            <MainLayout>
              <Routes>
              <Route
                  path="/dashboard/admin/edit_products/:id"
                  Component={AuthGuard(EditProducts)}
                />
                <Route
                  path="/dashboard/admin/add_products"
                  Component={AuthGuard(AddProducts)}
                />
                <Route
                  path="/dashboard/admin/admin_products"
                  Component={AuthGuard(AdminProducts)}
                />
                <Route
                  path="/dashboard/user/user_info"
                  Component={AuthGuard(UserInfo)}
                />
                <Route path="/dashboard" Component={AuthGuard(Dashboard)} />
                <Route path="/sign_in" Component={RegisterLogin} />
              </Routes>
            </MainLayout>
          </div>
        </>
    </BrowserRouter>
  );
};

export default App;
