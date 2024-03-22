import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import CheckOut from "./CheckOut";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helper/Helper";
import {
  useNewOrderMutation,
  useStripeChekoutSessionMutation,
} from "../../redux/api/OrderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";

const ConfirmPayment = () => {

  let [method, setMethod] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  let navigate = useNavigate();
  let { shippingInfo, cartItems } = useSelector((state) => state.cart);
  let [newOrder, { error, isSuccess }] = useNewOrderMutation();
  let [
    stripeChekoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeChekoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      window.location.href = checkoutData?.url;
    }
    if (checkoutError) {
      toast.error(checkoutError?.data?.message);
    }
  }, [checkoutData, checkoutError]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess, navigate]);

  let submitHandler = (e) => {
    e.preventDefault();
    let { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculateOrderCost(cartItems);
    setPaymentCompleted(true);
    setTimeout(() => {
      if (method === "COD") {
        //create COD Order
        let orderData = {
          shippingInfos: shippingInfo,
          orderItems: cartItems,
          itemsPrice,
          shippingAmount: shippingPrice,
          taxAmount: taxPrice,
          totalAmount: totalPrice,
          paymentInfo: {
            status: "Not Paid",
          },
          paymentMethods: "COD",
        };
        newOrder(orderData);
      }

      if (method === "Card") {
        let orderData = {
          shippingInfos: shippingInfo,
          orderItems: cartItems,
          itemsPrice,
          shippingAmount: shippingPrice,
          taxAmount: taxPrice,
          totalAmount: totalPrice,
        };
        stripeChekoutSession(orderData);
      }
    }, 1000);
  };

  if (isLoading) return <Loader />;
  
  return (
    <>
      <MetaData title={"Payment Details"} />
      <CheckOut shipping cofirmOrder confirmPayment />
      <div
        className={`payment-container ${paymentCompleted ? "completed" : ""}`}
      >
        <div className="row wrapper mb-5 justify-content-center mt-4">
          <div className="col-10 col-lg-5">
            <form
              className="shadow rounded bg-body text-center"
              onSubmit={submitHandler}
            >
              <h2 className="mb-4" id="payment">
                Select Payment Method
              </h2>

              <div className="form-check">
                <div className="d-flex justify-content-center align-items-center">
                  <input
                    className="form-check-input border border-black"
                    type="radio"
                    name="payment_mode"
                    id="codradio"
                    value="COD"
                    onChange={(e) => setMethod("COD")}
                  />
                  &nbsp;
                  <label
                    className="form-check-label"
                    id="cod"
                    htmlFor="codradio"
                  >
                    Cash on Delivery
                  </label>
                </div>
              </div>
              <div className="form-check">
                <div className="d-flex justify-content-center align-items-center">
                  <input
                    className="form-check-input border border-black"
                    type="radio"
                    name="payment_mode"
                    id="cardradio"
                    value="Card"
                    onChange={(e) => setMethod("Card")}
                  />
                  &nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="cardradio"
                    id="card"
                  >
                    Card - VISA, MasterCard
                  </label>
                </div>
              </div>

              <button
                id="shipping_btn"
                type="submit"
                className="btn py-2 w-100"
                disabled={isLoading}
                style={{
                  marginTop: "2%",
                }}
              >
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPayment;
