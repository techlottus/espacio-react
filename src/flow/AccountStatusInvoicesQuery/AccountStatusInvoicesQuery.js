import React from "react";
import { useHistory } from "react-router";
import { breadcrumbInvoiceQuery } from "../../constants/AccountStatus.constant";
import FooterApp from "../../shared/FooterApp/FooterApp";
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import "./AccountStatusInvoicesQuery.scss";
import InvoiceQueryActions from "./components/AccountStatusInvoicesQueryActions";
import InvoiceQueryTable from "./components/AccountStatusInvoicesQueryTable";
import { useSelector } from "react-redux";

const InvoiceQuery = () => {
  const history = useHistory();
  const { texts } = useSelector((state) => state.texts);

  const onItem = (e) => {
    switch (e.detail) {
      case "/":
        history.push(e.detail);
        break;
      case "/account-status":
        history.push(e.detail);
        break;
      default:
        break;
    }
  };

  const onBack = (e) => {
    history.push("/account-status");
  };

  return (
    <>
      <div className="invoicequery-container">
        <HeaderApp />
        <div className="contentheader">
        <div className="breadcrumbinvoicequery">
            <Breadcrumb
              data={breadcrumbInvoiceQuery}
              onItem={onItem}
              onBack={onBack}
            />
          </div>
          <div className="invoicequerytitle"> 
          {texts?.accountStatus?.accountStatusInvoiceQuery.title}
        </div>
        <p className="invoicequerydescription">
        {texts?.accountStatus?.accountStatusInvoiceQuery.description}
        </p>
        </div>
        <InvoiceQueryActions />
        <InvoiceQueryTable />
        </div>
      <FooterApp />
    </>
  );
};

export default InvoiceQuery; 