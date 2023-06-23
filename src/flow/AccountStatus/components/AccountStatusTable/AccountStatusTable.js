import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { convertMoney } from "../../../../helpers/formatCurrency";
import { formatDate } from "../../../../helpers/formatDate";
import "./AccountStatusTable.scss";
import { Table } from "../../../../components/Table/Table";
import { accountStatusTableDesktop, accountStatusTableMobile } from "../../../../constants/AccountStatus.constant";

const AccountStatusTable = () => {
  const [items, setItems] = useState([]);

  const accountStatusStore = useSelector((state) => state.accountStatus);


  const [accountStatusSize] = useState(
    window.innerWidth < 991 ?  {
    ...accountStatusTableMobile,
    
  }: {
    ...accountStatusTableDesktop
  });

  const instanceTable = (debitPeriods) => {
    let list = [];
    debitPeriods.forEach((debitPeriod) => {
      const listDebitPeriods = [];
      listDebitPeriods.push({
        title: debitPeriod.periodCode || "",
      });
      if(window.innerWidth >= 991 ) {
        listDebitPeriods.push({
          title: debitPeriod.periodDescription || "",
        });
      }
      listDebitPeriods.push({
        title: formatDate(debitPeriod.startDate, debitPeriod.endDate) || "",
      });
      listDebitPeriods.push({
        title: convertMoney(debitPeriod.debtAmount) || "",
      });
      list.push(listDebitPeriods);
    });
    setItems(list);
  };

  useEffect(() => {
    if (accountStatusStore.debitPeriods !== null) {
      instanceTable([...accountStatusStore.debitPeriods]);
    }
  }, [accountStatusStore.debitPeriods]);

  return (
    <>
      <Table
        data={{
          ...accountStatusSize,
          rows: [...items], 
          
        }}
      />
    </>
  );
};

export default AccountStatusTable;
