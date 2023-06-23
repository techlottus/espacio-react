import React, { useContext, useEffect, useState } from "react";
import {
  backBtnCertificateStudy,
  feedbackNoticeCertificateStudy,
  maxSizeFileInCertificateStudy,
  requestBtnCertificateStudy,
  uploadCertificateStudy,
} from "../../../../constants/ProceduresCertificateStudies.constant";
import "./CertificateStudiesDocuments.scss";
import { Button } from "../../../../components/Button/Button";
import { Upload } from "../../../../components/Upload/Upload";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { ProceduresContext } from "../../ProceduresContext";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  formatDocumentsModalCertificateStudyProcedure,
  formatInfoModalCertificateStudyProcedure,
} from "../../Utils/formatInformationProcedures";
import { setInfoUpload } from "../../Utils/setInfoUpload";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { certificateStudyP2Tag } from "../../../../tagging/flows/procedures/certificateStudyTag";
import { getCertificateStudyDocumentationValidators } from "../../../../validators/procedures/certificateStudiesValidator";
import { useFormBuilder } from "../../../../hooks/useForm";

const CertificateStudiesDocuments = () => {
  const { handleSteps, handleModalProcedures, handleInfoModalProcedures } =
    useContext(ProceduresContext);
  const { texts } = useSelector((state) => state.texts);
  const history = useHistory();

  const [fileError, setFileError] = useState({
    certificateStudy: {
      hasError: false,
      errorMessage: "",
    },
  });
  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const {
    data: dataStore,
    information: infoStore,
    extra: extraStore,
  } = useSelector((state) => state.procedureCertificateStudy);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!dataStore.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.certificateStudy}/${typeStagesProcedures.information}`
      );
    }
    handleSteps(1);
    setForm(getCertificateStudyDocumentationValidators());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const actionValid = () => {
    setInfoModalProcedure(
      handleModalProcedures,
      handleInfoModalProcedures,
      dataStore,
      form.value?.certificateStudy,
      formatDocumentsModalCertificateStudyProcedure(form),
      formatInfoModalCertificateStudyProcedure(infoStore, dataStore),
      typeflowsProcedures.certificateStudy,
      extraStore
    );
  };

  const {
    form,
    setForm,
    setNext: setConfirm,
    nextBtn,
  } = useFormBuilder(requestBtnCertificateStudy, actionValid);

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(
        changeUpload.info,
        form,
        setFileError,
        maxSizeFileInCertificateStudy,
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
      <div className="certificatestudyfile-content">
        <p className="certificatestudyfile">{texts.procedures.uploadTextMax}</p>
        <p className="certificatestudynotice">
          {texts?.procedures?.certificateStudy?.uploadAcademic}
        </p>
        <div className="certificatestudyupload">
          <Upload
            data={uploadCertificateStudy}
            hasError={fileError.certificateStudy.hasError}
            errorMessage={fileError.certificateStudy.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: { id: uploadCertificateStudy.id, isError: true },
              });
            }}
          />
        </div>
      </div>
      <div className="certificatestudy">
        <Feedback
          data={feedbackNoticeCertificateStudy}
          text={texts.procedures.feedBackText}
        />
      </div>
      <div className="certificatestudydocbtns">
        <div className="certificatestudydocbtn">
          <Button
            data={backBtnCertificateStudy}
            onClick={() => {
              sendInfoTM(window, certificateStudyP2Tag, "back");
              history.push(
                `/procedures-flows/${typeflowsProcedures.certificateStudy}/${typeStagesProcedures.information}`
              );
            }}
          />
        </div>
        <div className="certificatestudydocbtn">
          <Button
            data={nextBtn}
            onClick={() => {
              sendInfoTM(window, certificateStudyP2Tag, "next");
              setConfirm(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CertificateStudiesDocuments;
