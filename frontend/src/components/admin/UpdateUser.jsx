import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import toast from "react-hot-toast";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateUsersByIdMutation,
  useUsersByIdQuery,
} from "../../redux/api/UserApi";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useUsersByIdQuery(params?.id);
  const [updateUsersById, { error, isSuccess }] = useUpdateUsersByIdMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("User updated successfully");
      navigate("/admin/users");
    }
  }, [error, isSuccess, navigate]);

  const sumbitHandler = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      role,
    };
    updateUsersById({ id: params?.id, body: userData });
  };

  return (
    <AdminLayout>
      <MetaData title={"Update User"} />
      <div className="container  mt-4 ">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={sumbitHandler}>
                  <h2 className="mb-4" id="listP">
                    Update User
                  </h2>
                  <div className="mb-3">
                    <label
                      htmlFor="name_field"
                      className="form-label"
                      id="newNam"
                    >
                      Name
                    </label>
                    <input
                      type="name"
                      id="name_field"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="email_field"
                      className="form-label"
                      id="newNam"
                    >
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
                  <div className="mb-3">
                    <label
                      htmlFor="role_field"
                      className="form-label"
                      id="newNam"
                    >
                      Role
                    </label>
                    <select
                      id="name_field"
                      className="form-select"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    id="createBtn"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;
