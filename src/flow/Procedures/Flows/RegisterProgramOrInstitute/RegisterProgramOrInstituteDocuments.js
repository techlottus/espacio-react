import React, { useContext, useEffect, useState } from "react";
import "./RegisterProgramOrInstituteDocuments.scss";
import { Button } from "../../../../components/Button/Button";
import { Upload } from "../../../../components/Upload/Upload";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { useSelector } from "react-redux";
import {
  feedbackNoticeDegree,
} from "../../../../constants/ProceduresDegree.constant";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";
import { ProceduresContext } from "../../ProceduresContext";
import { useFormBuilder } from "../../../../hooks/useForm";
import { setInfoUpload } from "../../Utils/setInfoUpload";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";
import {
  formatDocumentsModalProcedure,
  formatInfoModalRegisterProgramOrInstituteProcedure,
} from "../../Utils/formatInformationProcedures";
import {
  maxSizeFileInSocialServiceElderOrIll,
  requestBtnSocialServiceElderOrIll,
} from "../../../../constants/ProceduresElderOrIllSocialService.constant";
import { Link } from "../../../../components/Link/Link";
import {
  backBtnRegisterProgramOrInstitute,
  registerFormatGuideLinkRegisterProgram,
  requirementGuideLinkRegisterProgram,
  rfcOrConstitutive,
  signTicket,
} from "../../../../constants/ProceduresRegisterProgramOrInstitute.constant";
import { getRegisterProgramOrInstituteDocumentationValidators } from "../../../../validators/procedures/registerProgramOrInstituteValidator";
import { downloadFile } from "../../../../helpers/download";

const RegisterProgramOrInstituteDocuments = () => {
  const { handleSteps, handleModalProcedures, handleInfoModalProcedures } =
    useContext(ProceduresContext);
  const history = useHistory();

  const { texts } = useSelector((state) => state.texts);
  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresSocialService
  );

  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const actionValid = () => {
    setInfoModalProcedure(
      handleModalProcedures,
      handleInfoModalProcedures,
      infoStore,
      form.value,
      formatDocumentsModalProcedure(form),
      formatInfoModalRegisterProgramOrInstituteProcedure(infoStore),
      typeflowsProcedures.registerProgramorInstitute
    );
  };

  const {
    form,
    setForm,
    setNext: setConfirm,
    nextBtn,
  } = useFormBuilder(requestBtnSocialServiceElderOrIll, actionValid);

  const [fileError, setFileError] = useState({
    signTicket: {
      hasError: false,
      errorMessage: null,
    },
    rfcOrConstitutive: {
      hasError: false,
      errorMessage: null,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!infoStore?.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.registerProgramorInstitute}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
    setForm(getRegisterProgramOrInstituteDocumentationValidators());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(
        changeUpload.info,
        form,
        setFileError,
        maxSizeFileInSocialServiceElderOrIll,
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
      <div className="registerprogramorinstitutefile-content">
        <div className="registerprogramorinstitutelink">
          <Link
            data={registerFormatGuideLinkRegisterProgram}
            onClick={() => {
              downloadFile(
                "Registro-de-programas-de-servicio-social",
                dataStore?.filesLinks.registrationCompanyFormat
              );
            }}
          />
        </div>
        <div className="registerprograminstitutelinksubtitle">
          <p>{texts?.procedures?.registerProgramorInstitute?.noticeFormat}</p>
        </div>
        <div className="registerprogramorinstitutedocsmax">{texts?.procedures?.uploadTextMax}</div>
        <div className="registerprogramorinstitutelupload">
          <p>{texts?.procedures?.registerProgramorInstitute?.uploadSignedFormat}</p>
          <Upload
            data={signTicket}
            hasError={fileError.signTicket.hasError}
            errorMessage={fileError.signTicket.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: signTicket.id, isError: true}
              });
            }}
          />
        </div>
        <div className="registerprogramorinstitutelupload">
          <p>{texts?.procedures?.registerProgramorInstitute?.uploadRfc}</p>
          <Upload
            data={rfcOrConstitutive}
            hasError={fileError.rfcOrConstitutive.hasError}
            errorMessage={fileError.rfcOrConstitutive.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: rfcOrConstitutive.id, isError: true}
              });
            }}
          />
        </div>
        <div className="registerprogramorinstitutenotice">
          <Feedback
            data={feedbackNoticeDegree}
            text={texts?.procedures?.feedBackText}
          />
        </div>
      </div>
      <div className="registerprogramorinstitutedocbtns">
        <div className="registerprogramorinstitutedocbtn">
          <Button
            data={{
              ...backBtnRegisterProgramOrInstitute,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              history.push(
                `/procedures-flows/${typeflowsProcedures.registerProgramorInstitute}/${typeStagesProcedures.information}`
              );
            }}
          />
        </div>
        <div className="registerprogramorinstitutedocbtn">
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

export default RegisterProgramOrInstituteDocuments;
