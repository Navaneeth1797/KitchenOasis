import React, { useEffect } from "react";
import "./Invoice.css";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsByIdQuery } from "../../redux/api/OrderApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import html2canvas from "html2canvas";
import {jsPDF} from  "jspdf"

const Invoice = () => {
  let params = useParams();
  let { data, isLoading, error } = useGetOrderDetailsByIdQuery(params?.id);
  let order = data?.order || {};
  let {
    shippingInfos,
    orderItems,
    paymentInfo,
    user,
    
  } = order;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  let handleDownload = () => {
    let input = document.getElementById("order_invoice")
    html2canvas(input).then((canvas) => {
      let imgData = canvas.toDataURL("image/png")
      let pdf = new jsPDF()
      let pdfWidth = pdf.internal.pageSize.getWidth()
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0)
      pdf.save(`invoice_${order?._id}.pdf`)
    })
  }

  if (isLoading) return <Loader />;
  
  return (
    <>
      <MetaData title={"Order Invocie"} />
      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          <button className="btn btn-success col-md-5" onClick={handleDownload}>
            <i className="fa fa-print"></i> Download Invoice
          </button>
        </div>
        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <div id="logo">
              <img
                src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710829435/0dbf5cb2-595e-4bc2-b140-d2abd05b5226_wgc9j0.png"
                alt="Company Logo"
              />
            </div>
            <h1 id="listP">INVOICE {order?._id}</h1>
            <div id="company" className="clearfix">
              <div id="newNam">Kitchen Oasis</div>
              <div id="newNam">
                321 , yellow down river,
                <br />
                tripi, Chennai, TamilNadu,India,600877
              </div>
              <div id="newNam">(+91)7836245378322</div>
              <div id="newNam">
                <a href="mailto:team@KitchenOasis">team@KitchenOasis.com</a>
              </div>
            </div>
            <div id="newNam">
              <div>
                <span>Name</span> {user?.name}
              </div>
              <div>
                <span>EMAIL</span> {user?.email}
              </div>
              <div>
                <span>PHONE</span> {shippingInfos?.phoneNo}
              </div>
              <div>
                <span>ADDRESS</span> {shippingInfos?.address},{" "}
                {shippingInfos?.city},{shippingInfos?.zipCode},
                {shippingInfos?.country}
              </div>
              <div>
                <span>DATE</span>{" "}
                {new Date(order?.createdAt).toLocaleString("en-US")}
              </div>
              <div>
                <span>Status</span>
                {paymentInfo?.status}
              </div>
            </div>
          </header>
          <main className="table-responsive" id="newNam">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th className="service">ID</th>
                  <th className="desc">NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item) => (
                  <tr key={item.product}>
                    <td className="service">{item?.product}</td>
                    <td className="desc">{item?.name}</td>
                    <td className="unit">${item?.price}</td>
                    <td className="qty">{item?.quantity}</td>
                    <td className="total">${item?.price * item?.quantity}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="4">
                    <b>SUBTOTAL</b>
                  </td>
                  <td className="total">${order?.itemsPrice}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>TAX 20%</b>
                  </td>
                  <td className="total">${order?.taxAmount}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>SHIPPING</b>
                  </td>
                  <td className="total">${order?.shippingAmount}</td>
                </tr>

                <tr>
                  <td colSpan="4" className="grand total">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className="grand total">${order?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </main>

          <div id="notices" className="mt-4">
            <div className="row">
              <div className="col">
                <div>
                  <b>NOTICE:</b>
                </div>
                <div className="notice" id="newNam">
                  A finance charge of 1.5% will be made on unpaid balances after
                  30 days.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
