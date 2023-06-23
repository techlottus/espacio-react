import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flowsHelpCenter } from "../../../../constants/HelpCenter.constant";
import { useContainerHeigh } from "../../../../hooks/contentHeight";
import { getAcademicHelpService } from "../../../../middlewares/helpCenterMiddlewares/academicHelpMiddlewares/academicHelpMiddleware";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FlowHelpCenter from "../../Layouts/FlowHelpCenter/FlowHelpCenter";

const AcademicHelpFlow = () => {
  const { height } = useContainerHeigh(0);
  const dispatch = useDispatch();
  const { faqs, tickets } = useSelector((state) => state.helpCenterAcademic);
  useEffect(() => {
    if(!tickets) {
      dispatch(getAcademicHelpService());
    }
  }, []);

  return (
    <>
      <HeaderApp />
      <div style={{ minHeight: `calc(${height}px - 77px)` }}>
        <FlowHelpCenter
          flowData={{
            ...flowsHelpCenter.academicHelp,
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

export default AcademicHelpFlow;
