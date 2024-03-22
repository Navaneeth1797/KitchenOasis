import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/AuthApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCartItem } from "../../redux/features/CartSlice";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";


const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let [login, { isLoading, error,   }] = useLoginMutation();
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
    let loginData = {
      email,
      password,
    };
    
    login(loginData)
      .unwrap()
      .then((response) => {
       
        const cartItems = response.cartItems; 
        cartItems.forEach((item) => {
          dispatch(setCartItem(item));
        });
      })
      .catch((isSuccess) => {
        toast.success("Welcome Back");
      });
  };

  if (isLoading) return <Loader />;
  
  return (
    <>
      <MetaData title={"Login Page"} />
      <div className="login-wrapper">
        <div className="login-card">
          <form className="login-form" onSubmit={sumbitHandler}>
            <h3 id="updateP">Sign In</h3>
            <div className="form-group">
              <label htmlFor="email_field" id="newNam">
                Email address
              </label>
              <input
                type="email"
                id="name_field"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field" id="newNam">
                Password
              </label>
              <input
                type="password"
                id="name_field"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "LOGIN"}
            </button>

            <p className="forgot-password" id="newNam">
              Forgot your password?{" "}
              <a
                href="/password/forgot"
                style={{ textDecoration: "none" }}
                id="newNam"
              >
                Reset here
              </a>
            </p>
            <div className="my-3">
              {" "}
              <a
                href="/register"
                className="float-end"
                style={{ textDecoration: "none" }}
                id="newNam"
              >
                New User?{" "}
              </a>{" "}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;