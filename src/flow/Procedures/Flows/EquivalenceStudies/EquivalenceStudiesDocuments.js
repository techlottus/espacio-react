import React, { useContext, useEffect, useState } from "react";
import "./EquivalenceStudiesDocuments.scss";
import { Button } from "../../../../components/Button/Button";
import { Upload } from "../../../../components/Upload/Upload";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { useSelector } from "react-redux";
import {
  backBtnEquivalenceStudy,
  feedbackNoticeEquivalenceStudy,
  maxSizeFileInEquivalenceStudy,
  requestBtnEquivalenceStudy,
  uploadBirthCert,
  uploadEquivalenceCert,
  uploadPreEquivalences,
  uploadSchoolCert,
  uploadSolicitudeEquivalences,
} from "../../../../constants/ProceduresEquivalenceStudies.constant";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";
import { ProceduresContext } from "../../ProceduresContext";
import {
  formatDocumentsModalEquivalenceStudiesProcedure,
  formatInfoModalEquivalenceStudiesProcedure,
} from "../../Utils/formatInformationProcedures";
import { useFormBuilder } from "../../../../hooks/useForm";
import { setInfoUpload } from "../../Utils/setInfoUpload";
import { getEquivalenceStudiesDocumentationValidators } from "../../../../validators/procedures/equivalenceStudiesValidators";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import {
  backStepTwoEquivalenceStudiesTag,
  nextStepTwoEquivalenceStudiesTag,
  uploadEquivalenceStudiesTag,
} from "../../../../tagging/flows/procedures/equivalenceStudiesTag";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { typesModality } from "../../../../types/typesProcedures";

const EquivalenceStudiesDocuments = () => {
  const { handleSteps, handleModalProcedures, handleInfoModalProcedures } = useContext(ProceduresContext);

  const { texts } = useSelector((state) => state.texts);
  const actionValid = () => {
    setInfoModalProcedure(
      handleModalProcedures,
      handleInfoModalProcedures,
      dataStore,
      form.value,
      formatDocumentsModalEquivalenceStudiesProcedure(form),
      formatInfoModalEquivalenceStudiesProcedure(dataStore),
      typeflowsProcedures.equivalenceStudy
    );
  };

  const {form, setForm, setNext:setConfirm, nextBtn} =
    useFormBuilder(requestBtnEquivalenceStudy, actionValid);

  const [fileError, setFileError] = useState({
    birthCert: {
      hasError: false,
      errorMessage: null,
    },
    schoolCert: {
      hasError: false,
      errorMessage: null,
    },
    equivalenceCert: {
      hasError: false,
      errorMessage: null,
    },
    preEquivalences: {
      hasError: false,
      errorMessage: null,
    },
    solicitudeEquivalences: {
      hasError: false,
      errorMessage: null,
    },
  });
  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const { data: dataStore } = useSelector(
    (state) => state.procedureEquivalenceStudies
  );

  const history = useHistory();

    const [isShowDelivery] = useState(
    getValuesOfAuth().modality === typesModality.withDelivery
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!dataStore.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.equivalenceStudy}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
    setForm(getEquivalenceStudiesDocumentationValidators(dataStore, getValuesOfAuth().modality));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(
        changeUpload.info,
        form,
        setFileError,
        maxSizeFileInEquivalenceStudy,
        texts
      );
      setChangeUpload({
        valud: false,
        info: null,
      });
    }
  }, [changeUpload]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = (e) => {
    setChangeUpload({
      valid: true,
      info: e.detail,
    });
    sendInfoTM(window, uploadEquivalenceStudiesTag);
  }

  return (
    <>
      <div className="equivalenceStudyfile-content">
      <div className="equivalencestudydocsmax">{texts?.procedures?.uploadTextMax}</div>
        <p className="equivalenceStudytitle">
          {texts?.procedures?.equivalenceStudies?.uploadBirthCert}
        </p>
        <div className="equivalenceStudyupload">
          <Upload
            data={uploadBirthCert}
            hasError={fileError.birthCert.hasError}
            errorMessage={fileError.birthCert.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadBirthCert.id, isError: true}
              });
            }}
          />
        </div>
        <p className="equivalenceStudytitle">
          {texts?.procedures?.equivalenceStudies?.uploadPastCert}
        </p>
        <div className="equivalenceStudyupload">
          <Upload
            data={uploadSchoolCert}
            hasError={fileError.schoolCert.hasError}
            errorMessage={fileError.schoolCert.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadSchoolCert.id, isError: true}
              });
            }}
          />
        </div>
        <p className="equivalenceStudytitle">
          {texts?.procedures?.equivalenceStudies?.uploadEquivCert}
        </p>
        <div className="equivalenceStudyupload">
          <Upload
            data={uploadEquivalenceCert}
            hasError={fileError.equivalenceCert.hasError}
            errorMessage={fileError.equivalenceCert.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadEquivalenceCert.id, isError: true}
              });
            }}
          />
        </div>
        <p className="equivalenceStudytitle">
          {texts?.procedures?.equivalenceStudies?.uploadPreEquiv}
        </p>
        <div className="equivalenceStudyupload">
          <Upload
            data={uploadPreEquivalences}
            hasError={fileError.preEquivalences.hasError}
            errorMessage={fileError.preEquivalences.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadPreEquivalences.id, isError: true}
              });
            }}
          />
        </div>
        {isShowDelivery ? (
            <>
            <p className="equivalenceStudytitle">
            {texts?.procedures?.equivalenceStudies?.uploadSolicitudeEquiv}
            </p>
            <div className="equivalenceStudyupload">
            <Upload
              data={uploadSolicitudeEquivalences}
              hasError={fileError.solicitudeEquivalences.hasError}
              errorMessage={fileError.solicitudeEquivalences.errorMessage}
              onFile={handleUpload}
              onRemove={() => {
                setChangeUpload({
                  valid: true,
                  info: {id: uploadSolicitudeEquivalences.id, isError: true}
                });
              }}
            />
            </div>
            </>
          ) : (
            ""
        )}
      </div>
      <div className="equivalenceStudyfeedback">
        <Feedback
          data={feedbackNoticeEquivalenceStudy}
          text={texts?.procedures?.feedBackText}
        />
      </div>
      <div className="equivalenceStudydocbtns">
        <div className="equivalenceStudydocbtn">
          <Button
            data={{
              ...backBtnEquivalenceStudy,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              history.push(
                `/procedures-flows/${typeflowsProcedures.equivalenceStudy}/${typeStagesProcedures.information}`
              );
              sendInfoTM(window, backStepTwoEquivalenceStudiesTag);
            }}
          />
        </div>
        <div className="equivalenceStudydocbtn">
          <Button
            data={nextBtn}
            onClick={() => {
              sendInfoTM(window, nextStepTwoEquivalenceStudiesTag);
              setConfirm(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EquivalenceStudiesDocuments;
