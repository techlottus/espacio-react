import React from "react";
import "./EmptyState.scss";
import { Button } from "../Button/Button";

const EmptyState = ({img, title, description, button, action}) => {
  return (
    <>
      <div className="emptystate-container">
        <div className="emptyimage">
          <img
            src={img}
            className="imgempty"
            alt="img-empty"
          />
        </div>
        <p className="emptytitlemsg">{title}</p>
        {description != null ? (
            <p className="emptydescriptionmsg">{description}</p>
        ): ""}
        {button != null ? (
            <div className="emptybtn">
            <Button data={button}
            onClick={action} 
            />
          </div>
        ): ""}
      </div> 
    </>
  );
};
export default EmptyState;
