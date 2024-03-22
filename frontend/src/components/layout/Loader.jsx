import React from "react";

const Loader = () => {
  return (
    <div className="preloader">
      <img
        className="cart"
        src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710558013/original-27f29cc8cf3843454340ffa980be35f5_rk4zp2.gif"
        alt="Cart Loader"
      />
      <div className="preloader__text">
        <p className="preloader__msg">Bringing you the goods…</p>
        <p className="preloader__msg preloader__msg--last">
          This is taking long. Something’s wrong.
        </p>
      </div>
    </div>
  );
};

export default Loader;
