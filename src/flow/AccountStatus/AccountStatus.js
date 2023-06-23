import React, { useEffect } from "react";
import "./AccountStatus.scss";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import {
  breadcrumb,
} from "../../constants/AccountStatus.constant";
import AccountStatusResume from "./components/AccountStatusResume.js/AccountStatusResume";
import FooterApp from "../../shared/FooterApp/FooterApp";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccountsService } from "../../middlewares/accountStatusMiddleware";
import { useHistory } from "react-router";
import AccountStatusPeriodDetails from "./components/AccountPeriodDetails/AccountStatusPeriodDetails";
import { useContainerHeigh } from "../../hooks/contentHeight";

const AccountStatus = () => {
  const {height} = useContainerHeigh(0)

  const history = useHistory();
  const dispatch = useDispatch();
  const { texts } = useSelector((state) => state.texts);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllAccountsService());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

  const onItem = (e) => {
    if (e.detail === "/") {
      history.push(e.detail);
    }
  };

  const onBack = () => {
    history.push("/");
  };

  return (
    <>
      <HeaderApp />
      <div className="accountstatus-container" style = {{minHeight: `calc(${height}px - 77px)`}}>
        <div className="accountstatusbackground"></div>
        <div className="accountstatusbreadcrumb">
          <Breadcrumb data={breadcrumb} onItem={onItem} onBack={onBack} />
        </div>
        <div className="accountstatustitle">
          {texts?.accountStatus?.statusTitle}
        </div>
        <div className="accountstatuscontent">
          <AccountStatusResume />
        </div>
        <div>
          <AccountStatusPeriodDetails />
        </div>
      </div>
      <FooterApp />
    </>
  );
};

export default AccountStatus;
