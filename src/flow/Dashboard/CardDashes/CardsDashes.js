import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CardDash } from "../../../components/Card/CardDash";
import { dataCardDash } from "../../../constants/Dashboard.constant";
import env from "../../../enviroment/environment";
import { sendInfoTM } from "../../../tagging/services/sendInfoTagManager";
import {
  cardClassroomDashboardTag,
  cardLibraryDashboardTag,
  cardPaymentDashboardTag,
  cardVideoPaymentDashboardTag,
} from "../../../tagging/flows/dashboardTag";

import "./CardDashes.scss";
import { setLoading } from "../../../actions/loadingAction";
import { moodleRedirect } from "../../../helpers/moodle";
import { getValuesOfAuth } from "../../../helpers/auth";

const CardsDashes = () => {
  const { texts } = useSelector((state) => state.texts);
  const dispatch = useDispatch();
  const [cardDash] = useState(
    getValuesOfAuth().permissions?.manhattan?.access
      ? [
          {
            ...dataCardDash[0],
            action: {
              ...dataCardDash[0].action,
              icon: texts?.dashboard.playIcon,
            },
            title: texts?.dashboard.cards.one.title,
          },
          {
            ...dataCardDash[1],
            action: {
              ...dataCardDash[1].action,
              icon: texts?.dashboard.playIcon,
            },
            title: texts?.dashboard.cards.two.title,
          },
          {
            ...dataCardDash[2],
            action: {
              ...dataCardDash[2].action,
              icon: texts?.dashboard.playIcon,
            },
            title: texts?.dashboard.cards.three.title,
          },
          {
            ...dataCardDash[3],
            action: {
              ...dataCardDash[3].action,
              icon: texts?.dashboard.playIcon,
            },
            title: texts?.dashboard.cards.four.title,
          },
          {
            ...dataCardDash[4],
            action: {
              ...dataCardDash[4].action,
              icon: texts?.dashboard.playIcon,
            },
            title: texts?.dashboard.cards.five.title,
          },
        ]
      : [
          {
            ...dataCardDash[0],
            action: {
              ...dataCardDash[0].action,
              icon: texts?.dashboard.playIcon,
            },
            title: texts?.dashboard.cards.one.title,
          },
          {
            ...dataCardDash[1],
            action: {
              ...dataCardDash[1].action,
              icon: texts?.dashboard.playIcon,
            },
            title: texts?.dashboard.cards.two.title,
          },
          {
            ...dataCardDash[2],
            action: {
              ...dataCardDash[2].action,
              icon: texts?.dashboard.playIcon,
            },
            title: texts?.dashboard.cards.three.title,
          },
          {
            ...dataCardDash[3],
            action: {
              ...dataCardDash[3].action,
              icon: texts?.dashboard.playIcon,
            },
            title: texts?.dashboard.cards.four.title,
          },
        ]
  );

  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case texts?.dashboard.cards.one.icon:
        dispatch(setLoading(true));
        moodleRedirect()
          .then((res) => {
            dispatch(setLoading(false));
            window.open(res);
          })
          .catch((error) => {
            dispatch(setLoading(false));
            window.open(env.redirectClassroom, "_blank");
          });
        sendInfoTM(window, cardClassroomDashboardTag, "aula");
        break;
      case texts?.dashboard.cards.two.icon:
        history.push("/payment");
        sendInfoTM(window, cardPaymentDashboardTag, "pagos");
        break;
      case texts?.dashboard.cards.three.icon:
        window.open(env.redirectLibrary, "_blank");
        sendInfoTM(window, cardLibraryDashboardTag, "biblioteca");
        break;
      case texts?.dashboard.cards.four.icon:
        history.push("/procedures-main");
        break;
      case texts?.dashboard.cards.five.icon:
        history.push("/registration-subjects");
        break;
      default:
        break;
    }
  };

  return (
    <div className="cardsdash-container">
      {cardDash.map((data, index) => {
        return (
          <div className="card-dash" key={index}>
            <CardDash
              key={index}
              data={{
                ...data,
              }}
              onClick={() => {
                window.dataLayer.push({
                  idgeneral: "gtm",
                  seccion: "event_name",
                  elemento: "carddases",
                });
                handleClick(data.icon);
              }}
              onBtn={() => {
                window.dataLayer.push({
                  idgeneral: "gtm",
                  seccion: "event_name",
                  elemento: "carddasesbtn",
                });
                if (data.icon === "credit_card") {
                  window.open(env.videoPayment, "_blank");
                  sendInfoTM(window, cardVideoPaymentDashboardTag, "pagosvid");
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardsDashes;
