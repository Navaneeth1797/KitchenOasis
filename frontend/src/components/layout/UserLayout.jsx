import React from 'react'
import SideBarMenu from './SideBarMenu';

const UserLayout = ({ children }) => {
  
  let menuItems = [
    {
      name: "Profile",
      url: "/my/profile",
      icon: "fas fa-user",
    },
    {
      name: "Update Profile",
      url: "/profile/update",
      icon: "fas fa-user",
    },
    {
      name: "Update Password",
      url: "/password/update",
      icon: "fas fa-lock",
    },
  ];

  return (
    <div>
      <div className="mt-2 mb4 py4">
        <h2 className=" text-center fw-bolder" id="infoSummery">
          User Setting
        </h2>
      </div>
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3" id="newNam">
            <SideBarMenu menuItems={menuItems} />
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout