import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import toast from "react-hot-toast";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductsByIdQuery,
  useUpdateProductsByIdMutation,
} from "../../redux/api/ProductsApi";
import { PRODUCT_CATEGORIES } from "../../constants/constants";

const UpdateProduct = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
  });
  let { name, description, price, category, stock, seller } = product;
  let [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductsByIdMutation();
  let { data } = useGetProductsByIdQuery(params?.id);


  useEffect(() => {
    if (data && data.product) {
      const { name, description, price, category, stock, seller } =
        data.product;
      setProduct({
        name: name || "",
        description: description || "",
        price: price || "",
        category: category || "",
        stock: stock || "",
        seller: seller || "",
      });
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product updated successfully");
      navigate("/admin/products");
    }
  }, [data, error, isSuccess, navigate]);

  let onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  let submitHandler = (e) => {
    e.preventDefault();
    updateProduct({ id: params?.id, body: product });
  };

  return (
    <AdminLayout>
      <MetaData title={"Update product"} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <h2 className="mb-4" id="updateP">
                    Update Product
                  </h2>
                  <div className="mb-3">
                    <label
                      htmlFor="name_field"
                      className="form-label"
                      id="newNam"
                    >
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
                      <label
                        htmlFor="price_field"
                        className="form-label"
                        id="newPr"
                      >
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
                    className="btn btn-primary w-100 py-2"
                    disabled={isLoading}
                    id="createBtn"
                  >
                    {isLoading ? "Updating..." : "UPDATE"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
