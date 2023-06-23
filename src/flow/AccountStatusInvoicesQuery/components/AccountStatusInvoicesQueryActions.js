import React from "react";
import {
  clearInvoiceQuery,
  downloadInvoiceQuery,
  selectInvoiceQuery,
} from "../../../constants/AccountStatus.constant";
import { Button } from "../../../components/Button/Button";
import { Select } from "../../../components/Select/Select";
import "./AccountStatusInvoicesQueryActions.scss";

const InvoiceQueryActions = () => {
  return (
    <>
      <div className="invoicequeryaction-container">
        <div className="invoicequeryselect">
          <div className="invoicequeryitem">
            <Select data={selectInvoiceQuery} onClick={() => {}} />
          </div>
          <div className="invoicequeryitem">
            <Select data={selectInvoiceQuery} onClick={() => {}} />
          </div>
          <div className="invoicequeryitem">
            <Select data={selectInvoiceQuery} onClick={() => {}} />
          </div>
          <div className="clearbtn">
            <Button data={clearInvoiceQuery} />
          </div>
        </div>
        <div className="downloadbtn">
          <Button data={downloadInvoiceQuery} />
        </div>
      </div>
    </>
  );
};

export default InvoiceQueryActions;
