import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Menu from "./core/Menu";
import PrivateRoute from "./auth/PrivateRoute";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AdminRoute from "./auth/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
