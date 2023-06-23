import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { Upload } from "../../../../components/Upload/Upload";
import { useSelector } from "react-redux";
import { typeflowsProcedures, typeStagesProcedures } from "../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";
import { useFormBuilder } from "../../../../hooks/useForm";
import { setInfoUpload } from "../../Utils/setInfoUpload";
import { ProceduresContext } from "../../ProceduresContext";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";
import { backBtnProgramChange, feedbackNoticeProgramChange, maxSizeFileProgramChange, requestBtnProgramChange, uploadProgramChange } from "../../../../constants/ProceduresProgramChange.constant";
import { getProgramChangeDocumentationValidators } from "../../../../validators/procedures/programChangeValidator";
import { Feedback } from "../../../../components/Feedback/Feedback";
import "./ProgramChangeDocuments.scss";
import { formatDocumentsModalProgramChangeProcedure, formatInfoModalProgramChangeProcedure } from "../../Utils/formatInformationProcedures";

const ProgramChangeDocuments = () => {
  const { texts } = useSelector((state) => state.texts);
  const history = useHistory();

  const { handleSteps, handleModalProcedures, handleInfoModalProcedures  } = useContext(ProceduresContext);

  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const { data: dataStore } = useSelector(
    (state) => state.proceduresProgramChange
  );

  const [fileError, setFileError] = useState({
     requestProgramChange: {
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
      formatDocumentsModalProgramChangeProcedure(form),
      formatInfoModalProgramChangeProcedure(dataStore),
      typeflowsProcedures.programChange,
    )
  }

  const {form, setForm, setNext:setConfirm, nextBtn} =
    useFormBuilder(requestBtnProgramChange,actionValid);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!dataStore.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.programChange}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
    setForm(getProgramChangeDocumentationValidators());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(changeUpload.info, form, setFileError, maxSizeFileProgramChange, texts);
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
      <div className="programchangefile-content">
        <div className="programchangenoticeupload">{texts?.procedures?.uploadTextMax}</div>
        <p className="programchangetitle">{texts?.procedures?.programChange.uploadProgramChange}</p>
        <div className="programchangeupload">
          <Upload 
          data={uploadProgramChange} 
          hasError={fileError.requestProgramChange.hasError}
          errorMessage={fileError.requestProgramChange.errorMessage}
          onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
              valid: true,
              info: {id: uploadProgramChange.id, isError: true}
            });
          }}
          />
        </div>
      </div>
      <div className="programchangefeedback">
        <Feedback
          data={feedbackNoticeProgramChange}
          text={texts?.procedures?.feedBackText}
        />
      </div>
      <div className="programchangedocbtns">
        <div className="programchangedocbtn">
          <Button
            data={{
              ...backBtnProgramChange,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
                history.push(`/procedures-flows/${typeflowsProcedures.programChange}/${typeStagesProcedures.information}`)
              }}
          />
        </div>
        <div className="programchangedocbtn">
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

export default ProgramChangeDocuments;