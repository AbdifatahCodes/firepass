import "~styles/layout.css";
import "~styles/vault/view-login-item.css"
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TabsHeader from "~components/TabsHeader";
import SectionsHeader from "~components/SectionsHeader";
import NotificationComponent from "~components/Notification";
import { FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from 'react-icons/fa';
import { IoCopy } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { RxExternalLink } from "react-icons/rx";
import { useNotification } from "~contexts/NotificationContext";

const ViewLoginItem = () => {
  // let loginItemData = {
  //   domain: "google.com",
  //   username: "googler",
  //   password: "hell",
  //   uri: "https://google.com",
  //   creationDate: "lkdfjd",
  //   revisionDate: "ldjkd",
  // }
  // const location = useLocation();
  // loginItemData = location.state.loginItemData;
  const location = useLocation();
  const { loginItemData } = location.state || {};
  const [ viewRawPassword, setViewRawPassword ] = useState(false);

  const { notify } = useNotification();

  const handleCopy = async (data) => {
    try {
      await navigator.clipboard.writeText(data);
      console.log('Data copied to clipboard');
      notify({ message: 'Copied to clipboard!', type: 'success' });
      // Optionally, you can display a message to the user indicating success.
    } catch (err) {
      console.error('Failed to copy data to clipboard', err);
      // Optionally, handle the error case, perhaps by displaying a message to the user.
    }
  };

  return (
    <div className="main view-login-item">
      <TabsHeader isTitle={true} titleName="View item" prefix="Close" suffix="Edit" />
      <div className="content">
        <SectionsHeader title="Item Information" />
        <div className="view-login-item-field">
          <div className="text-content">
            <label>Name</label>
            <p>{loginItemData.domain}</p>
          </div>
        </div>
        <div className="view-login-item-field">
          <div className="text-content">
            <label>Username</label>
            <p>{loginItemData.username}</p>
          </div>
          <div className="actions">
            <MdContentCopy className="icon" size={22} onClick={() => handleCopy(loginItemData.username)} />
          </div>
        </div>
        <div className="view-login-item-field">
          <div className="text-content">
            <label>Password</label>
            {viewRawPassword ? <p>{ loginItemData.password }</p> : <p>{ '•'.repeat(8) }</p>}
          </div>
          <div className="actions">
            <div role="button" onClick={() => setViewRawPassword(!viewRawPassword)}>
              {viewRawPassword ? <FaRegEyeSlash className="icon" size={22} />  : <FaRegEye className="icon" size={22} />}
            </div>
            <MdContentCopy className="icon" size={22} onClick={() => handleCopy(loginItemData.password)} />
          </div>
        </div>
        <div style={{ height: '15px', }}></div>
        <div className="view-login-item-field">
          <div className="tex-content">
            <label>Website</label>
            <p>{loginItemData.uri}</p>
          </div>
          <div className="actions">
            <RxExternalLink className="icon" size={24} />
            <MdContentCopy className="icon" size={22} onClick={() => handleCopy(loginItemData.website)} />
          </div>
        </div>
        <div style={{ height: '15px', }}></div>
        <div role="button" className="view-login-item-button clone">
          <IoCopy size={20} />
          <p>Clone Item</p>
        </div>
        <div role="button" className="view-login-item-button delete">
          <FaRegTrashAlt size={20} /> 
          <p>Delete Item</p>
        </div>
        <div style={{ height: '15px', }}></div>
        <div className="view-login-item-dates">
          <p><span>Updated:</span> {loginItemData.revisionDate}</p>
          <p><span>Created:</span> {loginItemData.creationDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewLoginItem;
