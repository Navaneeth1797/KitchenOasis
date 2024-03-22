import React from 'react'
import MetaData from "../layout/MetaData"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCartItem,removeItem, } from '../../redux/features/CartSlice'

const Cart = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    if (newQuantity <= item.stock) {
      const updatedItem = { ...item, quantity: newQuantity };
      dispatch(setCartItem(updatedItem));
    }
  };

  const decreaseQuantity = (item) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      const updatedItem = { ...item, quantity: newQuantity };
      dispatch(setCartItem(updatedItem));
    }
  };

  const removeItemHandler = (id) => {
   dispatch(removeItem(id))
  };
  let checkoutHandler = () => {
    
    navigate("/shipping");
  }

  return (
    <>
      <MetaData title={"Your Cart"} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {cartItems.length === 0 ? (
              <h2 className="mt-5" id="yourCArt">
                Your Cart: <b id="boldCart">Your cart is empty</b>
              </h2>
            ) : (
              <>
                <h2 className="mt-5" id="yourCArt">
                  Your Cart: <b id="boldCart">{cartItems.length} items</b>
                </h2>
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="cart-item my-4"
                    data-key={item.product}
                  >
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`} style={{textDecoration: "none"}} id='cartName'>
                          {item.name}
                        </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decreaseQuantity(item)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="btn btn-primary plus"
                            onClick={() => increaseQuantity(item)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeItemHandler(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-12 col-lg-3 my-4">
                  <div id="order_summary">
                    <h4 id='cartOrder'>Order Summary</h4>
                    <hr />
                    <p id='cartUnits'>
                      Units:{" "}
                      <span className="order-summary-values">
                        {cartItems?.reduce(
                          (acc, item) => acc + item?.quantity,
                          0
                        )}{" "}
                        (Units)
                      </span>
                    </p>
                    <p id='cartEst'>
                      Est. total:{" "}
                      <span className="order-summary-values">
                        $
                        {cartItems
                          ?.reduce(
                            (acc, item) => acc + item?.quantity * item.price,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </p>
                    <hr />
                    <button
                      id="checkout_btn"
                      className="btn btn-primary w-100"
                      onClick={checkoutHandler}
                    >
                      Check out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart