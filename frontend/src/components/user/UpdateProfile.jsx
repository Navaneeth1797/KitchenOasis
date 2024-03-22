import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/UserApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import UserLayout from "../layout/UserLayout";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
const UpdateProfile = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let navigate = useNavigate();
  let [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();
  let { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("profile upadted successfully");
      navigate("/my/profile");
    }
  }, [user, error, isSuccess, navigate]);
  let sumbitHandler = (e) => {
    e.preventDefault();
    let userData = {
      name,
      email,
    };
    updateProfile(userData);
  };

  if (isLoading) return <Loader />;

  return (
    <UserLayout>
      <MetaData title={"Update Profile"} />{" "}
      <div className="update-wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="update-form shadow rounded bg-body"
            onSubmit={sumbitHandler}
          >
            <h2 className="mb-4" id="updateP">
              Update Profile
            </h2>

            <div className="form-group mb-3">
              <label htmlFor="name_field" id="newNam">
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email_field" id="newNam">
                Email
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
              type="submit"
              className="btn update-btn w-100"
              disabled={isLoading}
              id="createBtn"
            >
              {isLoading ? "Updating.." : "UPDATE"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateProfile;
