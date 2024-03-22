import React from "react";
import StarRatings from "react-star-ratings";

const ListReviews = ({ reviews }) => {
  
  return (
    <div className="reviews container">
      <div className="text-center">
        <h3 id="otherRev">Other's Reviews:</h3>
        <hr />
        {reviews?.map((review) => (
          <div key={review._id} className="review-card my-3">
            <div className="row">
              <div className="col-2 col-md-1">
                <img
                  src=""
                  alt="User Name"
                  width="50"
                  height="50"
                  className="rounded-circle"
                />
              </div>
              <div className="col-10 col-md-11">
                <div className="star-ratings">
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="blue"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="1px"
                  />
                </div>
                <p className="review_user">by {review.user?.name}</p>
                <p className="review_comment">{review.comment}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListReviews;
