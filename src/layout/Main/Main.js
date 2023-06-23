import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Main.scss"
import Dashboard from '../../flow/Dashboard/Dashboard';
import Payment from '../../flow/Payment/Payment';
import TermsPublic from "../../flow/Terms/TermsPublic";

const Main = () => {

  return (
    <>
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/public-terms" component={TermsPublic} />
        </Switch>
    </>
  );
};
export default Main;
