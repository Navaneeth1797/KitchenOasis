import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useDeleteProductImagesMutation,
  useGetProductsByIdQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/ProductsApi";
import MetaData from "../layout/MetaData";

const UploadImages = () => {
  let fileInputref = useRef(null);
  let params = useParams();
  let navigate = useNavigate();
  let [images, setImages] = useState([]);
  let [imagesPreview, setImagesPreview] = useState([]);
  let [uploadedImages, setUploadedImages] = useState([]);
  let { data } = useGetProductsByIdQuery(params?.id);
  let [uploadedProductImages, { error, isSuccess, isLoading }] =
    useUploadProductImagesMutation();
  let [
    deleteProductImages,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImagesMutation();

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      setImagesPreview([]);
      toast.success("Images uploaded successfully");
      navigate("/admin/products");
    }
  }, [data, error, isSuccess, deleteError, navigate]);

  let onChange = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      let reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  let handleResetFileInput = () => {
    if (fileInputref.current) {
      fileInputref.current.value = "";
    }
  };

  let handleImageDelete = (image) => {
    let filteredImagesPreview = imagesPreview.filter((img) => img !== image);
    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };

  let submitHandler = (e) => {
    e.preventDefault();
    uploadedProductImages({ id: params?.id, body: { images } });
  };

  let deleteImage = (public_id) => {
    deleteProductImages({ id: params?.id, body: { imgId: public_id } });
  };

  return (
    <AdminLayout>
      <MetaData title={"Upload product image"} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-body">
                <form
                  className="rounded bg-body"
                  encType="multipart/form-data"
                  onSubmit={submitHandler}
                >
                  <h2 className="mb-4" id="updateP">
                    Upload Product Images
                  </h2>
                  <div className="mb-3">
                    <label
                      htmlFor="customFile"
                      className="form-label"
                      id="newNam"
                    >
                      Choose Images
                    </label>
                    <div className="custom-file">
                      <input
                        ref={fileInputref}
                        type="file"
                        name="product_images"
                        className="form-control"
                        id="customFile"
                        multiple
                        onChange={onChange}
                        onClick={handleResetFileInput}
                      />
                    </div>
                    {imagesPreview?.length > 0 && (
                      <div className="new-images my-4">
                        <p className="text-warning" id="newNam">
                          New Images:
                        </p>
                        <div className="row mt-4">
                          {imagesPreview?.map((img, index) => (
                            <div key={index} className="col-md-3 mt-2">
                              <div className="card">
                                <img
                                  src={img}
                                  alt="Card"
                                  className="card-img-top p-2"
                                  style={{ width: "100%", height: "80px" }}
                                />
                                <button
                                  style={{
                                    backgroundColor: "#dc3545",
                                    borderColor: "#dc3545",
                                  }}
                                  type="button"
                                  className="btn btn-block btn-danger cross-button mt-1 py-0"
                                  onClick={() => handleImageDelete(img)}
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {uploadedImages?.length > 0 && (
                      <div className="uploaded-images my-4">
                        <p className="text-success" id="newNam">
                          Product Uploaded Images:
                        </p>
                        <div className="row mt-1">
                          {uploadedImages?.map((img) => (
                            <div key={img.public_id} className="col-md-3 mt-2">
                              <div className="card">
                                <img
                                  src={img?.url}
                                  alt="Card"
                                  className="card-img-top p-2"
                                  style={{ width: "100%", height: "80px" }}
                                />
                                <button
                                  style={{
                                    backgroundColor: "#dc3545",
                                    borderColor: "#dc3545",
                                  }}
                                  className="btn btn-block btn-danger cross-button mt-1 py-0"
                                  disabled={isLoading || isDeleteLoading}
                                  type="button"
                                  onClick={() => deleteImage(img?.public_id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    id="createBtn"
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={isLoading || isDeleteLoading}
                  >
                    {isLoading ? "Uploading..." : "UPLOAD"}
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

export default UploadImages;
