import React from "react";
import SideBarMenu from "./SideBarMenu";

const AdminLayout = ({ children }) => {
  
    let menuItems = [
      {
        name: "Dashboard",
        url: "/admin/Dashboard",
        icon: "fas fa-tachometer-alt",
      },
      {
        name: "New Product",
        url: "/admin/product/new",
        icon: "fas fa-plus",
      },
      {
        name: "Products",
        url: "/admin/products",
        icon: "fab fa-product-hunt",
      },
      {
        name: "Order",
        url: "/admin/orders",
        icon: "fas fa-receipt",
      },
      {
        name: "Users",
        url: "/admin/users",
        icon: "fa fa-user",
      },
      {
        name: "Reviews",
        url: "/admin/reviews",
        icon: "fa fa-star",
      },
    ];
  return (
    <div>
      <div className="mt-2 mb4 py4">
        <h2 className=" text-center fw-bolder" id="adminD">Admin Dashboard</h2>
      </div>
      
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3" id="adminL">
            <SideBarMenu  menuItems={menuItems} />
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
 
  );
};

export default AdminLayout;
