import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [loggingIn, setLogginIn] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
  };

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setCredentials({
        username: e.target.value,
        password: credentials.password,
      });
    } else if (e.target.name === "password") {
      setCredentials({
        username: credentials.username,
        password: e.target.value,
      });
    }
    console.log(e.target.name, e.target.value);
  };
  return (
    <div className="auth-page">
      <section className="bubble">
        <h2 className="title">DigitBook</h2>
      </section>
      <div className="auth-back">
        <div className="auth-form">
          <h2>Login</h2>
          <form name="form" onSubmit={handleSubmit}>
            <div
              className={
                "form-group" +
                (submitted && !credentials.username ? " has-error" : "")
              }
            >
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
              {submitted && !credentials.username && (
                <div className="help-block">Username is required</div>
              )}
            </div>
            <div
              className={
                "form-group" +
                (submitted && !credentials.password ? " has-error" : "")
              }
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
              {submitted && !credentials.password && (
                <div className="help-block">Password is required</div>
              )}
            </div>
            <div className="form-group">
              <button className="login-btn">Login</button>
              {/* {loggingIn && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt=""/>
            )} */}
              <Link to="/register" className="btn btn-link">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
