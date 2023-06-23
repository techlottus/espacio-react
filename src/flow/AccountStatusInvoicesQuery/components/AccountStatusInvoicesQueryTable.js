import React, { useState } from "react";
import { Table } from "../../../components/Table/Table";
import {
  invoiceQueryTableDesktop,
  invoiceQueryTableMobile,
  linkInvoiceQuery,
} from "../../../constants/AccountStatus.constant";
import "./AccountStatusInvoicesQueryTable.scss";
import { Link } from "../../../components/Link/Link";

const InvoiceQueryTable = () => {
  // const [items, setItems] = useState([]);

  const [accountStatusInvoiceQuerySize] = useState(
    window.innerWidth < 991
      ? {
          ...invoiceQueryTableMobile,
        }
      : {
          ...invoiceQueryTableDesktop,
        }
  );

  return (
    <>
      <Table
        data={{
          ...accountStatusInvoiceQuerySize,
          //   rows: [...items]
        }}
      />
      <div className="linkinvoicequery">
        <Link data={linkInvoiceQuery} onClick={() => {}} />
      </div>
    </>
  );
};

export default InvoiceQueryTable;
