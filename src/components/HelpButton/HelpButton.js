import React from "react";
import "./HelpButton.scss";
import { Label } from "../Label/Label";
import { ButtonCircle } from "../ButtonCircle/ButtonCircle";
import {
  btnCircleHelpCenterDashboard,
  labelHelpCenterDashboard,
} from "../../constants/DashboardHelpCenter.constant";

const HelpButton = ({name}) => {

  return (
    <div className="helpbutton-container">
      <div className="helpbutton-content">
        <Label data={labelHelpCenterDashboard} prop={name}/>
      </div>
      <ButtonCircle data={btnCircleHelpCenterDashboard} />
    </div>
  );
};

export default HelpButton;
