import React, { useEffect } from "react"; // Importing necessary modules from React
import Loader from "../layout/Loader"; // Importing Loader component
import toast from "react-hot-toast"; // Importing toast notifications library
import { MDBDataTable } from "mdbreact"; // Importing MDBDataTable component
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import MetaData from "../layout/MetaData"; // Importing MetaData component

import {
  // Importing custom hooks for fetching admin products and deleting products
  useDeleteProductsByIdMutation,
  useGetAdminProductsQuery,
} from "../../redux/api/ProductsApi";
import AdminLayout from "../layout/AdminLayout"; // Importing custom AdminLayout component

const ListProducts = () => {
  let { data, isLoading, error } = useGetAdminProductsQuery(); // Destructuring hook result into variables

  let [
    deleteProductsById,
    { isLoading: isDeleteLoading, error: DeleteError, isSuccess },
  ] = useDeleteProductsByIdMutation(); // Destructuring deleteProductsById mutation result into variables

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message); // Display error message using toast notification if there's an error
    }
    if (DeleteError) {
      toast.error(DeleteError?.data?.message); // Display delete error message using toast notification if there's an error
    }
    if (isSuccess) {
      toast.success("Product Deleted"); // Display success message using toast notification if product is deleted successfully
    }
  }, [error, DeleteError, isSuccess]); // Dependency array for useEffect hook

  let deleteProductHander = (id) => {
    deleteProductsById(id); // Function to delete product by ID
  };

  let setProducts = () => {
    let Products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
          width: 150,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
          width: 150,
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
          width: 200,
        },
      ],
      rows: [],
    };
    data?.product?.forEach((products) => {
      Products.rows.push({
        id: products?._id,
        name: `${products?.name?.substring(0, 20)}...`, // Truncate product name if too long
        stock: products?.stock,
        actions: (
          <>
            <Link
              to={`/admin/product/${products?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>{" "}
              {/* Pencil icon for editing product */}
            </Link>
            <Link
              to={`/admin/products/${products?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>{" "}
              {/* Image icon for uploading images */}
            </Link>
            <button
              className="btn btn-outline-success ms-2"
              onClick={() => deleteProductHander(products?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>{" "}
              {/* Trash icon for deleting product */}
            </button>
          </>
        ),
      });
    });

    return Products;
  };
  if (isLoading) return <Loader />; // Render Loader component while data is loading
  return (
    <>
      <AdminLayout>
        {" "}
        {/* Render AdminLayout component */}
        <MetaData title={"All Products"} />{" "}
        {/* Render MetaData component with title prop */}
        <div>
          <h1 className="my-5" id="listP">
            {data?.product?.length} Products
          </h1>{" "}
          {/* Render number of products */}
          <MDBDataTable
            responsive
            data={setProducts()} // Pass formatted product data to MDBDataTable
            className="px-3"
            bordered
            striped
            hover
            id="table"
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default ListProducts; // Export ListProducts component as default
