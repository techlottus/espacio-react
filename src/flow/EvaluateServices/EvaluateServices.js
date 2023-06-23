import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import FooterApp from "../../shared/FooterApp/FooterApp";
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import "./EvaluateServices.scss";
import { useDispatch, useSelector } from "react-redux";
import { CardIconText } from "../../components/Card/CardIconText";
import {
  breadcrumbEvaluateServices,
  cardsItemEvaluateServicesUla,
  cardsItemEvaluateServicesUtc,
} from "../../constants/EvaluateServices.constant";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import env from "../../enviroment/environment";
import { typesMark } from "../../types/typesMark";
import { getValuesOfAuth } from "../../helpers/auth";

const EvaluateServices = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { texts } = useSelector((state) => state.texts);

  const onItem = (e) => {
    switch (e.detail) {
      case "/":
        history.push(e.detail);
        break;
      default:
        break;
    }
  };

  const onBack = (e) => {
    history.push("/");
  };

  const formatUrl = (url) => {
    let names = getValuesOfAuth()?.name.split(" ");
    let name = "";
    let lastName = "";
    if (names.length > 4) {
      let name_one = names.shift();
      let name_two = names.shift();
      name = name_one + " " + name_two;
    } else {
      name = names.shift();
    }

    lastName = names.join(" ");
    return `${url}&campus=${getValuesOfAuth()?.medallia?.campusId}&matricula=${
      getValuesOfAuth().mask
    }&nombre=${name}&apellidos=${lastName}&correo=${getValuesOfAuth().email}`;
  };

  return (
    <>
      <HeaderApp />
      <div className="containerevaluateservices">
        <div className="breadcrumbevaluateservices">
          <Breadcrumb
            data={breadcrumbEvaluateServices}
            onItem={onItem}
            onBack={onBack}
          />
        </div>
      </div>
      <div className="contentevaluateservices">
        <div className="wrappertitle">
          <h2>{texts?.evaluateServices?.evaluateServicesTitle}</h2>
        </div>
        {env.mark === typesMark.utc ? (
          <div className="cardevaluateservices">
            {cardsItemEvaluateServicesUtc.map((card, i) => {
              return (
                <div key={i} className="cardwrapper">
                  <CardIconText
                    data={card}
                    text={card.text}
                    onClick={() => {
                      window.open(formatUrl(card?.urlOpenOut));
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cardevaluateservices">
            {cardsItemEvaluateServicesUla.map((card, i) => {
              return (
                <div key={i} className="cardwrapper">
                  <CardIconText
                    data={card}
                    text={card.text}
                    onClick={() => {
                      window.open(formatUrl(card?.urlOpenOut));
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <FooterApp />
    </>
  );
};

export default EvaluateServices;
