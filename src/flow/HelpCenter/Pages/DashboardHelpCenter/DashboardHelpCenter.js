import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Breadcrumb } from "../../../../components/Breadcrumb/Breadcrumb";
import { CardIconText } from "../../../../components/Card/CardIconText";
import { CardImage } from "../../../../components/Card/CardImage";
import { typeSliderbar } from "../../../../components/Sidebar/bodySidebar/bodySidebar";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import {
  breadcrumbDashboardHelpCenter,
  cardImageHelpCenterDashboard,
  cardsItemHelpCenterDashboard,
} from "../../../../constants/DashboardHelpCenter.constant";
import { getImageOfAssets } from "../../../../helpers/getImages";
import { getDashboardHelpService } from "../../../../middlewares/helpCenterMiddlewares/dashboardHelpMiddleware/dashboardHelpMiddleware";
import { getFaqsHelpService } from "../../../../middlewares/helpCenterMiddlewares/faqsHelpMiddleware/faqsHelpMiddleware";
import { getRequesAllTicketsHelpCenterService } from "../../../../middlewares/helpCenterMiddlewares/requestAllTicketsHelpMiddleware/requestAllTicketsHelpMiddleware";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import "./DashboardHelpCenter.scss";

const DashboardHelpCenter = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { texts } = useSelector((state) => state.texts);
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [desktop, setDesktop] = useState(window.innerWidth > 991);
  const [cardImage, setCardImage] = useState([]);
  const [items, setItems] = useState([]);
  const { data: cardHelpCenter } = useSelector(
    (state) => state.helpCenterDashboard
  );
  const { data: dataFaqs } = useSelector((state) => state.helpCenterFaqs);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!cardHelpCenter) {
      dispatch(getDashboardHelpService());
    }

    if (!dataFaqs) {
      dispatch(getFaqsHelpService());
    }

    setCardImage([cardHelpCenter]);
  }, []);

  useEffect(() => {
    if (cardHelpCenter) {
      setItems(
        cardHelpCenter.map((e) => {
          return {
            ...e,
            img: e?.imageUrl,
            text: e?.description,
          };
        })
      );
    }
  }, [cardHelpCenter]);

  const onItem = (e) => {
    if (e.detail === "/") {
      history.push(e.detail);
    }
  };

  const onBack = () => {
    history.push("/");
  };

  const background = {
    backgroundImage: `url(${getImageOfAssets(
      texts?.helpCenter.images.headerHelpCenter
    )})`,
    // minHeight: "267px",
    backgroundSize: "100%",
  };
  return (
    <>
      <HeaderApp />
      <div className="dashboardhelpcentercontainer">
        <div
          className="dashboardhelpcentercontent"
          style={desktop ? background : {}}
        >
          <div className="dashboardhelpcenterbanner">
            <Breadcrumb
              data={breadcrumbDashboardHelpCenter}
              onItem={onItem}
              onBack={onBack}
            />
          </div>
          {/* <h2 className="dashboardhelpcentertitle">
            {texts?.helpCenter?.titleDashboard}
          </h2> */}
          {/* <div className="dashboardhelpcentersearch">
            <Search
              data={{ ...searchHelpCenterDashboard, size: "large" }}
              onEnter={(e) => {
                const search = e.detail.value.split(" ").join("%");
                history.push("/help-center/search-results?search=" + search);
              }}
            />
          </div> */}
        </div>
        <div className="dashboardhelpcenterwrapper">
          <div className="dashboardhelpcentercards">
            {cardImageHelpCenterDashboard.map((card, i) => {
              return (
                <div key={i} className="cardwrapper">
                  <CardImage
                    data={card}
                    onClick={() => {
                      history.push(card.path);
                    }}
                  />
                </div>
              ); 
            })}
            {cardsItemHelpCenterDashboard.map((card, i) => {
              return (
                <div key={i} className="cardwrapper">
                  <CardIconText
                    data={card}
                    text={card.text}
                    onClick={() => {
                      switch (card.icon) {
                        case "search":
                          dispatch(getRequesAllTicketsHelpCenterService());
                          setIsShowSidebar(true);
                          break;
                        case "email":
                          history.push(card.path);
                          break;
                        case "chat_bubble_outline":
                          window.open(card?.urlOpenOut);
                          break;
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
          {/* <div className="dashboardhelpcenterbtn">
            <HelpButton />
          </div> */}
        </div>
      </div>
      <FooterApp />
      <Sidebar
        typeSlide={typeSliderbar.helpCenter}
        show={isShowSidebar}
        onClose={() => setIsShowSidebar(!isShowSidebar)}
        outside={() => setIsShowSidebar(false)}
      />
    </>
  );
};

export default DashboardHelpCenter;
