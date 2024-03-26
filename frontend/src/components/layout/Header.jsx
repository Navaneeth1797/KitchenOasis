// Import statements for React components and libraries
import React, { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { useGetUserProfileQuery } from "../../redux/api/UserApi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/AuthApi";
import { clearCart } from "../../redux/features/CartSlice";
import Search from "./search";
import { ImAddressBook } from "react-icons/im";
import { ImHome2 } from "react-icons/im";
import { ImImage } from "react-icons/im";

const Header = () => {
  // Hooks and state variables
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { isLoading } = useGetUserProfileQuery();
  let [logout] = useLazyLogoutQuery();
  let { user } = useSelector((state) => state.auth);
  let { cartItems } = useSelector((state) => state.cart);

  // Function to handle logout
  let logoutHandler = async () => {
    try {
    logout();
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
      navigate(0);
    } catch (error) {
      console.error("Unauthorized error:", error);
    }
  };

  // useEffect hook to handle side effects
  useEffect(() => {
   
  }, []);

  // JSX for the header component
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Kitchen Oasis Logo */}
        <a className="navbar-brand" id="imgH" href="/">
          <img
            src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710829435/0dbf5cb2-595e-4bc2-b140-d2abd05b5226_wgc9j0.png"
            alt="Kitchen-Oasis Logo"
            width="120"
          />
        </a>
        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar Content */}
        <div
          className="collapse navbar-collapse justify-content-between align-items-center"
          id="navbarNav"
        >
          {/* Navbar Links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <ImHome2 /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <ImAddressBook /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <ImImage /> Products
              </Link>
            </li>
          </ul>
          {/* Search Component */}
          <Search />
          {/* User and Cart Links */}
          <ul className="navbar-nav flex-row justify-content-md-center align-items-center">
            {/* Cart Link */}
            <li className="nav-item">
              <Link className="nav-link cart-link" to="/cart">
                <BsCart2 className="me-1" /> Cart
                <span className="ms-1" id="cart_count">
                  {cartItems?.length}
                </span>
              </Link>
            </li>
            {/* User Dropdown */}
            &nbsp;
            {user ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link user-link"
                  to="/user"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BiUser className="me-1" /> {user?.name}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {/* Dashboard Link (for admin)  */}
                 {user?.role === "admin" && (
                    <Link className="dropdown-item" to="/admin/dashboard">
                      Dashboard
                    </Link>
                  )} 
                
                  {/* Orders Link */}
                  <Link className="dropdown-item" to="/me/orders">
                    Orders
                  </Link>
                  {/* Profile Link */}
                  <Link className="dropdown-item" to="/my/profile">
                    Profile
                  </Link>
                  {/* Logout Link */}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <Link
                    to="/"
                    style={{ textDecoration: "none" }}
                    onClick={logoutHandler}
                    className="nav-link logout-link"
                  >
                    Logout
                  </Link>
                </ul>
              </li>
            ) : (
              // Login Link
              !isLoading && (
                <Link
                  to="/login"
                  className="nav-link login-link"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
