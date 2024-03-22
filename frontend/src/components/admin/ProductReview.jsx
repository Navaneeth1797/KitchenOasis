import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout';
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDeleteProductsReviewMutation, useLazyGetProductsReviewQuery } from '../../redux/api/ProductsApi';

const ProductReview = () => {
    let [productId, setProductId] = useState("");

    let [getProductsReview, { data, isLoading, error }] = useLazyGetProductsReviewQuery()
    
    let [deleteProductsReview,{error:DeleteError,isLoading: isDeleteLoading , isSuccess}] = useDeleteProductsReviewMutation()

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (DeleteError) {
      toast.error(DeleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success( "Review Deleted");
    }
  }, [error,DeleteError,isSuccess]);
    
     let sumbitHandler = (e) => {
         e.preventDefault();
         getProductsReview(productId)
     };

  let deleteReviewHander = (id) => {
    deleteProductsReview({productId,id});
  };

  let setReviews = () => {
    let Reviews = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
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
    data?.reviews?.forEach((review) => {
      Reviews.rows.push({
        id: review?._id,
        rating: review?.rating,
        comment: review?.comment,
        user: review?.user?.name,
        actions: (
          <>
            <button
              className="btn btn-outline-success ms-2"
              onClick={() => deleteReviewHander(review?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return Reviews;
  };
  if (isLoading) return <Loader />;

    return (
      <>
        <AdminLayout>
          <MetaData title={"Product Details"} />
          <div className="row justify-content-center my-5">
            <div className="col-6">
              <form onSubmit={sumbitHandler}>
                <div className="mb-3">
                  <label
                    htmlFor="productId_field"
                    className="form-label"
                    id="newSeller"
                  >
                    Enter Product ID
                  </label>
                  <input
                    type="text"
                    id="productId_field"
                    className="form-control"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>

                <button
                  id="createBtn"
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                >
                  SEARCH
                </button>
              </form>
            </div>
          </div>
          <div className="table-responsive">
            {data?.reviews?.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
                id="table"
              />
            ) : (
              <p className="mt-5 text-center">No Reviews</p>
            )}
          </div>
        </AdminLayout>
      </>
    );
}

export default ProductReview

