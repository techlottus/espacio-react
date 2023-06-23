import React, { useContext, useEffect, useState } from "react";
import "./ReinstatementDocuments.scss";
import { Button } from "../../../../components/Button/Button";
import { Upload } from "../../../../components/Upload/Upload";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { useSelector } from "react-redux";
import { backBtnReinstatement, feedbackNoticeReinstatement, maxSizeFileInReinstatement, requestBtnReinstatement, uploadReinstatement } from "../../../../constants/ProceduresReinstatement.constant";
import { typeflowsProcedures, typeStagesProcedures } from "../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";
import { getReinstatementDocumentationValidators } from "../../../../validators/procedures/reinstatementValidator";
import { formatDocumentsModalReinstatementProcedure, formatInfoModalReinstatementProcedure } from "../../Utils/formatInformationProcedures";
import { useFormBuilder } from "../../../../hooks/useForm";
import { setInfoUpload } from "../../Utils/setInfoUpload";
import { ProceduresContext } from "../../ProceduresContext";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { backStepTwoReinstatementTag, nextStepTwoReinstatementTag, uploadFileReinstatementTag } from "../../../../tagging/flows/procedures/reinstatementTag";

const ReinstatementDocuments = () => {
  const { texts } = useSelector((state) => state.texts);
  const history = useHistory();

  const { handleSteps, handleModalProcedures, handleInfoModalProcedures  } = useContext(ProceduresContext);

  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const { data: dataStore } = useSelector(
    (state) => state.proceduresReinstatement
  );

  const [fileError, setFileError] = useState({
     requestReinstatement: {
      hasError: false,
      errorMessage: null,
    },
  })

  const actionValid = () => {
    setInfoModalProcedure(
      handleModalProcedures,
      handleInfoModalProcedures,
      dataStore,
      form.value,
      formatDocumentsModalReinstatementProcedure(form),
      formatInfoModalReinstatementProcedure(dataStore),
      typeflowsProcedures.reinstatement,
    )
  }

  const {form, setForm, setNext:setConfirm, nextBtn} =
    useFormBuilder(requestBtnReinstatement,actionValid);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!dataStore.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.reinstatement}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
    setForm(getReinstatementDocumentationValidators());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(changeUpload.info, form, setFileError,maxSizeFileInReinstatement,texts);
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
      <div className="reinstatementfile-content">
        <div className="reinstatementnoticeupload">{texts?.procedures?.uploadTextMax}</div>
        <p className="reinstatementtitle">{texts?.procedures?.reinstatement.uploadReinstatement}</p>
        <div className="reinstatementupload">
          <Upload 
          data={uploadReinstatement} 
          hasError={fileError.requestReinstatement.hasError}
          errorMessage={fileError.requestReinstatement.errorMessage}
          onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
              valid: true,
              info: {id: uploadReinstatement.id, isError: true}
            });
            sendInfoTM(window, uploadFileReinstatementTag, "upload") 
          }}
          />
        </div>
      </div>
      <div className="reinstatementfeedback">
        <Feedback
          data={feedbackNoticeReinstatement}
          text={texts.procedures.feedBackText}
        />
      </div>
      <div className="reinstatementdocbtns">
        <div className="reinstatementdocbtn">
          <Button
            data={{
              ...backBtnReinstatement,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
                history.push(`/procedures-flows/${typeflowsProcedures.reinstatement}/${typeStagesProcedures.information}`)
                sendInfoTM(window, backStepTwoReinstatementTag, "back") 
              }}
          />
        </div>
        <div className="reinstatementdocbtn">
          <Button
           data={nextBtn}
            onClick={() => {
              setConfirm(true);
              sendInfoTM(window, nextStepTwoReinstatementTag, "next")
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ReinstatementDocuments;