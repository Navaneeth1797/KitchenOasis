import React, { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../../redux/api/UserApi';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const ResetPassowrd = () => {
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState("");
    let navigate = useNavigate();
    let params = useParams();
    let [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation()
  let { isAuthenticated } = useSelector((state) => state.auth);
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
      if (error) {
        toast.error(error?.data?.message);
        }
         if (isSuccess) {
             toast.success("Password reset successfully");
             navigate("/login");
         }
    }, [error, isAuthenticated, isSuccess, navigate]);
  
    let sumbitHandler = (e) => {
      e.preventDefault();
        if (password !== confirmPassword) {
         return toast.error("Password does not match.try again!")
        }
        let data = {password,confirmPassword}
      resetPassword({token:params?.token,body:data});
  };
  
  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Reset Password"} />
      <div className="row wrapper d-flex justify-content-center align-items-center">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body p-4" onSubmit={sumbitHandler}>
            <h2 className="mb-4 text-center" id="updateP">
              New Password
            </h2>

            <div className="mb-3">
              <label
                htmlFor="password_field"
                className="form-label"
                id="newNam"
              >
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="confirm_password_field"
                className="form-label"
                id="newNam"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="createBtn"
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Password is updating..." : "Set Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassowrd