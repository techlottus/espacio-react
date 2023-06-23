import React, { useContext } from "react";
import { Stepper } from "../../../../../components/Stepper/Stepper";
import ProceduresRoutes from "../../../../../routes/ProceduresRoutes";
import { ProceduresContext } from "../../../ProceduresContext";

import "./Forms.scss";

const Forms = () => {
  const { steps, isTabs } = useContext(ProceduresContext);

  return (
    <>
      <div className="forms-container">
        <div className="forms-view">
          {isTabs ? (
            <div className="forms-stepper">
              <Stepper data={steps} />
            </div>
          ) : (
            ""
          )}
          <div className="forms-content">
            <ProceduresRoutes />
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
