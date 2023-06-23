import React from "react";
import BenefitsRoutes from "../../routes/BenefitsRoutes";
import { BenefitsContext } from "./BenefitsContext";

const Benefits = () => {
  return (
    <>
      <BenefitsContext.Provider value>
        <BenefitsRoutes />
      </BenefitsContext.Provider>
    </>
  );
};

export default Benefits;
