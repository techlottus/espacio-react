import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  breadcrumbCalendar,
  downloadCalendar,
} from "../../constants/Procedures.constant";
import FooterApp from "../../shared/FooterApp/FooterApp";
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import { Button } from "@lottuseducation/design_system";
// import { Button } from "../Button/Button";
import "./Calendar.scss";
import { useContainerHeigh } from "../../hooks/contentHeight";
import { notiObs } from "../../observables/notificationObs";
import { downloadFile } from "../../helpers/download";
import { typesNoti } from "../../types/typeNoti";
import { sendInfoTM } from "../../tagging/services/sendInfoTagManager";
import { downloadCalendarTag } from "../../tagging/flows/procedures/calendarTag";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarService } from "../../middlewares/proceduresMiddlewares/calendarMiddleware";

const Calendar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [desktop, setDesktop] = useState(window.innerWidth > 991);
  const { texts } = useSelector((state) => state.texts);

  const { optionDesk, optionMobile } = useSelector((state) => state.calendar);

  const [options,setOptions] = useState({
    optionDesk: {},
    optionMobile: {}
  })

  const  [next, setNext] = useState(false);

  const { height } = useContainerHeigh(0);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  useEffect(() =>{
    if(next) {
      actionRedirectCalendar()
      setNext(false)
    }
  },[next])

  useEffect(() => {
    setOptions({
      optionDesk,
      optionMobile
    })
  },[optionDesk,optionMobile])

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    dispatch(getCalendarService());
    return () => window.removeEventListener("resize", updateMedia);
  }, []);
 
  const onItem = (e) => {
    switch (e.detail) {
      case "/":
        history.push(e.detail);
        break;
      case "/procedures-main":
        history.push(e.detail);
        break;
      default:
        break;
    }
  };

  const onBack = (e) => {
    history.push("/procedures-main");
  };

  const actionRedirectCalendar = ()=> {
      sendInfoTM(window, downloadCalendarTag, "dwnld");
      downloadFile(
        "calendario-utc.pdf",
        desktop ?
         options?.optionDesk?.urlPdf 
         : 
         options.optionMobile?.urlPdf
      )
        .then(() => {
          notiObs.next({
            type: typesNoti.success,
            text: texts?.procedures?.downloadCalendarSuccess,
          });
        })
        .catch(() => {
          notiObs.next({
            type: typesNoti.error,
            text: texts?.procedures?.downloadCalendarError,
          });
        });
  }

  return (
    <>
      <div
        className="calendar-container"
        style={{ minHeight: `calc(${height}px - 77px)` }}
      >
        <HeaderApp />
        <div className="contentheader">
          <div className="breadcrumbcalendar">
            <Breadcrumb
              data={breadcrumbCalendar}
              onItem={onItem}
              onBack={onBack}
            />
          </div>
        </div>
        <div className="contenttitle">
          <div className="calendartitle">
            <h2>{texts.procedures.calendarTitle}</h2>
          </div>
          <div className="downloadbtn">
            <Button
              data={downloadCalendar}
              onClick={() =>{
                setNext(true)
              }}
            />
          </div>
        </div>
        <div className="imagecalendar">
          {desktop ? (
            <>
              <img
                src={options?.optionDesk?.urlImageSymbol || ""}
                className="imgmarks"
                alt="img-marks"
              />
              <img
                src={options?.optionDesk?.urlImageCalendar || ""}
                className="imgcalendar"
                alt="img-calendar"
              />
            </>
          ) : (
            <>
              <img
                src={options.optionMobile?.urlImageSymbol || ""}
                className="imgmarks"
                alt="img-marks"
              />
              <img
                src={options.optionMobile?.urlImageCalendar || ""}
                className="imgcalendar"
                alt="img-calendar"
              />
            </>
          )}
        </div>
      </div>
      <FooterApp />
    </>
  );
};

export default Calendar;
