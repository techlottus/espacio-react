import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setBenefitsDetail } from "../../../../actions/benefitsActions";
import CardWebsite from "../../../../components/Card/CardWebsite";
import { LinkIcons } from "../../../../components/LinkIcons/LinkIcons";
import { Tabs } from "../../../../components/Tabs/Tabs";
import {
  benefitsCards,
  linkIconBenefits,
  linkIcons,
  linkIconsText,
  linksTextsBenefits,
  tabsBenefits,
} from "../../../../constants/Benefits.constant";
import "./BenefitsCards.scss";

const BenefitsCards = ({ typeView, cards }) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const [desktop, setDesktop] = useState(window.innerWidth > 991);
  const [isSingle, setIsSingle] = useState();
  const [isList, setIsList] = useState({ ...linkIconBenefits });
  const [listCards, setListCards] = useState(benefitsCards);
  const [next, setNext] = useState({
    valid: false,
    data: null,
  });
  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    setIsSingle(typeView);

    return () => window.removeEventListener("resize", updateMedia);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (cards) {
      setListCards(cards);
    }
  }, [cards]);

  useEffect(() => {
    if (next.valid) {
      const detail = listCards.find((data) => data.id === next.data.detail);
      dispatch(
        setBenefitsDetail({
          id: next.data.detail,
          img: detail.detailImg,
          title: detail.subtitle,
          description: detail.description,
          requirements: detail.requirements,
          validityDate: detail.text,
          contact: detail.contact,
        })
      );
      history.push("/benefits/detail");
      setNext({
        valid: false,
        data: null,
      });
    }
  }, [next, listCards]);

  const renderTabs = () => {
    return (
      <div className="benefitstabs">
        <Tabs data={tabsBenefits} />
      </div>
    );
  };

  const renderLink = () => {
    return (
      <div className="benefitstoggle">
        <LinkIcons
          data={isList}
          onClick={(e) => {
            setIsList({
              ...linkIconBenefits,
              text:
                e.detail === linkIcons.list
                  ? linkIconsText.dashboard
                  : linkIconsText.list,
              iconSecond:
                e.detail === linkIcons.list
                  ? linkIcons.dashboard
                  : linkIcons.list,
              id:
                e.detail === linkIcons.list
                  ? linkIcons.dashboard
                  : linkIcons.list,
            });
            setListCards((state) => {
              return state.map((card) => {
                return {
                  ...card,
                  type:
                    e.detail === linkIcons.dashboard
                      ? "vertical"
                      : "horizontal",
                  allContent: e.detail === linkIcons.dashboard,
                  height: "150px"
                };
              });
            });
          }}
        />
      </div>
    );
  };

  const renderTitle = () => {
    return (
      <div className="benefitscardstitle">
        <h2>Otros beneficios</h2>
      </div>
    );
  };
  const renderHeading = () => {
    if (desktop) {
      return renderTabs();
    } else {
      return renderLink();
    }
  };
  return (
    <>
      <div className="benefits-cards-container">
        {isSingle ? renderTitle() : renderHeading()}
        <div
          className={
            isList.id === linkIcons.list
              ? `benefitscards`
              : "benefitscards islist"
          }
        >
          {isSingle
            ? listCards.slice(0, 4).map((data, i) => {
                return (
                  <div className="benefitscard" key={i}>
                    <CardWebsite
                      isLinkText={true}
                      links={{
                        ...linksTextsBenefits,
                        id: data.id,
                      }}
                      data={{
                        ...data, height: "150px"
                      }}
                      onClick={(e) => {
                        setNext({ valid: true, data: e });
                      }}
                    />
                  </div>
                );
              })
            : listCards.map((data, i) => {
                return (
                  <div className="benefitscard" key={i}>
                    <CardWebsite
                      isLinkText={true}
                      links={{
                        ...linksTextsBenefits,
                        id: data.id,
                      }}
                      data={{
                        ...data, height: "150px"
                      }}
                      onClick={(e) => {
                        setNext({ valid: true, data: e });
                      }}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default BenefitsCards;
