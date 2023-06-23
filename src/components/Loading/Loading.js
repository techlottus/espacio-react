import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Loading.scss";

const Loading = () => {
  const loadingStore = useSelector((state) => state.loading);

  useEffect(() => {
    if (loadingStore.isShow) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [loadingStore.isShow]);

  return (
    <div
      className="loading-container"
      style={{ visibility: loadingStore.isShow ? "visible" : "hidden" }}
    >
      <div className="loadingcontent">
        <div className="loading"></div>
      </div>
    </div>
  );
};

export default Loading;
