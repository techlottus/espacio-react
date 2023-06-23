import React from "react";
import "./FaqsHelpCenter.scss";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import { useContainerHeigh } from "../../../../hooks/contentHeight";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import {
  faqsHelpCenter,
} from "../../../../constants/HelpCenter.constant";
import { Breadcrumb } from "../../../../components/Breadcrumb/Breadcrumb";
import { getImageOfAssets } from "../../../../helpers/getImages";
import {
  accordionFormatFaqsFlow,
} from "../../../../helpers/accordionFormat";
import { Button } from "../../../../components/Button/Button";
import { Accordion } from "../../../../components/Accordion/Accordion";
import { useEffect } from "react";
import { useState } from "react";
import { typesFaqs } from "../../../../types/typesHelpCenter";
import { formatFaqsHelp } from "../../Utils/formatFaqsHelp";

const FaqsHelpCenter = () => {
  const { height } = useContainerHeigh(0);
  const history = useHistory();
  const { texts } = useSelector((state) => state.texts);
  const { data } = useSelector((state) => state.helpCenterFaqs);

  const [accordion, setAccordion] = useState(typesFaqs.academic);
  const [faqs, setFaqs] = useState([]);
  const [faqsTypes, setFaqsTypes] = useState([]);
  const [btnId, setBtnId] = useState('academic');
  const [desktop, setDesktop] = useState(window.innerWidth > 991);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    if (data === null) {
      history.push("/help-center/dashboard");
    } else {
      setFaqs(data);
      setFaqsTypes(
        data.map((faq) => {
          return faq.type;
        })
      );
      setBtnId(faqsTypes[0]);
    }
    return () => {
      window.removeEventListener("resize", updateMedia);
    };
  }, []);
  useEffect(() => {
    if (data !== null) {
      const accordionFaq = formatFaqsHelp(data)
      setAccordion(accordionFaq.academic) 
      setBtnId(accordionFaq.academic[0].type)
      }
  }, [data]);

  const onItem = (e) => {
    history.push(e.detail);
  };
  const onBack = () => {
    history.push("/");
  };
  const background = {
    backgroundImage: `url(${getImageOfAssets(
      texts?.helpCenter.images.helpCenterFaqs
    )})`,
    backgroundSize: "cover",
    minHeight: "267px",
  };
  const handleAccordion = (id) => {
    const accordionFaq = formatFaqsHelp(data)
    switch (id) {
      case "academic":
        return setAccordion(accordionFaq?.academic || {});
      case "professors":
        return setAccordion(accordionFaq?.professors || {});
      case "procedures":
        return setAccordion(accordionFaq?.procedures || {});
      case "financial":
        return setAccordion(accordionFaq?.financial || {});
      case "invoices":
        return setAccordion(accordionFaq?.invoices || {});
      case "technical":
        return setAccordion(accordionFaq?.technical || {});
      default:
        return;
    }
  };

  return (
    <>
      <HeaderApp />
      <div style={{ minHeight: `calc(${height}px - 77px)` }}>
        <div style={background}>
          <div className="faqs-help-container">
            <div className="helpfaqsbanner">
              <Breadcrumb
                data={faqsHelpCenter.breadCrumb}
                onItem={onItem}
                onBack={onBack}
              />
              <div className="title">
                <h2>{faqsHelpCenter.title}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="faqs-help-container">
          <div className="contentfaqs">
            <div className="tabscontainer">
              {faqsHelpCenter.btns.map((btn, i) => {
                return (
                  <div className="btnfaqs" key={i}>
                    <Button
                      data={{
                        ...btn,
                        type:
                          btnId === btn.id
                            ? "primary"
                            : desktop
                            ? "text"
                            : "outlined",
                      }}
                      onClick={(e) => {
                        setBtnId(e.detail);
                        handleAccordion(e.detail);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="accordioncontainer">
              <div className="accordioncontent">
                <Accordion data={accordionFormatFaqsFlow(accordion)} />
              </div>
              {/* <div className="cardquestion">
                <CardQuestion data={cardQuestionData} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <FooterApp />
    </>
  );
};

export default FaqsHelpCenter;
