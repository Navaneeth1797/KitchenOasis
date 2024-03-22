import React, { useEffect } from "react"; // Importing necessary modules from React
import Loader from "../layout/Loader"; // Importing Loader component
import toast from "react-hot-toast"; // Importing toast notifications library
import { MDBDataTable } from "mdbreact"; // Importing MDBDataTable component
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import MetaData from "../layout/MetaData"; // Importing MetaData component

import AdminLayout from "../layout/AdminLayout"; // Importing custom AdminLayout component

import {
  // Importing custom hooks for fetching all users and deleting users
  useAllUsersQuery,
  useDeleteUsersByIdMutation,
} from "../../redux/api/UserApi";

const ListUsers = () => {
  let { data, isLoading, error } = useAllUsersQuery(); // Destructuring hook result into variables

  let [
    // Destructuring deleteUsersById mutation result into variables
    deleteUsersById,
    { error: DeleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteUsersByIdMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message); // Display error message using toast notification if there's an error
    }
    if (DeleteError) {
      toast.error(DeleteError?.data?.message); // Display delete error message using toast notification if there's an error
    }
    if (isSuccess) {
      toast.success("User Deleted"); // Display success message using toast notification if user is deleted successfully
    }
  }, [error, DeleteError, isSuccess]); // Dependency array for useEffect hook

  let deleteUserHander = (id) => {
    deleteUsersById(id); // Function to delete user by ID
  };

  let setUsers = () => {
    let Users = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    data?.users?.forEach((user) => {
      Users.rows.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        actions: (
          <>
            <Link
              to={`/admin/users/${user?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>{" "}
              {/* Pencil icon for editing user */}
            </Link>
            <button
              className="btn btn-outline-success ms-2"
              onClick={() => deleteUserHander(user?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>{" "}
              {/* Trash icon for deleting user */}
            </button>
          </>
        ),
      });
    });

    return Users;
  };
  if (isLoading) return <Loader />; // Render Loader component while data is loading
  return (
    <>
      <AdminLayout>
        {" "}
        {/* Render AdminLayout component */}
        <MetaData title={"All Users"} />{" "}
        {/* Render MetaData component with title prop */}
        <div>
          <h1 className="my-5" id="listP">
            {data?.users?.length} Users
          </h1>{" "}
          {/* Render number of users */}
          <div className="table-responsive">
            <MDBDataTable
              data={setUsers()} // Pass formatted user data to MDBDataTable
              className="px-3"
              bordered
              striped
              hover
              id="table"
            />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default ListUsers; // Export ListUsers component as default
