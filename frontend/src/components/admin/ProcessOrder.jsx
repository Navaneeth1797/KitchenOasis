import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  useGetOrderDetailsByIdQuery,
  useUpdateOrderDetailsByIdMutation,
} from "../../redux/api/OrderApi";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");
  const params = useParams();

  const { data, isLoading, isError, refetch } = useGetOrderDetailsByIdQuery(
    params?.id
  );
  const order = data?.order || {};

  const [updateOrderById, { error, isSuccess }] =
    useUpdateOrderDetailsByIdMutation();

  const {
    shippingInfos,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;
  const isPaid = paymentInfo?.status === "paid";

  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Updated");
      refetch();
    }
  }, [error, isSuccess, refetch]);

  const updateOrderHandler = () => {
    const data = { status };
    updateOrderById({ id: params?.id, body: data });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching order details</div>;
  }

  return (
    <AdminLayout>
      <MetaData title={"Process Order"} />
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4" id="listP">
            Order Details
          </h3>
          <table className="table table-striped table-bordered" id="newNam">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Order Status</th>
                <td
                  className={
                    String(orderStatus).includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Name</th>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Phone No</th>
                <td>{shippingInfos?.phoneNo}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>
                  {shippingInfos?.address}, {shippingInfos?.city},
                  {shippingInfos?.zipCode},{shippingInfos?.country}
                </td>
              </tr>
              <tr>
                <th scope="row">Payment Status</th>
                <td className={isPaid ? "greenColor" : "redColor"}>
                  <b>{paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Payment Method</th>
                <td>{order?.paymentMethods}</td>
              </tr>
              <tr>
                <th scope="row">Stripe ID</th>
                <td>{paymentInfo?.id || "Nill"}</td>
              </tr>
              <tr>
                <th scope="row">Total Amount</th>
                <td>{totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4" id="listP">
            Order Items
          </h3>
          <div className="cart-item my-1">
            {orderItems?.map((item, index) => (
              <div key={index} className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={item?.image}
                    alt={item.name}
                    height="45"
                    width="65"
                  />
                </div>
                <div className="col-5 col-lg-5">
                  <Link
                    to={`/products/${item?.product}`}
                    style={{ textDecoration: "none" }}
                    id="newNam"
                  >
                    {item.name}
                  </Link>
                </div>
                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p id="newNam">${item.price}</p>
                </div>
                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p id="newNam">{item?.quantity} Piece(s)</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4" id="listP">
            Status
          </h4>
          <div className="mb-3">
            <select
              className="form-select"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="newNam"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={updateOrderHandler}
            id="createBtn"
          >
            Update Status
          </button>
          <h4 className="mt-5 mb-3" id="listP">
            Order Invoice
          </h4>
          <Link
            to={`/invoice/order/${order?._id}`}
            className="btn btn-success w-100"
          >
            <i className="fa fa-print"></i> Generate Invoice
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
