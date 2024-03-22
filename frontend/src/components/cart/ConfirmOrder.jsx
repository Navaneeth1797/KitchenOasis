import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { calculateOrderCost } from "../../helper/Helper";
import CheckOut from "./CheckOut";
import Loader from "../layout/Loader";


const ConfirmOrder = () => {

  let { cartItems, shippingInfo } = useSelector((state) => state.cart);
  let { user } = useSelector((state) => state.auth);
  let { itemsPrice, shippingPrice, taxPrice, totalPrice,isLoading } =
    calculateOrderCost(cartItems);
  
  if (isLoading) return <Loader />;
  
  return (
    <>
      <MetaData title={"confirm Order"} />
      <CheckOut shipping confirmOrder />
      <div className="confirm-order-container">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3" id="shippingInfo">
              Shipping Info
            </h4>
            <p>
              <b id="infoName">Name:</b> {user?.name}
            </p>
            <p>
              <b id="infoid">Phone:</b> {shippingInfo?.phoneNo}
            </p>
            <p className="mb-4" id="infoAdd">
              <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},
              {shippingInfo?.zipCode},{shippingInfo?.country}
            </p>

            <hr />
            <h4 className="mt-4" id="infoCart">
              Your Cart Items:
            </h4>
            {cartItems?.map((item, index) => (
              <div key={index}>
                <hr />
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt="Laptop"
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link
                        to={`/product/${item.product}`}
                        style={{ textDecoration: "none" }}
                        id="infoName"
                      >
                        {item?.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p id="infoQP">
                        {item?.quantity} x ${item?.price} ={" "}
                        <b>${(item?.quantity * item?.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4 id="infoSummery">Order Summary</h4>
              <hr />
              <p id="infoSub">
                Subtotal:{" "}
                <span className="order-summary-values">${itemsPrice}</span>
              </p>
              <p id="infoShip">
                Shipping:{" "}
                <span className="order-summary-values">${shippingPrice}</span>
              </p>
              <p id="infoTax">
                Tax: <span className="order-summary-values">${taxPrice}</span>
              </p>

              <hr />

              <p id="infoTot">
                Total:{" "}
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />

              <Link
                to="/confirmPayment"
                id="checkout_btn"
                className="btn btn-primary w-100"
              >
                Proceed to Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
