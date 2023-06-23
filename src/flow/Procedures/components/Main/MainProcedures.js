import React, { useState } from "react";
import { useHistory } from "react-router";
import { Breadcrumb } from "../../../../components/Breadcrumb/Breadcrumb";
import { Button } from "../../../../components/Button/Button";
import { CardProcedure } from "../../../../components/Card/CardProcedure";
import {
  breadcrumb,
  btnCalendar,
  btnConsult,
  selectTypeSocialServiceProcedures,
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import "./MainProcedures.scss";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { ModalSolicitude } from "../../../../components/Modal/ModalSolicitude/ModalSolicitude";
import { useEffect } from "react";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { useDispatch, useSelector } from "react-redux";
import { getProceduresCostsService } from "../../../../middlewares/proceduresMiddlewares/proceduresCostsMiddleware";
import { getProfileProceduresService } from "../../../../middlewares/proceduresMiddlewares/procedureMainMiddleware";
import { setConceptDefault } from "../../../../actions/paymentAction";
import { getRequestInquiryService } from "../../../../middlewares/proceduresMiddlewares/requestInquiryMiddleware";
import { typesRequestErrors } from "../../../../constants/error.constant";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import { useContainerHeigh } from "../../../../hooks/contentHeight";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import {
  confirmModalCartEquivalenceStudiesTag,
  confirmModalCloseEquivalenceStudiesTag,
} from "../../../../tagging/flows/procedures/equivalenceStudiesTag";
import {
  confirmModalCartAcademicHistoryTag,
  confirmModalCloseAcademicHistoryTag,
} from "../../../../tagging/flows/procedures/academicHistoryTag";
import { btnCalendarProceduresTag } from "../../../../tagging/flows/procedures/proceduresTag";
import { certificateStudyConfirmTag } from "../../../../tagging/flows/procedures/certificateStudyTag";
import {
  modalConfirmCartStudyRecordTag,
  modalConfirmCloseStudyRecordTag,
} from "../../../../tagging/flows/procedures/studyRecordTag";
import { modalConfirmCloseReinstatementTag } from "../../../../tagging/flows/procedures/reinstatementTag";
import { getImageOfAssetsMark } from "../../../../helpers/getImages";
import { btnSideBartTag } from "../../../../tagging/flows/procedures/SidebarTag";
import { typeSliderbar } from "../../../../components/Sidebar/bodySidebar/bodySidebar";
import { ModalSelectProcedure } from "../../../../components/Modal/ModalSelectProcedure/ModalSelectProcedure";
import { setDegreeTypeId } from "../../../../actions/proceduresActions/degreeAction";
import { setSocialServiceTypeId } from "../../../../actions/proceduresActions/socialServiceAction";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { ModalDegreeDocCheck } from "../../../../components/Modal/ModalDegreeDocCheck/ModalDegreeDocCheck";
import env from "../../../../enviroment/environment";
import { typesMark } from "../../../../types/typesMark";
import { typesDegree, typesModalityBanner } from "../../../../types/typesProcedures";

import { Button as LButton } from "@lottuseducation/design_system"


const MainProcedures = () => {
  const { height } = useContainerHeigh(0);

  const history = useHistory();
  const dispatch = useDispatch();

  const [noTicket, setTicket] = useState({
    ticket: null,
    id: null,
    isShowButton: false,
    type: null,
  });

  const { texts } = useSelector((state) => state.texts);
  const { data: socialServiceData } = useSelector(
    (state) => state.proceduresSocialService
  );

  const { data: degreeData } = useSelector((state) => state.proceduresDegree);

  const [errorSolicitude, setIsErrorSolicitude] = useState({
    error: false,
    message: null,
  });
  const [isModalSolicitude, setIsModalSolicitude] = useState(false);
  const [isModalSelectProcedure, setIsModalSelectProcedure] = useState({
    isShow: false,
    typeProcedure: [],
    title: "",
  });
  const proceduresStore = useSelector((state) => state.procedures);
  const [error, setError] = useState({
    isError: false,
    msg: null,
  });
  const [optionsProcedures, setOptionsProcedures] = useState({
    optionsOne: [],
    optionsTwo: [],
  });
  const [isModalDegreeDoc, setIsModalDegreeDoc] = useState({
    isShow: false,
    titleCheck: "",
    html: "",
  });

  const handlerClearHistory = () => {
    let state = { ...history.location.state };
    delete state.status;
    history.replace({ ...history.location, state });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    resetFlowProcedures(dispatch);
    if (
      proceduresStore.proceduresAllOne === null &&
      proceduresStore.proceduresAllTwo === null
    ) {
      dispatch(getProfileProceduresService());
      dispatch(getProceduresCostsService());
    }

    if (history.location.state && history.location.state.error) {
      setIsErrorSolicitude({
        error: history.location.state.error,
        message: history.location.state.errorMessage,
      });
      setIsModalSolicitude(true);
    }

    if (history.location.state && history.location.state.status) {
      setTicket({
        ticket: history.location.state.status,
        id: history.location.state.id,
        isShowButton: history.location.state.isPayment,
        type: history.location.state.type,
      });
      setIsModalSolicitude(true);
    }

    history.location.state = null;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (proceduresStore.errors[typesRequestErrors.getCostsProcedures].isError) {
      setError({
        isError: true,
        msg: proceduresStore.errors[typesRequestErrors.getCostsProcedures].msg,
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
    if (proceduresStore.proceduresAllOne && proceduresStore.proceduresAllOne) {
      setOptionsProcedures({
        optionsOne: proceduresStore.proceduresAllOne,
        optionsTwo: proceduresStore.proceduresAllTwo,
      });
    }
  }, [proceduresStore.proceduresAllOne, proceduresStore.proceduresAllTwo]);

  const onItem = (e) => {
    if (e.detail === "/") {
      history.push(e.detail);
    }
  };

  const onBack = (e) => {
    history.push("/");
  };

  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [next, setNext] = useState({
    isAction: false,
    card: null,
  });

  const setEnableDegree = (type) => {
    switch (type) {
      case typesDegree.onlineDegree:
      case typesDegree.degreeTraditional:
        return getValuesOfAuth().degree.inProgress.access;
      case typesDegree.graduateDegree:
        return getValuesOfAuth().degree.graduates.access;
      default:
        return false;
    }
  };

  const handleClickCardProcedure = (card) => {
    let items = [];
    if (!card?.disabled) {
      switch (card?.type) {
        case typeflowsProcedures.degree:
          items = degreeData.map((e) => {
            return {
              ...selectTypeSocialServiceProcedures[0],
              id:  (e?.acrom === "degreeTraditional" ? "degreeInProgress": e?.acrom) || "",
              text: e?.label || "",
              enable: setEnableDegree(e?.name),
            };
          });
          setIsModalSelectProcedure({
            isShow: true,
            typeProcedure: [...items],
            title: "¿Cómo quieres realizar tu titulación?",
          });
          break;
        case typeflowsProcedures.socialService:
          items = socialServiceData?.socialServiceTypes?.map((e) => {
            return {
              ...selectTypeSocialServiceProcedures[0],
              id: e?.acrom || "",
              text: e?.type || "",
              enable: true
            };
          });
          setIsModalSelectProcedure({
            isShow: true,
            typeProcedure: [...items],
            title: "¿Cómo quieres realizar tu servicio social?",
          });
          break;
        default:
          sendInfoTM(window, card?.tag);
          history.push(card.path);
          break;
      }
    }
  };

  useEffect(() => {
    if (next.isAction) {
      handleClickCardProcedure(next.card);
      setNext({
        isAction: false,
        card: null,
      });
    }
  }, [next]);

  return (
    <>
      <HeaderApp />
      <div
        className="main-procedures-container"
        style={{ minHeight: `calc(${height}px - 77px)` }}
      >
        <div className="breadcrumb">
          <Breadcrumb data={breadcrumb} onItem={onItem} onBack={onBack} />
        </div>
        <div>
          <h2 className="procedures-title">
            {texts?.procedures?.mainProceduresTitle}
          </h2>
        </div>
        <div className="procedures-btns">
          <div className="procedures-btn">
            <LButton
              {...btnCalendar}
              onClick={() => {
                sendInfoTM(window, btnCalendarProceduresTag);
                history.push("/school-calendar");
              }}
            />
          </div>
          <div className="procedures-btn">
            <LButton
              {...btnConsult}
              onClick={() => {
                dispatch(getRequestInquiryService());
                setIsShowSidebar(!isShowSidebar);
                sendInfoTM(window, btnSideBartTag);
              }}
            />
          </div>
        </div>
        <Sidebar
          typeSlide={typeSliderbar.procedures}
          show={isShowSidebar}
          onClose={() => setIsShowSidebar(!isShowSidebar)}
          outside={() => setIsShowSidebar(false)}
        />
        {error.isError ? (
          <EmptyState
            img={getImageOfAssetsMark(texts?.procedures?.images?.errorNotData)}
            title={error.msg}
          />
        ) : (
          <>
            <div className="maincardprocedures">
              {optionsProcedures.optionsOne.map((card, i) => {
                return (
                  <div key={i} className="maincardprocedure">
                    <CardProcedure
                      data={card}
                      text={card.content.text}
                      price={card.content.price}
                      onClick={() => {
                        if (card?.urlOpenOut) {
                          window.open(card?.urlOpenOut);
                        } else {
                          setNext({
                            isAction: true,
                            card,
                          });
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
            {env.mark === typesMark.ula ? (
              <>
                <h1 className="mainprocedurestitle">
                  {texts?.procedures?.degreeProcedureGraduate}
                </h1>
                <div className="maincardprocedures">
                  {optionsProcedures.optionsTwo.map((card, i) => {
                    return (
                      <div key={i} className="maincardprocedure">
                        <CardProcedure
                          data={card}
                          text={card.content.text}
                          price={card.content.price}
                          onClick={() => {
                            setNext({
                              isAction: true,
                              card,
                            });
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
      <ModalSelectProcedure
        titleModal={isModalSelectProcedure.title}
        isShow={isModalSelectProcedure.isShow}
        typeProcedures={isModalSelectProcedure.typeProcedure}
        onAction={(id) => {
          const degreePermissions = getValuesOfAuth().degree;
          switch (id) {
            case typeflowsProcedures.degreeInProgress:
              if (typeof degreeData === "object") {
                let typeDegree = {};
                if(typesModalityBanner.school === getValuesOfAuth().typeModality) {
                  let idAlt = "degreeTraditional"
                  typeDegree = degreeData.find((e) => e?.acrom === idAlt);
                }
                else {
                  typeDegree = degreeData.find((e) => e?.acrom === id);
                }
                
                dispatch(setDegreeTypeId(typeDegree?.recordTypeId));
              }

              if (
                degreePermissions?.inProgress?.isDocsValid &&
                degreePermissions?.inProgress?.isTotalCredit
              ) {
                history.push(
                  `/procedures-flows/${id}/${typeStagesProcedures.information}`
                );
              } else if (!degreePermissions?.inProgress?.isDocsValid) {
                setIsModalSelectProcedure((state) => {
                  return {
                    ...state,
                    isShow: false,
                  };
                });
                setIsModalDegreeDoc({
                  isShow: true,
                  titleCheck: "Tus documentos no se han validado",
                  html: () => {
                    return (
                      <div className="modaldegreecheck">
                        <p className="textdegreecheck">
                          {texts?.procedures?.degreeDoc?.startText}
                        </p>
                        <span className="docdegreecheck">
                          {texts?.procedures?.degreeDoc?.docOne}
                        </span>
                        <span className="docdegreecheck">
                          {texts?.procedures?.degreeDoc?.docTwo}
                        </span>
                        <p className="textdegreecheck">
                          {texts?.procedures?.degreeDoc?.endText}
                        </p>
                      </div>
                    );
                  },
                });
              } else if (!degreePermissions?.inProgress?.isTotalCredit) {
                setIsModalSelectProcedure((state) => {
                  return {
                    ...state,
                    isShow: false,
                  };
                });
                setIsModalDegreeDoc({
                  isShow: true,
                  titleCheck: "Creditos insuficientes",
                  html: () => {
                    return (
                      <div className="modaldegreecheck">
                        <p className="textdegreecheck">
                          {texts?.procedures?.degreeCredits?.startText}
                        </p>
                        <p className="textdegreecheck">
                          {texts?.procedures?.degreeCredits?.endText}
                        </p>
                      </div>
                    );
                  },
                });
              }
              break;
            case typeflowsProcedures.degreeGraduate:
              if (typeof degreeData === "object") {
                const typeDegree = degreeData.find((e) => e?.acrom === id);
                dispatch(setDegreeTypeId(typeDegree?.recordTypeId));
              }

              if (
                degreePermissions?.graduates?.isDocsValid &&
                degreePermissions?.graduates?.isTotalCredit
              ) {
                history.push(
                  `/procedures-flows/${id}/${typeStagesProcedures.information}`
                );
              } else if (!degreePermissions?.graduates?.isDocsValid) {
                setIsModalSelectProcedure((state) => {
                  return {
                    ...state,
                    isShow: false,
                  };
                });
                setIsModalDegreeDoc({
                  isShow: true,
                  titleCheck: "Tus documentos no se han validado",
                  html: () => {
                    return (
                      <div className="modaldegreecheck">
                        <p className="textdegreecheck">
                          {texts?.procedures?.degreeDoc?.startText}
                        </p>
                        <span className="docdegreecheck">
                          {texts?.procedures?.degreeDoc?.docOne}
                        </span>
                        <span className="docdegreecheck">
                          {texts?.procedures?.degreeDoc?.docTwo}
                        </span>
                        <p className="textdegreecheck">
                          {texts?.procedures?.degreeDoc?.endText}
                        </p>
                      </div>
                    );
                  },
                });
              } else if (!degreePermissions?.graduates?.isTotalCredit) {
                setIsModalSelectProcedure((state) => {
                  return {
                    ...state,
                    isShow: false,
                  };
                });
                setIsModalDegreeDoc({
                  isShow: true,
                  titleCheck: "Creditos insuficientes",
                  html: () => {
                    return (
                      <div className="modaldegreecheck">
                        <p className="textdegreecheck">
                          {texts?.procedures?.degreeCredits?.startText}
                        </p>
                        <p className="textdegreecheck">
                          {texts?.procedures?.degreeCredits?.endText}
                        </p>
                      </div>
                    );
                  },
                });
              }
              break;
            case typeflowsProcedures.ulaInstitutionSocialService:
            case typeflowsProcedures.registerProgramorInstitute:
            case typeflowsProcedures.governmentEmployee:
            case typeflowsProcedures.elderOrIllSocialService:
              dispatch(setSocialServiceTypeId(id));
              history.push(
                `/procedures-flows/${id}/${typeStagesProcedures.information}`
              );
              break;
          }
        }}
        outside={() =>
          setIsModalSelectProcedure({
            ...isModalSelectProcedure,
            isShow: false,
          })
        }
        onClose={() =>
          setIsModalSelectProcedure({
            ...isModalSelectProcedure,
            isShow: false,
          })
        }
      />

      <ModalSolicitude
        isShow={isModalSolicitude}
        outside={() => {
          setIsModalSolicitude(false);
          handlerClearHistory();
        }}
        onClose={() => {
          handlerClearHistory();
          setIsModalSolicitude(false);
          switch (noTicket.type) {
            case typeflowsProcedures.certificateStudy:
              sendInfoTM(window, certificateStudyConfirmTag, "close");
              break;
            case typeflowsProcedures.equivalenceStudy:
              sendInfoTM(window, confirmModalCloseEquivalenceStudiesTag);
              break;
            case typeflowsProcedures.academyHistory:
              sendInfoTM(window, confirmModalCloseAcademicHistoryTag);
              break;
            case typeflowsProcedures.studyRecord:
              sendInfoTM(window, modalConfirmCloseStudyRecordTag, "close");
              break;
            case typeflowsProcedures.reinstatement:
              sendInfoTM(window, modalConfirmCloseReinstatementTag, "close");
              break;
            case typeflowsProcedures.degree:
              break;
            case typeflowsProcedures.scholarship:
              break;
            case typeflowsProcedures.revalidateStudy:
              break;
            default:
              break;
          }
        }}
        isShowButton={noTicket.isShowButton}
        noTicket={noTicket}
        isError={errorSolicitude}
        onNext={() => {
          handlerClearHistory();
          dispatch(setConceptDefault(noTicket.id));
          history.push("/payment");
          switch (noTicket.type) {
            case typeflowsProcedures.certificateStudy:
              sendInfoTM(window, certificateStudyConfirmTag, "card");
              break;
            case typeflowsProcedures.equivalenceStudy:
              sendInfoTM(window, confirmModalCartEquivalenceStudiesTag);
              break;
            case typeflowsProcedures.academyHistory:
              sendInfoTM(window, confirmModalCartAcademicHistoryTag);
              break;
            case typeflowsProcedures.studyRecord:
              sendInfoTM(window, modalConfirmCartStudyRecordTag, "cart");
              break;
            case typeflowsProcedures.reinstatement:
              sendInfoTM(window, modalConfirmCloseReinstatementTag, "cart");
              break;
            case typeflowsProcedures.degree:
              break;
            case typeflowsProcedures.scholarship:
              break;
            case typeflowsProcedures.revalidateStudy:
              break;
            default:
              break;
          }
        }}
      />
      <ModalDegreeDocCheck
        isShow={isModalDegreeDoc.isShow}
        titleCheck={isModalDegreeDoc.titleCheck}
        html={isModalDegreeDoc.html}
        onClose={() =>
          setIsModalDegreeDoc({ ...isModalDegreeDoc, isShow: false })
        }
        outside={() =>
          setIsModalDegreeDoc({ ...isModalDegreeDoc, isShow: false })
        }
        accept={() => setIsModalDegreeDoc((state) => !state)}
      />
      <FooterApp />
    </>
  );
};

export default MainProcedures;
