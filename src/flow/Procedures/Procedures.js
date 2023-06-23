import React, { useEffect, useState } from "react";
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import "./Procedures.scss";
import { ProceduresContext } from "./ProceduresContext";
import {
  stepsProcedures,
  typeflowsProcedures,
} from "../../constants/Procedures.constant";
import ProcedureLayout from "./components/ProcedureLayout/ProcedureLayout";
import { ModalProcedures } from "../../components/Modal/ModalProcedures/ModalProcedures";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { proceduresRequest } from "../../middlewares/proceduresMiddlewares/indexProceduresMiddleware";
import { getProceduresCostsService } from "../../middlewares/proceduresMiddlewares/proceduresCostsMiddleware";
import { ModalAccordion } from "../../components/Modal/ModalAccordion/ModalAccordion";
import { getProfileProceduresService } from "../../middlewares/proceduresMiddlewares/procedureMainMiddleware";
import { ModalExit } from "../../components/Modal/ModalExit/ModalExit";
import { setPathExitProcedures } from "../../actions/proceduresActions/proceduresAction";
import { unblockProcedures } from "../../helpers/unblock";
import { sendInfoTM } from "../../tagging/services/sendInfoTagManager";
import {
  modalProcedureBackEquivalenceStudiesTag,
  nextStepTwoEquivalenceStudiesTag,
} from "../../tagging/flows/procedures/equivalenceStudiesTag";
import {
  modalProcedureBackAcademicHistoryTag,
  modalProcedureNextAcademicHistoryTag,
} from "../../tagging/flows/procedures/academicHistoryTag";
import { certificateStudyVerifyTag } from "../../tagging/flows/procedures/certificateStudyTag";
import {
  modalVerifyBackStudyRecordTag,
  modalVerifyNextStudyRecordTag,
} from "../../tagging/flows/procedures/studyRecordTag";
import {
  modalVerifyBackReinstatementTag,
  modalVerifyNextReinstatementTag,
} from "../../tagging/flows/procedures/reinstatementTag";
import { ModalRequirementsProcedure } from "../../components/Modal/ModalRequirementsProcedure/ModalRequirementsProcedure";
import { ModalImage } from "../../components/Modal/ModalImage/ModalImage";

const Procedures = () => {
  const [steps, setSteps] = useState({
    ...stepsProcedures,
  });

  const history = useHistory();
  const [isModal, setIsModal] = useState({
    valid: false,
    info: null,
    file: null,
    type: null,
  });

  const [isModalExit, setIsModalExit] = useState({
    isShow: false,
    unblock: null,
  });

  const [isModalAcordeon, setIsModalAcordeon] = useState(false);
  const [isModalRequirements, setIsModalRequirements] = useState({
    isShow: false,
    info: []
  });
  const [isModalImage, setIsModalImage] = useState(false);
  const [isTabs,setIsTabs] = useState(true);
  const dispatch = useDispatch();
  const { proceduresAllOne,proceduresAllTwo } = useSelector((state) => state.procedures);
  const procedures = useSelector((state) => state.procedures);

  const handleStepsBody = (focus, titles ) => {
    setSteps((state) => {
      return {
        ...state,
        focus,
        titles
      };
    });
  };

  const handleSteps = (focus) => {
    setSteps((state) => {
      return {
        ...state,
        focus,
      };
    });
  };

  const handleAccordion = (state) => {
    setIsModalAcordeon(state);
  };

  const handleIsTabs = (isCheck) => {
    setIsTabs(isCheck);
  }

  const handleModalRequirements = (isShow,info) => {
    setIsModalRequirements({isShow,info});
  };

  const handleModalImage = (state) => {
    setIsModalImage(state);
  };

  const handleModalProcedures = (info) => {
    setIsModal(info);
  };
  const handleRequest = () => {
    setIsModal(false);
    dispatch(
      proceduresRequest(
        isModal.type,
        history,
        isModal.info,
        isModal.file,
        isModal.detailId
      )
    );
  };

  const [infoModal, setInfoModal] = useState({
    profile: null,
    information: null,
    file: null,
    title: null,
    cost: null,
  });
  const handleInfoModalProcedures = (info) => {
    setInfoModal(info);
  };
  useEffect(() => {
    let urlSplit = history.location.pathname.split("/");

    let procedureFlow = urlSplit[2];
    let unblock = history.block((location) => {
      if (unblockProcedures(location.pathname, procedureFlow)) {
        dispatch(setPathExitProcedures(location.pathname));
        setIsModalExit({
          isShow: true,
          unblock,
        });
        return false;
      }

      return true;
    });

    if (proceduresAllOne === null || proceduresAllTwo === null) {
      dispatch(getProfileProceduresService());
      dispatch(getProceduresCostsService());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="procedures-container">
        <HeaderApp />
        <ProceduresContext.Provider
          value={{
            steps,
            handleStepsBody,
            handleSteps,
            isModal,
            isTabs,
            handleModalProcedures,
            handleInfoModalProcedures,
            handleAccordion,
            handleModalRequirements,
            handleIsTabs,
            handleModalImage
          }}
        >
          <ProcedureLayout />
          <ModalExit
            isShow={isModalExit.isShow}
            onClose={() => {
              setIsModalExit((state) => {
                return {
                  ...state,
                  isShow: false,
                };
              });
            }}
            onNext={() => {
              isModalExit.unblock();
              setIsModalExit({
                isShow: false,
                unblock: null,
              });
              setPathExitProcedures(null);
              history.push(procedures.pathExit);
            }}
            flow={"procedures"}
          />
        </ProceduresContext.Provider>
        <ModalProcedures
          isShow={isModal.valid}
          outside={() => setIsModal(false)}
          onClose={() => {
            setIsModal(false);
            switch (isModal.type) {
              case typeflowsProcedures.certificateStudy:
                sendInfoTM(window, certificateStudyVerifyTag, "back");
                break;
              case typeflowsProcedures.equivalenceStudy:
                sendInfoTM(window, modalProcedureBackEquivalenceStudiesTag);
                break;
              case typeflowsProcedures.academyHistory:
                sendInfoTM(window, modalProcedureBackAcademicHistoryTag);
                break;
              case typeflowsProcedures.studyRecord:
                sendInfoTM(window, modalVerifyBackStudyRecordTag, "back");
                break;
              case typeflowsProcedures.reinstatement:
                sendInfoTM(window, modalVerifyBackReinstatementTag, "back");
                break;
              default:
                break;
            }
          }}
          onNext={() => {
            handleRequest();
            switch (isModal.type) {
              case typeflowsProcedures.certificateStudy:
                sendInfoTM(window, certificateStudyVerifyTag, "next");
                break;
              case typeflowsProcedures.equivalenceStudy:
                sendInfoTM(window, nextStepTwoEquivalenceStudiesTag);
                break;
              case typeflowsProcedures.academyHistory:
                sendInfoTM(window, modalProcedureNextAcademicHistoryTag);
                break;
              case typeflowsProcedures.studyRecord:
                sendInfoTM(window, modalVerifyNextStudyRecordTag, "next");
                break;
              case typeflowsProcedures.reinstatement:
                sendInfoTM(window, modalVerifyNextReinstatementTag, "next");
                break;
              default:
                break;
            }
          }}
          infoModal={infoModal}
        />
        <ModalAccordion
          isShow={isModalAcordeon}
          onClose={() => {
            handleAccordion(false);
          }}
          outside={() => handleAccordion(false)}
        />
        <ModalRequirementsProcedure
          isShow={isModalRequirements.isShow}
          info={isModalRequirements.info}
          onClose={() => setIsModalRequirements({
            isShow: false,
            info: []
          })}
          outside={() => setIsModalRequirements({
            isShow: false,
            info: []
          })}
        />
        <ModalImage
          isShow={isModalImage}
          onClose={() => {
            handleModalImage(false);
          }}
          outside={() => handleModalImage(false)}
        />
      </div>
    </>
  );
};

export default Procedures;
