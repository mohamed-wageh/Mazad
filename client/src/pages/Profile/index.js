import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import UserBids from "./UserBids";
import { useSelector } from "react-redux";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.users);

  return (
    <div className="profile-container">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="general-info-container">
            <h1 className="text-primary text-2xl justify-between">
              Name: <span className="text-xl text-orange-500">{user.name}</span>
            </h1>
            <h1 className="text-primary text-2xl">
              Email: <span className="text-xl text-orange-500">{user.email}</span>
            </h1>
            <h1 className="text-primary text-2xl">
              Created At:{" "}
              <span className="text-xl text-orange-500">
                {moment(user.createdAt).format("DD-MM-YYYY hh:mm A")}
              </span>
            </h1>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
