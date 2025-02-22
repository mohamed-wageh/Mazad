import { Modal, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DeleteNotification } from "../apiCalls/notifications";
import moment from "moment";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loaderSlice";
function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const dispatch = useDispatch();
  const deleteNotification = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setShowNotifications(false)
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const navigate = useNavigate();
  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            className="flex flex-col border border-solid p-2 border-gray-300 rounded"
            key={notification._id}
          >
            <div className="flex justify-between items-center ">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
                className="cursor-pointer"
              >
                <h1 className="text-gray-700">{notification.title}</h1>
                <span className="text-gray-600">{notification.message}</span>
                <h1 className="text-gray-500 text-sm">
                  {moment(notification.createdAt).fromNow()}
                </h1>
              </div>
              <i
                className="ri-delete-bin-6-line cursor-pointer"
                onClick={() => {
                  deleteNotification(notification._id);
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
