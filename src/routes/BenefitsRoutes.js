import React from "react";
import { Switch,Route, Redirect } from 'react-router-dom';
import BenefitsContent from "../flow/Benefits/BenefitsContent/BenefitsContent";
import BenefitsGeneral from "../flow/Benefits/BenefitsGeneral/BenefitsGeneral";



const BenefitsRoutes = () => {
  return (
    <>
      <Switch>

        <Route exact path="/benefits/general" component={BenefitsGeneral} />
        <Route exact path="/benefits/detail" component={BenefitsContent} />

        <Redirect to="/benefits/general" />  
      </Switch>
    </>
  );
};

export default BenefitsRoutes;