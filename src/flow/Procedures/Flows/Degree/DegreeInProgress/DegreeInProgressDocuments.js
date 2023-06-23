import React, { useContext, useEffect, useState } from "react";
import "./DegreeInProgressDocuments.scss";
import { Button } from "../../../../../components/Button/Button";
import { Upload } from "../../../../../components/Upload/Upload";
import { Feedback } from "../../../../../components/Feedback/Feedback";
import { useSelector } from "react-redux";
import {
  backBtnDegree,
  feedbackNoticeDegree,
  linkCheckCurp,
  maxSizeFileInDegree,
  requestBtnDegree,
  requirementDegreeApplicationLink,
  requirementInProcessDegreeLink,
  requirementsGuideForPhotographyLink,
  uploadCurp,
  uploadPhoto,
  uploadPhotoIneBack,
  uploadPhotoIneFront,
  uploadProcedureDegree,
} from "../../../../../constants/ProceduresDegree.constant";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";
import { ProceduresContext } from "../../../ProceduresContext";
import { useFormBuilder } from "../../../../../hooks/useForm";
import { setInfoUpload } from "../../../Utils/setInfoUpload";
import { setInfoModalProcedure } from "../../../Utils/infoModalProcedures";
import { getDegreeInProgressDocumentationValidators } from "../../../../../validators/procedures/degreeValidator";
import { formatDocsModalDegreeProcedure, formatInfoModalDegreeProcedure } from "../../../Utils/formatInformationProcedures";
import { Link } from "../../../../../components/Link/Link";
import env from "../../../../../enviroment/environment";
import { downloadFile } from "../../../../../helpers/download";

const DegreeInProgressDocuments = () => {
  const {
    handleSteps,
    handleModalProcedures,
    handleInfoModalProcedures,
    handleModalDegree,
  } = useContext(ProceduresContext);
  const history = useHistory();

  const { texts } = useSelector((state) => state.texts);
  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresDegree.degreeInProgress
  );

  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const actionValid = () => {
    setInfoModalProcedure(
      handleModalProcedures,
      handleInfoModalProcedures,
      dataStore,
      form.value,
      formatDocsModalDegreeProcedure(form.value),
      formatInfoModalDegreeProcedure(dataStore, infoStore),
      typeflowsProcedures.degreeInProgress
    );
  };

  const {
    form,
    setForm,
    setNext: setConfirm,
    nextBtn,
  } = useFormBuilder(requestBtnDegree, actionValid);

  const [fileError, setFileError] = useState({
    procedureDegree: {
      hasError: false,
      errorMessage: null,
    },
    photo: {
      hasError: false,
      errorMessage: null,
    },
    ineFront: {
      hasError: false,
      errorMessage: null,
    },
    ineBack: {
      hasError: false,
      errorMessage: null,
    },
    curp: {
      hasError: false,
      errorMessage: null,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!dataStore.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.degreeInProgress}/${typeStagesProcedures.information}`
      );
    }
    handleSteps(1);
    setForm(getDegreeInProgressDocumentationValidators());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(
        changeUpload.info,
        form,
        setFileError,
        maxSizeFileInDegree,
        texts
      );
      setChangeUpload({
        valid: false,
        info: null,
      });
    }
  }, [changeUpload]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = (e) => {
    setChangeUpload({
      valid: true,
      info: e.detail,
    });
  };

  return (
    <>
      <div className="degreefile-content">
        <div className="degreenotice">
          <Feedback
            data={feedbackNoticeDegree}
            html={() => {
              return (
                <div>
                  Es muy importante que todos tus documentos cumplan con estos
                  <span
                    className="degreenoticelink"
                    onClick={() => {
                      handleModalDegree(true);
                    }}
                  >
                    requisitos
                  </span>
                  para ser aceptados.
                </div>
              );
            }}
          />
        </div>
        <div className="degreedownloadlink">
          <Link
            data={requirementDegreeApplicationLink}
            onClick={() => {
              downloadFile(
                "Guía de requisitos para solicitud de Titulación",
                infoStore?.filesLinks.requirementsGuideForDegreeApplication
              );
            }}
          />
        </div>
        <div className="degreedownloadlink">
          <Link
            data={requirementInProcessDegreeLink}
            onClick={() => {
              downloadFile(
                "Solicitud en tramite Titulación",
                infoStore?.filesLinks.applicationInProcessDegree
              );
            }}
          />
        </div>
        <div className="degreedownloadlink">
          <Link
            data={requirementsGuideForPhotographyLink}
            onClick={() => {
              downloadFile(
                "Guía de requisitos para fotografía",
                infoStore?.filesLinks.requirementsGuideForPhotography
              );
            }}
          />
        </div>
        <div className="degreenoticeupload">
          {texts?.procedures?.uploadDocText}
        </div>
        <div className="degreeuploadtext">
          {texts?.procedures?.degreeInProgress.uploadProcedureDegree}
        </div>
        <div className="degreeupload">
          <Upload
            data={uploadProcedureDegree}
            hasError={fileError.procedureDegree.hasError}
            errorMessage={fileError.procedureDegree.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
              valid: true,
              info: {id: uploadProcedureDegree.id, isError: true}
              });
            }}
          />
        </div>
        <div className="degreeuploadtext">
          {texts?.procedures?.degreeInProgress.uploadPhoto}
        </div>
        <div className="degreeupload">
          <Upload
            data={uploadPhoto}
            hasError={fileError.photo.hasError}
            errorMessage={fileError.photo.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadPhoto.id, isError: true}
              });
            }}
          />
        </div>
        <div className="degreeuploadtext">
          {texts?.procedures?.degreeInProgress.uploadIne}
        </div>
        <div className="degreeupload">
          <Upload
            data={uploadPhotoIneFront}
            hasError={fileError.ineFront.hasError}
            errorMessage={fileError.ineFront.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadPhotoIneFront.id, isError: true}
              });
            }}
          />
        </div>
        <div className="degreeupload">
          <Upload
            data={uploadPhotoIneBack}
            hasError={fileError.ineBack.hasError}
            errorMessage={fileError.ineBack.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadPhotoIneBack.id, isError: true}
              });
            }}
          />
        </div>
        <div className="degreeuploadtext">
          {texts?.procedures?.degreeInProgress.uploadCurp}
        </div>
        <div className="degreeupload">
          <div className="degreelinkcurp">
            <Link
              data={{
                ...linkCheckCurp,
                title: texts?.procedures?.degreeInProgress.checkCurp,
              }}
              onClick={() => window.open(env.redirectCurp, "_blank")}
            />
          </div>
          <Upload
            data={uploadCurp}
            hasError={fileError.curp.hasError}
            errorMessage={fileError.curp.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid:true,
                info: {id: uploadCurp.id, isError: true}
              });
            }}
          />
        </div>
      </div>
      <div className="degreedocbtns">
        <div className="degreedocbtn">
          <Button
            data={{
              ...backBtnDegree,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              history.push(
                `/procedures-flows/${typeflowsProcedures.degreeInProgress}/${typeStagesProcedures.information}`
              );
            }}
          />
        </div>
        <div className="degreedocbtn">
          <Button
            data={nextBtn}
            onClick={() => {
              setConfirm(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DegreeInProgressDocuments;
