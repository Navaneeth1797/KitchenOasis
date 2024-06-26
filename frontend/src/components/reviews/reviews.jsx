import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { useCanUserReviewQuery, useSubmitReviewMutation } from "../../redux/api/ProductsApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";

const Reviews = ({ productId }) => {
  
  let [rating, setRating] = useState(0);
    let [comment, setComment] = useState("");
    let [submitReview, { isLoading, error, isSuccess }] =
        useSubmitReviewMutation();
    let { data } = useCanUserReviewQuery(productId);
  let canReview = data?.canReview;
  
     useEffect(() => {
       if (error) {
         toast.error(error?.data?.message);
         }
         if (isSuccess) {
             toast.success("Thank you for your valubale review")
         }
     }, [error, isSuccess]);
  
  let submitHandler = () => {
      let reviewData = { rating, comment, productId }
      submitReview(reviewData)
  };

  if (isLoading) return <Loader />;
  
  return (
      <div>
          {canReview && (
              <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-bs-toggle="modal"
                  data-bs-target="#ratingModal"
              >
                  Submit Your Review
              </button>
         ) }
      <div className="row mt-2 mb-5">
        <div className="rating w-50">
          <div
            className="modal fade"
            id="ratingModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="ratingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <StarRatings
                    rating={rating}
                    starRatedColor="blue"
                    numberOfStars={5}
                    changeRating={(e) => setRating(e)}
                  />
                  <textarea
                    name="review"
                    id="review"
                    className="form-control mt-4"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>

                  <button
                    id="new_review_btn"
                    className="btn w-100 my-4 px-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
