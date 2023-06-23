import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { typesRequestErrors } from "../../constants/error.constant";
import EmptyState from "../EmptyState/EmptyState";
import { getImageOfAssetsMark } from "../../helpers/getImages";
import { sendInfoTM } from "../../tagging/services/sendInfoTagManager";
import { closeSideBartTag } from "../../tagging/flows/procedures/SidebarTag";
import { useHistory } from "react-router";
import {
  handleSuccessSidebar,
  hanldeCardRequestSidebar,
  hanldeTableRequestSidebar,
  typeSliderbar,
} from "./bodySidebar/bodySidebar";

const Sidebar = ({ typeSlide='',show, onClose, outside }) => {
  const [isCheckRequest, setIsCheckRequest] = useState({
    valid: false,
    table: {},
  });
  const siderContent = useRef();
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const proceduresStore = useSelector((state) => state.procedures);
  const helpCenterStore = useSelector((state) => state.helpCenterDashboard);
  const [error, setError] = useState({
    isError: false,
    msg: null,
  });
  const { texts } = useSelector((state) => state.texts);
  const history = useHistory();

  useEffect(() => {
    switch(typeSlide) {
      case typeSliderbar.procedures:
        if (proceduresStore.requestInquiryAll !== null) {
          setCards([...proceduresStore.requestInquiryAll]);
        }
        break;
      case typeSliderbar.helpCenter:
        if (helpCenterStore.requestInquiryAll !== null) {
          setCards([...helpCenterStore.requestInquiryAll]);
        }
        break;
      default:
        break;
    }
   
  }, [proceduresStore.requestInquiryAll,helpCenterStore.requestInquiryAll]);

  useEffect(() => {
    if (
      proceduresStore.errors[typesRequestErrors.getRequestInquiryProcedures]
        .isError
    ) {
      setError({
        isError: true,
        msg: proceduresStore.errors[
          typesRequestErrors.getRequestInquiryProcedures
        ].msg,
      });
    }

    if (
      helpCenterStore.errors[typesRequestErrors.getRequestAllTicketsHelp]
        .isError
    ) {
      setError({
        isError: true,
        msg: helpCenterStore.errors[
          typesRequestErrors.getRequestAllTicketsHelp
        ].msg,
      });
    }

    return () => {
      setError({
        isError: false,
        msg: null,
      });
    };
  }, [proceduresStore.errors]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        siderContent.current &&
        !siderContent.current.contains(event.target) &&
        window.innerWidth > 991
      ) {
        outside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (show) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [show, proceduresStore.requestInquiryAll,helpCenterStore.requestInquiryAll]);

  const handleError = () => {
    return (
      <>
        <div className="sidebarbody">
          <EmptyState
            img={getImageOfAssetsMark(texts?.procedures?.images?.emptyError)}
            title={error.msg}
          />
        </div>
      </>
    ); 
  };


  const handleIsError = () => {
    return error.isError
      ? handleError()
      : handleSuccessSidebar(
        texts,
        isCheckRequest,
        dispatch,
        setIsCheckRequest,
        history,
        cards,
        hanldeTableRequestSidebar,
        hanldeCardRequestSidebar
        );
  };

  return show ? (
    <div className="sidebar-container">
      <div className="sidebarcontent" ref={siderContent}>
        <div className="sidebarheader">
          <div className="sidebarheadericon">
            <span
              className="material-icons icon iconleft"
              onClick={() => {
                setIsCheckRequest({
                  valid: false,
                  table: {},
                });
                onClose();
                sendInfoTM(window, closeSideBartTag);
              }}
            >
              close
            </span>
          </div>
        </div>
        {handleIsError()}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Sidebar;
