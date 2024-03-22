import React from 'react'
import UserLayout from '../layout/UserLayout'
import { useSelector } from 'react-redux'
import { FaRegEnvelope, FaIdBadge, FaHandshake } from "react-icons/fa";
import MetaData from '../layout/MetaData';

const Profile = () => {

  let { user } = useSelector((state) => state.auth);
  
    return (
      <UserLayout>
        <MetaData title={"User Profile"} />
        <div className="row justify-content-around mt-5 user-info">
          <div className="col-12 col-md-5">
            <h4 id="updateP">
              <FaIdBadge />
              Full Name
            </h4>
            <p id="shipping_btn1">{user?.name}</p>
            <h4 id="updateP">
              <FaRegEnvelope />
              Email Address
            </h4>
            <p id="shipping_btn1">{user?.email}</p>

            <h4 id="updateP">
              <FaHandshake />
              Joined On
            </h4>
            <p id="shipping_btn1">{user?.createdAt?.substring(0, 10)}</p>
          </div>
        </div>
      </UserLayout>
    );
}

export default Profile