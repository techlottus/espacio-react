import React, { useEffect, useState } from "react";

import "./CardRequest.scss";
import { Label } from "../Label/Label";
import { Button } from "../Button/Button";
import { btnSidebar } from "../../constants/Sidebar.constant";
import { useSelector } from "react-redux";
import { btnPaySideBartTag } from "../../tagging/flows/procedures/SidebarTag";
import { sendInfoTM } from "../../tagging/services/sendInfoTagManager";

export const CardRequest = ({
  data,
  label,
  isButton,
  handleRequest,
  onCard,
}) => {
  const cardRef = React.createRef();
  const [dataLabel, setDataLabel] = useState({});
  const { texts } = useSelector((state) => state.texts);

  useEffect(() => {
    cardRef.current.data = {
      icon: data.icon || "",
      title: data.title || "",
      text: data.text || "",
      price: data.price || 0,
      disabled: data.disabled,
      ticket: data.ticket || "",
      date: data.date || "",
      isContent: data.isContent,
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDataLabel(label);
  }, [label]);

  useEffect(() => {
    cardRef.current.addEventListener("onClick", onCard);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-icon style={{ width: "100%", height: "100%" }} ref={cardRef}>
        <div content="" className="cardrequestcontainer">
          <p className="ticketrequest">
            {texts?.procedures?.cardRequest?.ticketNo} {data?.ticket || ""}
          </p>
          <p className="daterequest">
            {texts?.procedures?.cardRequest?.solicitudeDate} {data?.date || ""}
          </p>
          <div className="labelcard">
            <Label data={dataLabel} />
          </div>
          {isButton ? (
            <Button
              data={btnSidebar}
              onClick={(e) => {
                handleRequest(e);
                sendInfoTM(window, btnPaySideBartTag, "pay");
              }}
            />
          ) : (
            ""
          )}
        </div>
      </lottus-card-icon>
    </>
  );
};
