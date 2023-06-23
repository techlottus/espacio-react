import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flowsHelpCenter } from "../../../../constants/HelpCenter.constant";
import { useContainerHeigh } from "../../../../hooks/contentHeight";
import { getFinancialHelpService } from "../../../../middlewares/helpCenterMiddlewares/financialHelpMiddleware/financialHelpMiddleware";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FlowHelpCenter from "../../Layouts/FlowHelpCenter/FlowHelpCenter";

const FinancialHelpFlow = () => {
  const { height } = useContainerHeigh(0);
  const dispatch = useDispatch();

  const { faqs, tickets } = useSelector((state) => state.helpCenterFinancial);

  useEffect(() => {
    if(!tickets) {
      dispatch(getFinancialHelpService());
    }
  }, []);

  return (
    <>
      <HeaderApp />
      <div style={{ minHeight: `calc(${height}px - 77px)` }}>
        <FlowHelpCenter
          flowData={{
            ...flowsHelpCenter.financialHelp,
            tickets:
              tickets !== null
                ? tickets.map((ticket) => {
                    return ticket;
                  })
                : [],
            faqs:
              faqs !== null
                ? faqs.map((faq) => {
                    return {
                      title: faq.question,
                      description: faq.answer,
                      list: [],
                    };
                  })
                : [],
          }}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default FinancialHelpFlow;
