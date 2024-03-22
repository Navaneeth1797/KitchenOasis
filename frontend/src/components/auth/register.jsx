import React, { useState, useEffect } from "react";
import { useRegisterMutation } from "../../redux/api/AuthApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Register = () => {
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  let { name, email, password } = user;
  let navigate = useNavigate();
  let [register, { isLoading, error }] = useRegisterMutation();
  let { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated,navigate]);

  let sumbitHandler = (e) => {
    e.preventDefault();
    let signUPData = {
      name,
      email,
      password,
    };
    register(signUPData);
  };

  let onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (isLoading) return <Loader />;
  
  return (
    <>
      <MetaData title={"Register page"} />
      <div
        className="row justify-content-center"
        style={{ marginTop: "3%", marginBottom: "3%" }}
      >
        <div className="col-10 col-lg-5">
          <div className="card shadow rounded">
            <div className="card-body">
              <form onSubmit={sumbitHandler}>
                <h3 className="mb-4" id="updateP">
                  Sign Up
                </h3>
                <div className="mb-3">
                  <label className="form-label" id="newNam">
                    First name
                  </label>
                  <input
                    id="name_field"
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" id="newNam">
                    Email address
                  </label>
                  <input
                    id="name_field"
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" id="newNam">
                    Password
                  </label>
                  <input
                    id="name_field"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div className="d-grid">
                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "REGISTER"}
                  </button>
                </div>
                <p className="forgot-password text-right mt-3" id="newNam">
                  Already registered?{" "}
                  <a
                    href="/login"
                    style={{ textDecoration: "none" }}
                    id="newNam"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;