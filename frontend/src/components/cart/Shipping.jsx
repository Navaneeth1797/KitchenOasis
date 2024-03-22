import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/CartSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckOut from "./CheckOut";
import Loader from "../layout/Loader";


const Shipping = () => {

  let countriesList = Object.values(countries);
  const [shippingCompleted, setShippingCompleted] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();
  let [address, setAddress] = useState("");
  let [city, setCity] = useState("");
  let [zipCode, setZipCode] = useState("");
  let [phoneNo, setPhoneNo] = useState("");
    let [country, setCountry] = useState("");
  let { shippingInfo, isLoading } = useSelector((state) => state.cart)
  
    useEffect(() => {
        if (shippingInfo) {
            setAddress(shippingInfo?.address);
            setCity(shippingInfo?.city);
            setZipCode(shippingInfo?.zipCode);
            setPhoneNo(shippingInfo?.phoneNo); 
            setCountry(shippingInfo?.country)
      }  
    }, [shippingInfo])
  
  let submitHandler = (e) => {
      e.preventDefault();
    dispatch(saveShippingInfo({ address, city, phoneNo, zipCode, country }))
    setShippingCompleted(true);
    setTimeout(() => {
      navigate("/confirmOrder");
    }, 1000);
  };

  if (isLoading) return <Loader />;
  
  return (
    <>
      <MetaData title={"shipping Info"} />
      <CheckOut shipping />
      <div
        className={`shipping-container ${shippingCompleted ? "completed" : ""}`}
      >
        <div className="row wrapper mb-5 justify-content-center mt-4">
          <div className="col-10 col-lg-5">
            <form className="shadow rounded bg-body" onSubmit={submitHandler}>
              <h2 className="mb-4" id="shippingInfo">Shipping Info</h2>
              <div className="mb-3">
                <label htmlFor="address_field" className="form-label" id="shipAdd">
                  Address
                </label>
                <input
                  type="text"
                  id="address_field"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="city_field" className="form-label" id="shipCity">
                  City
                </label>
                <input
                  type="text"
                  id="city_field"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone_field" className="form-label" id="shipPhone">
                  Phone No
                </label>
                <input
                  type="tel"
                  id="phone_field"
                  className="form-control"
                  name="phoneNo"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="zip_code_field" className="form-label" id="shipZip">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip_code_field"
                  className="form-control"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="country_field" className="form-label" id="shipCOun">
                  Country
                </label>
                <select
                  id="country_field"
                  className="form-select"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="">Select Country</option>
                  {countriesList?.map((country) => (
                    <option key={country?.name} value={country?.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                id="shipping_btn"
                type="submit"
                className="btn w-100 py-2"
              >
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
