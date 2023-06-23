import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Breadcrumb } from "../../../../../components/Breadcrumb/Breadcrumb";
import {
  breadcrumbInfo,
  btnInfoProcedures,
  btnInfoProceduresDownload,
  DownloadInformationActionableCatalog,
  feedbackInfoProcedures,
  FeedbackInformationActionableCatalog,
  typeflowsProcedures,
  typeRequestStatus,
} from "../../../../../constants/Procedures.constant";
import { Button } from "../../../../../components/Button/Button";
import "./Information.scss";
import {
  actionConfigProcedure,
  getTitleButtonInfo,
  getTitleButtonInfoDownload,
  getTitleInfoFeedback,
  setConfigInfoProcedures,
} from "../../../../../helpers/proceduresActions";
import { useSelector } from "react-redux";
import { ProceduresContext } from "../../../ProceduresContext";
import { downloadFile } from "../../../../../helpers/download";
import { notiObs } from "../../../../../observables/notificationObs";
import { typesNoti } from "../../../../../types/typeNoti";
import env from "../../../../../enviroment/environment";
import { sendInfoTM } from "../../../../../tagging/services/sendInfoTagManager";
import { requirementsEquivalenceStudiesTag } from "../../../../../tagging/flows/procedures/equivalenceStudiesTag";
import { certificateStudyRequiTag } from "../../../../../tagging/flows/procedures/certificateStudyTag";
import { downloadReinstatementTag } from "../../../../../tagging/flows/procedures/reinstatementTag";
import { Feedback } from "../../../../../components/Feedback/Feedback";
import { typesModalityBanner } from "../../../../../types/typesProcedures";
import { getValuesOfAuth } from "../../../../../helpers/auth";

const Information = ({ type }) => {
  const history = useHistory();

  const [textsInfo, setTexts] = useState({
    title: "",
    text: "",
    price: "",
  });

  const { handleAccordion, handleModalRequirements, handleModalImage } =
    useContext(ProceduresContext);

  const { stepsDegreeOnlineRequirement, stepsDegreeGraduateRequirement } =
    useSelector((state) => state.proceduresDegree);

  const [breadCrumb, setBreadCrumb] = useState({
    ...breadcrumbInfo,
  });

  const [modalRequirementsInfo, setModalRequirementsInfo] = useState({});

  const { proceduresAllOne, proceduresAllTwo } = useSelector(
    (state) => state.procedures
  );

  const [buttonInfo, setButtonInfo] = useState({
    ...btnInfoProcedures,
  });

  const [buttonInfoDownloadAdmision, setButtonInfoDownloadAdmision] = useState([
    {
      ...btnInfoProceduresDownload,
    },
  ]);

  const [buttonInfoDownload, setButtonInfoDownload] = useState({
    ...btnInfoProceduresDownload,
  });

  const [feedbackInfo, setFeedbackInfo] = useState({
    ...feedbackInfoProcedures,
  });

  const [configActions, setConfigAction] = useState([]);

  const { texts } = useSelector((state) => state.texts);

  const [feedbackText, setFeedbackText] = useState({});

  const [downloadDataAction, setDownloadDataAction] = useState({});

  const [flowType, setFlowType] = useState("");

  useEffect(() => {
    if (type.flow === typeflowsProcedures.admissionCertificate) {
      setButtonInfoDownloadAdmision(
        getTitleButtonInfoDownload(type.flow, texts).map((title) => {
          return {
            ...btnInfoProceduresDownload,
            title,
          };
        })
      );
    }
    setButtonInfo({
      ...btnInfoProcedures,
      title: getTitleButtonInfo(type.flow, texts),
    });
    setButtonInfoDownload({
      ...btnInfoProceduresDownload,
      title: getTitleButtonInfoDownload(type.flow, texts),
    });
    setFeedbackInfo({
      ...feedbackInfoProcedures,
      title: getTitleInfoFeedback(type.flow, texts),
    });
    setConfigInfoProcedures(
      type,
      setTexts,
      setBreadCrumb,
      breadCrumb,
      proceduresAllOne && proceduresAllTwo
        ? [...proceduresAllOne, ...proceduresAllTwo]
        : [],
      texts
    );
    setFlowType(type.flow);
    setConfigAction(actionConfigProcedure(type.flow));
    setFeedbackText(FeedbackInformationActionableCatalog[type.flow]);
    setDownloadDataAction(DownloadInformationActionableCatalog[type.flow]);
  }, [type.flow, proceduresAllOne, proceduresAllTwo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setModalRequirementsInfo({
      stepsDegreeGraduateRequirement,
      stepsDegreeOnlineRequirement,
    });
  }, [stepsDegreeOnlineRequirement, stepsDegreeGraduateRequirement]);

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

  const renderActions = (config) => {
    const allTypes = config.reduce((prev, curr, index) => {
      if (!prev.hasOwnProperty(curr)) {
        prev = { ...prev, [curr]: [index] };
        return prev;
      }
      prev = { ...prev, [curr]: [...prev[curr], index] };
      return prev;
    }, {});
    return config.map((type, index) => {
      const positionData = allTypes[type].reduce((prev, curr, i) => {
        if (curr === index) {
          return i;
        }
        return prev;
      }, 0);
      switch (type) {
        case "download":
          let buttonData = { ...buttonInfoDownload };
          if (flowType === typeflowsProcedures.admissionCertificate) {
            buttonData = { ...buttonInfoDownloadAdmision[positionData] };
          }
          const dataDownload = downloadDataAction[positionData];
          return (
            <div key={index} className="info-btn">
              <Button
                data={buttonData}
                onClick={() => {
                  switch (flowType) {
                    case typeflowsProcedures.scholarship:
                      return downloadFile(
                        "solicitud-beca.pdf",
                        getValuesOfAuth().urlsBecas?.urlSolicitud
                      )
                        .then(() => {
                          notiObs.next({
                            type: typesNoti.success,
                            text: texts.procedures
                              .downloadPDFSuccessReinstatement,
                          });
                        })
                        .catch(() => {
                          notiObs.next({
                            type: typesNoti.error,
                            text: texts.procedures
                              .downloadPDFErrorReinstatement,
                          });
                        });
                      break;
                  }
                  downloadFile(dataDownload.name, dataDownload.path)
                    .then(() => {
                      notiObs.next({
                        type: typesNoti.success,
                        text: dataDownload.successMsg,
                      });
                    })
                    .catch(() => {
                      notiObs.next({
                        type: typesNoti.error,
                        text: dataDownload.errorMsg,
                      });
                    });
                  sendInfoTM(window, downloadReinstatementTag);
                }}
              />
            </div> 
          );
          break;

        case "modal":
          return (
            <div key={index} className="info-btn">
              <Button
                data={buttonInfo}
                onClick={() => {
                  switch (flowType) {
                    case typeflowsProcedures.certificateStudy:
                      sendInfoTM(window, certificateStudyRequiTag);
                      return handleAccordion(true);
                      break;
                    case typeflowsProcedures.equivalenceStudy:
                      handleAccordion(true);
                      sendInfoTM(window, requirementsEquivalenceStudiesTag);
                      break;
                    case typeflowsProcedures.degreeInProgress:
                      setModalRequirementsInfo((state) => {
                        handleModalRequirements(
                          true,
                          state?.stepsDegreeOnlineRequirement
                        );
                        return { ...state };
                      });
                      break;
                    case typeflowsProcedures.degreeGraduate:
                      setModalRequirementsInfo((state) => {
                        handleModalRequirements(
                          true,
                          state?.stepsDegreeGraduateRequirement
                        );
                        return { ...state };
                      });
                      break;
                    case typeflowsProcedures.scholarship:
                      handleModalImage(true);
                      break;
                    default:
                      break;
                  }
                }}
              />
            </div>
          );
          break;

        case "feedback":
          const dataFeedback = feedbackText[positionData];
          return (
            <div key={index} className="info-btn">
              <Feedback data={feedbackInfo} text={dataFeedback?.description} />
            </div>
          );
          break;
        default:
          return null;
      }
    });
  };

  return (
    <>
      <div className="info-view">
        <div className="infoview-container">
          <div className="bread-info">
            <Breadcrumb data={breadCrumb} onItem={onItem} onBack={onBack} />
          </div>
          <div className="info-title">
            <h2>{textsInfo.title}</h2>
          </div>
          <div className="info-text">
            <p>{textsInfo.text}</p>
          </div>
          <div className="info-price">
            <p>{textsInfo.price}</p>
          </div>
          {renderActions(configActions)}
        </div>
      </div>
    </>
  );
};

export default Information;
