import React, { useState } from "react";
import Layout from "../core/Layout";
import { signup } from "../auth/index";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValue] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValue({ ...values, error: false, [name]: event.target.value });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
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

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New user created, <Link to="/signin">Sign In</Link>
      </div>
    );
  };

  const { name, email, password, error, success } = values;

  const clickSumit = (e) => {
    e.preventDefault();
    setValue({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      console.log(data);
      if (data.error) {
        setValue({ ...values, error: data.error, success: false });
      } else {
        setValue({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  return (
    <Layout
      title="Sign up"
      description="Sign up node react e-commerce app"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
