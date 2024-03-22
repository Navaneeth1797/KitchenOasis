import React, { useEffect } from "react"; // Importing necessary modules from React
import Loader from "../layout/Loader"; // Importing Loader component
import toast from "react-hot-toast"; // Importing toast notifications library
import { MDBDataTable } from "mdbreact"; // Importing MDBDataTable component
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import MetaData from "../layout/MetaData"; // Importing MetaData component
import AdminLayout from "../layout/AdminLayout"; // Importing custom AdminLayout component
import {
  useAllOrdersQuery,
  useDeleteOrderByIdMutation,
} from "../../redux/api/OrderApi"; // Importing custom hooks for fetching all orders and deleting orders

const ListOrders = () => {
  let { data, isLoading, error } = useAllOrdersQuery(); // Destructuring hook result into variables

  let [deleteOrderById, { error: DeleteError, isSuccess, isDeleteLoading }] = // Destructuring deleteOrderById mutation result into variables
    useDeleteOrderByIdMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message); // Display error message using toast notification if there's an error
    }
    if (DeleteError) {
      toast.error(DeleteError?.data?.message); // Display delete error message using toast notification if there's an error
    }
    if (isSuccess) {
      toast.success("Order Deleted"); // Display success message using toast notification if order is deleted successfully
    }
  }, [error, DeleteError, isSuccess]); // Dependency array for useEffect hook

  let deleteOrderHander = (id) => {
    deleteOrderById(id); // Function to delete order by ID
  };

  let setOrders = () => {
    let Orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
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
    data?.order?.forEach((orders) => {
      Orders.rows.push({
        id: orders?._id,
        paymentStatus: orders?.paymentInfo?.status?.toUpperCase(), // Convert payment status to uppercase
        orderStatus: orders?.orderStatus,
        actions: (
          <>
            <Link
              to={`/admin/orders/${orders?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>{" "}
              {/* Pencil icon for editing order */}
            </Link>

            <button
              className="btn btn-outline-success ms-2"
              onClick={() => deleteOrderHander(orders?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>{" "}
              {/* Trash icon for deleting order */}
            </button>
          </>
        ),
      });
    });

    return Orders;
  };
  if (isLoading) return <Loader />; // Render Loader component while data is loading
  return (
    <>
      <AdminLayout>
        {" "}
        {/* Render AdminLayout component */}
        <MetaData title={"All Orders"} />{" "}
        {/* Render MetaData component with title prop */}
        <div>
          <h1 className="my-5" id="listP">
            {data?.order?.length}
            orders
          </h1>
          <div className="table-responsive">
            {" "}
            {/* Responsive table container */}
            <MDBDataTable
              data={setOrders()}
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

export default ListOrders; // Export ListOrders component as default
