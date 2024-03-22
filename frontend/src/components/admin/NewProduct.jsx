import React, { useEffect, useState } from "react"; // Importing necessary modules from React
import AdminLayout from "../layout/AdminLayout"; // Importing custom AdminLayout component
import toast from "react-hot-toast"; // Importing toast notifications library
import MetaData from "../layout/MetaData"; // Importing MetaData component
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import { useNewProductMutation } from "../../redux/api/ProductsApi"; // Importing custom hook for creating new product
import { PRODUCT_CATEGORIES } from "../../constants/constants"; // Importing product categories constant
import styled from "styled-components"; // Importing styled-components library

// Styled-components for styling
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const CardContainer = styled.div`
  width: 80%;
  max-width: 600px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NewProduct = () => {
  let navigate = useNavigate(); // Initializing navigate function from useNavigate hook
  let [product, setProduct] = useState({
    // Initializing state for product details
    name: "",
    description: "",
    price: "",
    category: "",
    stock: 0,
    seller: "",
  });
  let { name, description, price, category, stock, seller } = product; // Destructuring product state
  let [createProduct, { isLoading, error, isSuccess }] =
    useNewProductMutation(); // Initializing createProduct mutation

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message); // Display error message using toast notification if there's an error
    }
    if (isSuccess) {
      toast.success("Product created successfully"); // Display success message using toast notification if product is created successfully
      navigate("/admin/products"); // Redirect to products page after successful creation
    }
  }, [error, isSuccess, navigate]); // Dependency array for useEffect hook

  let onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value }); // Function to handle input changes and update product state
  };

  let submitHandler = (e) => {
    e.preventDefault();
    createProduct(product); // Function to handle form submission and create new product
  };

  return (
    <AdminLayout>
      {" "}
      {/* Render AdminLayout component */}
      <MetaData title={"Create new product"} />{" "}
      {/* Render MetaData component with title prop */}
      <CenteredContainer>
        <CardContainer>
          <form onSubmit={submitHandler}>
            <h2 className="mb-4" id="newP">
              New Product
            </h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label" id="newNam">
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="description_field"
                className="form-label"
                id="newDes"
              >
                Description
              </label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label" id="newPr">
                  Price
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3 col">
                <label
                  htmlFor="stock_field"
                  className="form-label"
                  id="newStoc"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label
                  htmlFor="category_field"
                  className="form-label"
                  id="newCat"
                >
                  Category
                </label>
                <select
                  className="form-select"
                  id="category_field"
                  name="category"
                  value={category}
                  onChange={onChange}
                >
                  {PRODUCT_CATEGORIES?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col">
                <label
                  htmlFor="seller_field"
                  className="form-label"
                  id="newSeller"
                >
                  Seller Name
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="seller"
                  value={seller}
                  onChange={onChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
              id="createBtn"
            >
              {isLoading ? "Creating new product..." : "CREATE"}
            </button>
          </form>
        </CardContainer>
      </CenteredContainer>
    </AdminLayout>
  );
};

export default NewProduct; // Export NewProduct component as default
