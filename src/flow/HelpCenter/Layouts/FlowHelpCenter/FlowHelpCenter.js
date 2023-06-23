import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Accordion } from "../../../../components/Accordion/Accordion";
import { Breadcrumb } from "../../../../components/Breadcrumb/Breadcrumb";
import { getImageOfAssets } from "../../../../helpers/getImages";
import { accordionFormat } from "../../../../helpers/accordionFormat";
import "./FlowHelpCenter.scss";
import { CardItem } from "../../../../components/Card/CardItem";
import env from "../../../../enviroment/environment";

const FlowHelpCenter = ({ flowData,isRedirect=false }) => {
  const { breadCrumb, faqs, tickets, title, bgImage } = flowData;
  const history = useHistory();
  const { texts } = useSelector((state) => state.texts);

  const [desktop, setDesktop] = useState(window.innerWidth > 991);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const onItem = (e) => {
    switch (e.detail) {
      case "/help-center/dashboard":
        history.push(e.detail);
        break;
      case "/":
        history.push(e.detail);
        break;
      default:
        history.push(e.detail);
    }
  };
  const onBack = () => {
    history.push("/");
  };
  const background = {
    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${getImageOfAssets(
      bgImage
    )})`,
    backgroundSize: "cover",
    minHeight: "267px",
  };

  const backgroundMob = {
    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${getImageOfAssets(
      bgImage
    )})`,
    backgroundSize: "cover",
    minHeight: "161px",
  };

  return (
    <>
      <div style={desktop ? background : backgroundMob}>
        <div className="flow-help-container">
          <div className="helpflowbanner">
            <Breadcrumb data={breadCrumb} onItem={onItem} onBack={onBack} />
            <div className="title">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flow-help-container">
        <div className="contentaclarations">
          <div className="aclarationwrap">
            <div className="titlefaqs">
              <h2>{texts.helpCenter.titleFlowFaqs}</h2>
            </div>
            <div className="accordioncontent">
              <Accordion data={accordionFormat(faqs)} />
            </div>
          </div>
          <div className="aclarationwrap">
            <div className="titletickets">
              <h2>{texts.helpCenter.titleFlowTickets}</h2>
            </div>
            <div className="ticketscontent">
              {tickets.map((content, i) => {
                return (
                  <div key={i} className="ticketcard">
                    <CardItem
                      data={content}
                      onIcon={() => {
                        if(isRedirect)  {
                          window.location.href  = env.psyschologicalHelp
                        }
                        else {
                          history.push(content.path);
                        }
                        
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowHelpCenter;
