import React, { useContext, useEffect, useState } from "react";
import "./RevalidateStudiesDocuments.scss";
import { Button } from "../../../../components/Button/Button";
import { Upload } from "../../../../components/Upload/Upload";
import { useSelector } from "react-redux";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";
import { useFormBuilder } from "../../../../hooks/useForm";
import { setInfoUpload } from "../../Utils/setInfoUpload";
import {
  backBtnRevalidate,
  feedbackNoticeRevalidate,
  maxSizeFileRevalidate,
  requestBtnRevalidate,
  revalidateThirdStepForm,
} from "../../../../constants/ProceduresRevalidateStudies.constant";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { ProceduresContext } from "../../ProceduresContext";
import { formatDocumentsModalRevalidateStudiesProcedure, formatInfoModalRevalidateStudiesProcedure } from "../../Utils/formatInformationProcedures";
import { getRevalidateStudiesDocumentationValidators } from "../../../../validators/procedures/revalidateStudiesValidators";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";

const RevalidateStudiesDocuments = () => {
  const { texts } = useSelector((state) => state.texts);
  const history = useHistory();

  const { handleSteps, handleModalProcedures, handleInfoModalProcedures } = useContext(ProceduresContext);

  const actionValid = () => {
    setInfoModalProcedure(
      handleModalProcedures,
      handleInfoModalProcedures,
      dataStore,
      form.value,
      formatDocumentsModalRevalidateStudiesProcedure(form),
      formatInfoModalRevalidateStudiesProcedure(dataStore), 
      typeflowsProcedures.revalidateStudy
    );
  };

  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const { data: dataStore } = useSelector(
    (state) => state.proceduresRevalidateStudies
  );

  const [fileError, setFileError] = useState({
    birthCert: {
      hasError: false,
      errorMessage: null,
    },
    studyCert: {
      hasError: false,
      errorMessage: null,
    },
    prevLevel: {
      hasError: false,
      errorMessage: null,
    },
    notesEdu: {
      hasError: false,
      errorMessage: null,
    },
  });

  const {
    form,
    setForm,
    setNext: setConfirm,
    nextBtn,
  } = useFormBuilder(requestBtnRevalidate, actionValid);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSteps(2); if (!dataStore?.phone) {
      history.push(
        `/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.information}`
      );
    }
    setForm(getRevalidateStudiesDocumentationValidators());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(
        changeUpload.info,
        form,
        setFileError,
        maxSizeFileRevalidate,
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
  };

  return (
    <>
      <div className="revalidatefile-content">
        <div className="revalidatenoticeupload">
          {texts?.procedures?.uploadTextMax}
        </div>
        <p className="revalidatetitle">
          {texts?.procedures?.revalidateStudy.uploadBirthCert}
        </p>
        <div className="revalidateupload">
          <Upload
            data={revalidateThirdStepForm.uploadBirthCert}
            hasError={fileError.birthCert.hasError}
            errorMessage={fileError.birthCert.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {
                  id: revalidateThirdStepForm.uploadBirthCert.id,
                  isError: true,
                },
              });
            }}
          />
        </div>
        <p className="revalidatetitle">
          {texts?.procedures?.revalidateStudy.uploadStudyCert}
        </p>
        <div className="revalidateupload">
          <Upload
            data={revalidateThirdStepForm.uploadStudyCert}
            hasError={fileError.studyCert.hasError}
            errorMessage={fileError.studyCert.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {
                  id: revalidateThirdStepForm.uploadStudyCert.id,
                  isError: true,
                },
              });
            }}
          />
        </div>
        <p className="revalidatetitle">
          {texts?.procedures?.revalidateStudy.uploadPrevLevel}
        </p>
        <div className="revalidateupload">
          <Upload
            data={revalidateThirdStepForm.uploadPrevLevel}
            hasError={fileError.prevLevel.hasError}
            errorMessage={fileError.prevLevel.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {
                  id: revalidateThirdStepForm.uploadPrevLevel.id,
                  isError: true,
                },
              });
            }}
          />
        </div>
        <p className="revalidatetitle">
          {texts?.procedures?.revalidateStudy.uploadNotesEdu}
        </p>
        <div className="revalidateupload">
          <Upload
            data={revalidateThirdStepForm.uploadNotesEdu}
            hasError={fileError.notesEdu.hasError}
            errorMessage={fileError.notesEdu.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {
                  id: revalidateThirdStepForm.uploadNotesEdu.id,
                  isError: true,
                },
              });
            }}
          />
        </div>
      </div>
      <div className="revalidatefeedback">
        <Feedback
          data={feedbackNoticeRevalidate}
          text={texts.procedures.feedBackText}
        />
      </div>
      <div className="revalidatedocbtns">
        <div className="revalidatedocbtn">
          <Button
            data={{
              ...backBtnRevalidate,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              history.push(
                `/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.data}`
              );
            }}
          />
        </div>
        <div className="revalidatedocbtn">
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

export default RevalidateStudiesDocuments;
