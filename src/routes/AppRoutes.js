import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Terms from "../layout/Terms/Terms";
import Payment from "../flow/Payment/Payment";
import Dashboard from "../flow/Dashboard/Dashboard";
import AccountStatus from "../flow/AccountStatus/AccountStatus";
import Login from "../flow/Login/Login";
import { useProvideAuth } from "../helpers/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../actions/headersAction";
import { setTokens } from "../actions/loginAction";
import { eventErrorAuth } from "../observables/eventError";
import { typeErrorAuth } from "../constants/Login.constant";
import { clearCookiesAuth, getCookieAuth } from "../helpers/cookies";
import TermsPublic from "../flow/Terms/TermsPublic";
import Screen from "../flow/Screens/Screen";
import Procedures from "../flow/Procedures/Procedures";
import MainProcedures from "../flow/Procedures/components/Main/MainProcedures";
import Calendar from "../components/Calendar/Calendar";
import { contentStaticMiddleware } from "../helpers/contentStatic";
import env from "../enviroment/environment";
import InvoiceQuery from "../flow/AccountStatusInvoicesQuery/AccountStatusInvoicesQuery";
import HelpCenter from "../flow/HelpCenter/HelpCenter";
import Benefits from "../flow/Benefits/Benefits";
import EvaluateServices from "../flow/EvaluateServices/EvaluateServices";
import RegistrationSubjects from "../flow/RegistrationSubjects/RegistrationSubjects";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const auth = getCookieAuth();
  dispatch(setAuth(`Bearer ${auth}`));
  dispatch(setTokens(auth, null));

  const redirectLogin = () => {
    window.location.href = env.redirectLoginHome + "/login";
  };

  useEffect(() => {
    let eventErrorAuthObs = eventErrorAuth.subscribe((typeError) => {
      switch (typeError) {
        case typeErrorAuth.error401:
          clearCookiesAuth();
          redirectLogin();
          break;
        default:
          break;
      }
    });
    dispatch(contentStaticMiddleware());
    return () => {
      eventErrorAuthObs.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/public-terms-view" component={TermsPublic} />
          <PrivateRoute path="/terms">
            <Terms />
          </PrivateRoute>
          <PrivateRoute path="/payment">
            <Payment />
          </PrivateRoute>
          <PrivateRoute path="/account-status">
            <AccountStatus />
          </PrivateRoute>
          <PrivateRoute path="/account-status-invoices-query">
            <InvoiceQuery />
          </PrivateRoute>
          <PrivateRoute path="/screen">
            <Screen />
          </PrivateRoute>
          <PrivateRoute path="/public-terms">
            <TermsPublic />
          </PrivateRoute>
          <PrivateRoute path="/procedures-main">
            <MainProcedures />
          </PrivateRoute>
          <PrivateRoute path="/procedures-flows">
            <Procedures />
          </PrivateRoute>
          <PrivateRoute path="/school-calendar">
            <Calendar />
          </PrivateRoute>
          <PrivateRoute path="/help-center">
            <HelpCenter />
          </PrivateRoute>
          <PrivateRoute path="/benefits">
            <Benefits />
          </PrivateRoute>
          <PrivateRoute path="/evaluate-services">
            <EvaluateServices />
          </PrivateRoute>
          <PrivateRoute path="/registration-subjects">
            <RegistrationSubjects />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  let { user: auth } = useProvideAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth
          ? children
          : (window.location.href = env.redirectLoginHome + "/login")
      }
    />
  );
};

export default AppRoutes;
