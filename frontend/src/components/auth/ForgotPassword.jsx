import React, { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '../../redux/api/UserApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {

    let [email, setEmail] = useState('');
  let [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();
     let navigate = useNavigate();
  let { isAuthenticated } = useSelector((state) => state.auth);
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
      if (error) {
        toast.error(error?.data?.message);
        }
         if (isSuccess) {
           toast.success("Email sent to your account");
         }
    }, [error, isAuthenticated, isSuccess, navigate]);
  
    let sumbitHandler = (e) => {
      e.preventDefault();
      
        forgotPassword({ email })
  };

  if (isLoading) return <Loader />;
  
  return (
    <>
      <MetaData title={"Forgot Password"} />
      <div
        className="row wrapper d-flex justify-content-center align-items-center"
        style={{ marginTop: "3%", marginBottom: "3%" }}
      >
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body p-4" onSubmit={sumbitHandler}>
            <h2 className="mb-4 text-center" id="updateP">
              Forgot Password
            </h2>
            <div className="mb-3">
              <label htmlFor="email_field" className="form-label" id="newNam">
                Enter Email
              </label>
              <input
                type="email"
                id="name_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="createBtn"
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Processing your request..." : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword