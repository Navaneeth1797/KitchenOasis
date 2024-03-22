import React, { useEffect, useState } from "react"; // Importing necessary modules from React
import AdminLayout from "../layout/AdminLayout"; // Importing custom AdminLayout component
import DatePicker from "react-datepicker"; // Importing DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Importing DatePicker styles
import SalesChart from "../charts/SalesChart"; // Importing SalesChart component
import { useLazyGetDashBoardSalesQuery } from "../../redux/api/OrderApi"; // Importing custom hook for fetching dashboard sales data
import toast from "react-hot-toast"; // Importing toast notifications library
import Loader from "../layout/Loader"; // Importing Loader component
import MetaData from "../layout/MetaData"; // Importing MetaData component

const Dashboard = () => {
  let [startDate, setStartDate] = useState(new Date().setDate(1)); // State for start date with default value set to the 1st day of the current month
  let [endDate, setEndDate] = useState(new Date()); // State for end date with default value set to the current date

  let [getDashBoardSales, { error, isLoading, data }] = // Destructuring hook result into variables
    useLazyGetDashBoardSalesQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message); // Display error message using toast notification if there's an error
    }
    if (startDate && endDate && !data) {
      getDashBoardSales({
        startDate: new Date(startDate).toISOString(), // Convert start date to ISO string format
        endDate: endDate.toISOString(), // Convert end date to ISO string format
      });
    }
  }, [error, startDate, endDate, getDashBoardSales, data]); // Dependency array for useEffect hook

  let submitHandler = () => {
    getDashBoardSales({
      startDate: new Date(startDate).toISOString(), // Convert start date to ISO string format
      endDate: endDate.toISOString(), // Convert end date to ISO string format
    });
  };

  if (isLoading) return <Loader />; /// Render Loader component while data is loading
  return (
    <>
      <AdminLayout>
        {" "}
        {/* Render AdminLayout component */}
        <MetaData title={"Dashboard"} />{" "}
        {/* Render MetaData component with title prop */}
        <div className="container">
          {" "}
          {/* Container for main content */}
          <div className="row justify-content-start align-items-center mt-5">
            {" "}
            {/* Row for date picker */}
            <div className="col-md-4 col-lg-3 mb-3 ">
              <label className="form-label d-block" id="strtDate">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="form-control"
              />
            </div>
            <div className="col-md-4 col-lg-3 mb-3">
              <label className="form-label d-block" id="endDate">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="form-control"
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <button
                className="btn fetch-btn mt-3 px-5"
                onClick={submitHandler}
                id="fetch"
              >
                Fetch
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          {" "}
          {/* Container for sales and orders cards */}
          <div className="row pr-md-4 my-5">
            <div className="col-xl-6 col-md-12 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Sales
                    <br />
                    <b>${data?.totalSales?.toFixed(2)}</b>{" "}
                    {/* Display total sales amount */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders
                    <br />
                    <b>{data?.totalNumOrders}</b>{" "}
                    {/* Display total number of orders */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SalesChart salesData={data?.sales} />{" "}
        {/* Render SalesChart component with sales data */}
        <div className="mb-5"></div> {/* Empty div for spacing */}
      </AdminLayout>
    </>
  );
};

export default Dashboard; // Export Dashboard component as default
