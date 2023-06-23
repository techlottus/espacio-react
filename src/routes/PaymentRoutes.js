import React from "react";
import { Switch,Route, Redirect } from 'react-router-dom';
import Concept from '../flow/Payment/stages/Concept/Concept';
import TaxData from '../flow/Payment/stages/TaxData/TaxData';
import PaymentMethods from '../flow/Payment/stages/PaymentMethods/PaymentMethods';
import CardOnlinePayment from "../flow/Payment/stages/CardOnlinePayment/CardOnlinePayment";

const PaymentRoutes = () => {

  return (
    <>
      <Switch>
        <Route exact path="/payment/concept" component={Concept}/>
        <Route exact path="/payment/tax-data" component={TaxData} />
        <Route exact path="/payment/methods" component={PaymentMethods} />
        <Route exact path="/payment/card-online" component={CardOnlinePayment}/>
        <Redirect to="/payment/concept" />
      </Switch>
    </>
  );
};

export default PaymentRoutes;
