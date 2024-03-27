import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUpdatePasswordMutation } from '../../redux/api/UserApi';
import UserLayout from '../layout/UserLayout';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

const UpdatePassword = () => {
    let [oldPassword, setOldPassword] = useState("")
    let [password, setPassword] = useState("");
    let navigate = useNavigate();
    let [PasswordProfile, { isLoading, error, isSuccess }] =
      useUpdatePasswordMutation();
    
    useEffect(() => {
    
      if (error) {
        toast.error(error?.data?.message);
      }
      if (isSuccess) {
        toast.success("Password upadted successfully");
        navigate("/my/profile");
      }
    }, [ error, isSuccess,navigate]);
    let sumbitHandler = (e) => {
      e.preventDefault();
      let userData = {
          oldPassword,
          password,
      };
       
      PasswordProfile(userData);
  };
  
  if (isLoading) return <Loader />;

    return (
      <UserLayout>
        <MetaData title={"Update Password"} />
        <div className="update-wrapper">
          <div className="col-10 col-lg-8">
            <form
              className="update-form shadow rounded bg-body"
              onSubmit={sumbitHandler}
            >
              <h2 className="mb-4" id="updateP">
                Update Password
              </h2>
              <div className="form-group mb-3">
                <label htmlFor="old_password_field" id="newNam">
                  Old Password
                </label>
                <input
                  type="password"
                  id="name_field"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="new_password_field" id="newNam">
                  New Password
                </label>
                <input
                  type="password"
                  id="name_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                id="createBtn"
                className="btn update-btn w-100"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </UserLayout>
    );
}

export default UpdatePassword