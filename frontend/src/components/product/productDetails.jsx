import React, { useState, useEffect } from "react";
import { useGetProductsByIdQuery } from "../../redux/api/ProductsApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/features/CartSlice";
import Reviews from "../reviews/reviews";
import ListReviews from "../reviews/listReviews";
import NoFound from "../layout/NoFound";

const GetProductsById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");
  const { data, isLoading, error, isError } = useGetProductsByIdQuery(id);
  const product = data?.product;
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    setActiveImg(
      product?.images[0] ? product.images[0]?.url : "../images/logo.png"
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error?.data?.message]);

  const increaseQuantity = () => {
    if (quantity < product?.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const setItemCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };
    dispatch(setCartItem(cartItem));
    toast.success("Item added to cart");
  };

  if (isLoading) return <Loader />;

  if (error && error?.status === 404) {
    return <NoFound />;
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <div className="p-3">
            <img
              className="d-block w-100"
              src={activeImg}
              alt={product?.name}
              width="340"
              height="390"
            />
          </div>
          <div className="row justify-content-center mt-5">
            {product?.images?.map((img, index) => (
              <div key={index} className="col-2 ms-4 mt-3">
                {" "}
                <button type="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer ${
                      img.url === activeImg ? "border-warning" : ""
                    }`}
                    height="100"
                    width="100"
                    src={img?.url}
                    alt={img?.url}
                    onClick={(e) => setActiveImg(img.url)}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <div className="text-center">
            <h3 className="proName">{product?.name}</h3>
            &nbsp;
            <p className="prodId" id="product_id">
              Product # {product?._id}
            </p>
            <StarRatings
              rating={product?.ratings}
              starRatedColor="yellow"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="1px"
            
            />
            <span id="no-of-reviews" className="pt-1 ps-2">
              {" "}
              ({product?.numOFReviews} Reviews){" "}
            </span>
            &nbsp;
            <p id="product_price">${product?.price}</p>
            &nbsp;
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQuantity}>
                -
              </span>
              <input
                type="number"
                className="form-control count d-inline"
                value={quantity}
                readOnly
                style={{ width: "80px" }}
               
              />
              <span className="btn btn-primary plus" onClick={increaseQuantity}>
                +
              </span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ms-4"
              disabled={product?.stock <= 0}
              onClick={setItemCart}
              style={{ marginLeft: "10px" }} // Add margin to the button
            >
              Add to Cart
            </button>
            &nbsp; &nbsp;
            <hr />
            <p id="proStatus">
              Status:{" "}
              <span
                id="stock_status"
                className={product?.stock > 0 ? "greenColor" : "redColor"}
              >
                {product?.stock > 0 ? "In Stock" : "Out Of Stock"}
              </span>
            </p>
            &nbsp;
            <h4 id="proDes" className="mt-4">
              Description:
            </h4>{" "}
            <p className="paraDesc">{product?.description}</p>
            &nbsp;
            {isAuthenticated ? (
              <Reviews productId={product?._id} />
            ) : (
              <div className="alert alert-danger my-5" role="alert" id="proRev">
                Login to post your review.
              </div>
            )}
          </div>
        </div>
        {product?.reviews?.length > 0 && (
          <ListReviews reviews={product?.reviews} />
        )}
      </div>
    </>
  );
};

export default GetProductsById;
