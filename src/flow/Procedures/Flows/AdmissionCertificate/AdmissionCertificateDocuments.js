import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../../../../components/Button/Button";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { Upload } from "../../../../components/Upload/Upload";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import {
  backBtnAdmissionCertificate,
  feedbackNoticeAdissionCertificate,
  maxSizeFileInAdmissionCertificate,
  sendBtnAdmissionCertificate,
  uploadBachelorCert,
  uploadBirthCert,
  uploadHighSchoolCert,
  uploadNotes,
} from "../../../../constants/ProceduresAdmissionCertificate.constant";
import { useFormBuilder } from "../../../../hooks/useForm";
import { getAdmissionCertificateDocumentationValidators } from "../../../../validators/procedures/admissionCertificateValidator";
import { ProceduresContext } from "../../ProceduresContext";
import {
  formatDocumentsModalAdmissionCertificateProcedure,
  formatInfoModalAdmissionCertificateProcedure,
} from "../../Utils/formatInformationProcedures";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";
import { setInfoUpload } from "../../Utils/setInfoUpload";
import "./AdmissionCertificateDocuments.scss";

const AdmissionCertificateDocuments = () => {
  const { handleSteps, handleModalProcedures, handleInfoModalProcedures } =
    useContext(ProceduresContext);

  const { texts } = useSelector((state) => state.texts);
  const actionValid = () => {
    setInfoModalProcedure(
      handleModalProcedures,
      handleInfoModalProcedures,
      dataStore,
      form.value,
      formatDocumentsModalAdmissionCertificateProcedure(form),
      formatInfoModalAdmissionCertificateProcedure(dataStore),
      typeflowsProcedures.admissionCertificate
    );
  };

  const {
    form,
    setForm,
    setNext: setConfirm,
    nextBtn,
  } = useFormBuilder(sendBtnAdmissionCertificate, actionValid);

  const [fileError, setFileError] = useState({
    birthCert: {
      hasError: false,
      errorMessage: null,
    },
    highSchoolCert: {
      hasError: false,
      errorMessage: null,
    },
    bachelorCert: {
      hasError: false,
      errorMessage: null,
    },
    notes: {
      hasError: false,
      errorMessage: null,
    },
  });
  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const { data: dataStore } = useSelector(
    (state) => state.proceduresAdmissionCertificate
  );

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!dataStore?.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.admissionCertificate}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
    setForm(getAdmissionCertificateDocumentationValidators());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(
        changeUpload.info,
        form,
        setFileError,
        maxSizeFileInAdmissionCertificate,
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
      <div className="admissioncertificatedocs-content">
        <div className="admissioncertificatedocsmax">
          {texts?.procedures?.uploadTextMax}
        </div>
        <p className="admissioncertificatetitle">
          {texts?.procedures?.admissionCertificate?.uploadBirthCert}
        </p>
        <div className="admissioncertificatedocsupload">
          <Upload
            data={uploadBirthCert}
            hasError={fileError.birthCert.hasError}
            errorMessage={fileError.birthCert.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: { id: uploadBirthCert.id, isError: true },
              });
            }}
          />
        </div>
        <p className="admissioncertificatetitle">
          {texts?.procedures?.admissionCertificate?.uploadHighSchoolCert}
        </p>
        <div className="admissioncertificatedocsupload">
          <Upload
            data={uploadHighSchoolCert}
            hasError={fileError.birthCert.hasError}
            errorMessage={fileError.birthCert.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: { id: uploadHighSchoolCert.id, isError: true },
              });
            }}
          />
        </div>
        <p className="admissioncertificatetitle">
          {texts?.procedures?.admissionCertificate?.uploadBachelorCert}
        </p>
        <div className="admissioncertificatedocsupload">
          <Upload
            data={uploadBachelorCert}
            hasError={fileError.bachelorCert.hasError}
            errorMessage={fileError.bachelorCert.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: { id: uploadBachelorCert.id, isError: true },
              });
            }}
          />
        </div>
        <p className="admissioncertificatetitle">
          {texts?.procedures?.admissionCertificate?.uploadNotes}
        </p>
        <div className="admissioncertificatedocsupload">
          <Upload
            data={uploadNotes}
            hasError={fileError.notes.hasError}
            errorMessage={fileError.notes.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: { id: uploadNotes.id, isError: true },
              });
            }}
          />
        </div>
      </div>
      <div className="admissioncertificatefeedback">
        <Feedback
          data={feedbackNoticeAdissionCertificate}
          text={texts?.procedures?.feedBackText}
        />
      </div>
      <div className="admissioncertificatedocsbtns">
        <div className="admissioncertificatedocbtn">
          <Button
            data={{
              ...backBtnAdmissionCertificate,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              history.push(
                `/procedures-flows/${typeflowsProcedures.admissionCertificate}/${typeStagesProcedures.information}`
              );
            }}
          />
        </div>
        <div className="admissioncertificatedocbtn">
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

export default AdmissionCertificateDocuments;
