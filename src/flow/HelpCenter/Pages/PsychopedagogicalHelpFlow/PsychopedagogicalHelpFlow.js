import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { flowsHelpCenter } from "../../../../constants/HelpCenter.constant";
import { useContainerHeigh } from "../../../../hooks/contentHeight";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FlowHelpCenter from "../../Layouts/FlowHelpCenter/FlowHelpCenter";

const PsychopedagogicalHelpFlow = () => {
    const { height } = useContainerHeigh(0);

    const [faqs,setFaqs] = useState([])

    const { data } = useSelector((state) => state.helpCenterFaqs);

    useEffect(() => {

      if(data) {
        setFaqs(data.filter((e) => {
          return e.type.trim() === 'Psicopedagógica'
        }))
      }
    },[data]);

    return (
    <>
      <HeaderApp />
      <div
        style={{ minHeight: `calc(${height}px - 77px)` }}
      >
        <FlowHelpCenter flowData={{
          ...flowsHelpCenter.psychopedagogicalHelp,
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
        }} isRedirect={true}/>
      </div>
      <FooterApp />
    </>
  );
};

export default PsychopedagogicalHelpFlow;
