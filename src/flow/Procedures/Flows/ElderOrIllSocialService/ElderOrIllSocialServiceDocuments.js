import React, { useContext, useEffect, useState } from "react";
import "./ElderOrIllSocialServiceDocuments.scss";
import { Button } from "../../../../components/Button/Button";
import { Upload } from "../../../../components/Upload/Upload";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { useSelector } from "react-redux";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";
import { ProceduresContext } from "../../ProceduresContext";
import { useFormBuilder } from "../../../../hooks/useForm";
import { setInfoUpload } from "../../Utils/setInfoUpload";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";
import { formatDocumentsModalProcedure, formatInfoModalElderOrIllProcedure } from "../../Utils/formatInformationProcedures";
import {
  backBtnSocialServiceElderOrIll,
  feedbackNoticeSocialServiceElderOrIll,
  maxSizeFileInSocialServiceElderOrIll,
  requestBtnSocialServiceElderOrIll,
  requirementGuideLink,
  uploadBirthCertificate,
  uploadProof,
} from "../../../../constants/ProceduresElderOrIllSocialService.constant";
import { getElderorIllDocumentationValidators } from "../../../../validators/procedures/elderOrIllValidator";
import { Link } from "../../../../components/Link/Link";
import { downloadFile } from "../../../../helpers/download";

const ElderorIllSocialServiceDocuments = () => {
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
      formatInfoModalElderOrIllProcedure(infoStore),
      typeflowsProcedures.elderOrIllSocialService
    );
  };

  const {
    form,
    setForm,
    setNext: setConfirm,
    nextBtn,
  } = useFormBuilder(requestBtnSocialServiceElderOrIll, actionValid);

  const [fileError, setFileError] = useState({
    proof: {
      hasError: false,
      errorMessage: null,
    },
    birthCertificate: {
      hasError: false,
      errorMessage: null,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!infoStore?.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.elderOrIllSocialService}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
    setForm(getElderorIllDocumentationValidators());
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
      <div className="elderorillfile-content">
      <div className="elderorilldocsmax">{texts?.procedures?.uploadTextMax}</div>
        <div className="elderorillupload">
          <p>{texts?.procedures?.elderOrIllSocialService?.uploadBirthCert}</p>
          <Upload
            data={uploadBirthCertificate}
            hasError={fileError.birthCertificate.hasError}
            errorMessage={fileError.birthCertificate.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadBirthCertificate.id, isError: true}
              });
            }}
          />
        </div>
        <div className="elderorillupload">
          <p>{texts?.procedures?.elderOrIllSocialService?.uploadMedicalCert}</p>
          <Upload
            data={uploadProof}
            hasError={fileError.proof.hasError}
            errorMessage={fileError.proof.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadProof.id, isError: true}
              });
            }}
          />
        </div>

        <div className="elderorillnotice">
          <Feedback
            data={feedbackNoticeSocialServiceElderOrIll}
            text={texts?.procedures?.feedBackText}
          />
        </div>
      </div>
      <div className="elderorilldocbtns">
        <div className="elderorilldocbtn">
          <Button
            data={{
              ...backBtnSocialServiceElderOrIll,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              history.push(
                `/procedures-flows/${typeflowsProcedures.elderOrIllSocialService}/${typeStagesProcedures.information}`
              );
            }}
          />
        </div>
        <div className="elderorilldocbtn">
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

export default ElderorIllSocialServiceDocuments;
