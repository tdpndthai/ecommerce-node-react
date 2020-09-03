import React, { useState } from "react";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValue] = useState({
    email: "thai@gmail.com",
    password: "1234567",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setValue({ ...values, error: false, [name]: event.target.value });
  };

  const signInForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Pass Word</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSumit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const clickSumit = (e) => {
    e.preventDefault();
    setValue({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      console.log(data);
      if (data.error) {
        setValue({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValue({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectToUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }  
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Sign in"
      description="Sign in node react e-commerce app"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showLoading()}
      {signInForm()}
      {redirectToUser()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signin;
