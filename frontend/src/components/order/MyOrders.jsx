import React, { useEffect } from "react";
import { useMyOrdersQuery } from "../../redux/api/OrderApi";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/CartSlice";

const MyOrders = () => {
  
  let { data, isLoading, error } = useMyOrdersQuery();
  let [searchParams] = useSearchParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let orderSuccess = searchParams.get("order_success");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (orderSuccess) {
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [error, orderSuccess, navigate, dispatch]);

  let setOrders = () => {
    let orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Amount Paid",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Estimated Delivery Date",
          field: "estimatedDeliveryDate",
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

    data?.order?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        amount: `$${order?.totalAmount}`,
        status: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        estimatedDeliveryDate: order?.estimatedDeliveryDate
          ? new Date(order?.estimatedDeliveryDate).toLocaleString()
          : "N/A",
        actions: (
          <>
            <Link to={`/me/order/${order?._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/invoice/order/${order?._id}`}
              className="btn btn-success ms-2"
            >
              <i className="fa fa-print"></i>
            </Link>
          </>
        ),
      });
    });
    console.log("Orders:", orders);
    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={" My Order"} />
      <div className="my-orders-container">
        <h1 className="my-5" id="yourCArt">
          {data?.order?.length} Orders
        </h1>
        <div className="table-responsive">
          <MDBDataTable
            data={setOrders()}
            className="my-orders-table"
            bordered
            striped
            hover
            id="table"
          />
        </div>
      </div>
    </>
  );
};

export default MyOrders;
