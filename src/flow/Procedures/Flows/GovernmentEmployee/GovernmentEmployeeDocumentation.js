import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '../../../../components/Button/Button';
import { Feedback } from '../../../../components/Feedback/Feedback';
import { Upload } from '../../../../components/Upload/Upload';
import { typeflowsProcedures, typeStagesProcedures } from '../../../../constants/Procedures.constant';
import { feedbackNoticeGovernmentEmployee, maxSizeFileInGovernmentEmployee, uploadGEBackCredential, uploadGEFrontCredential, uploadGEOldLetter, uploadGEPayslip, requestBtnGovernmentEmployee,backBtnGovernmentEmployee } from '../../../../constants/proceduresGovernmentEmployee.constant';
import { useFormBuilder } from '../../../../hooks/useForm';
import { getGovernmentEmployeeDocumentationValidators } from '../../../../validators/procedures/socialService/governmentEmployeeValidator';
import { ProceduresContext } from '../../ProceduresContext';
import { formatDocumentsGovernmentEmployeeProcedure, formatInfoModalGovernmentEmployeeProcedure } from '../../Utils/formatInformationProcedures';
import { setInfoModalProcedure } from '../../Utils/infoModalProcedures';
import { setInfoUpload } from '../../Utils/setInfoUpload';
import './GovernmentEmployeeDocumentation.scss'

const GovernmentEmployeeDocumentation = () => {
  const { handleSteps, handleModalProcedures, handleInfoModalProcedures } = useContext(ProceduresContext);

  const { texts } = useSelector((state) => state.texts);
  const actionValid = () => {
    setInfoModalProcedure(
      handleModalProcedures,
      handleInfoModalProcedures,
      dataStore,
      form.value,
      formatDocumentsGovernmentEmployeeProcedure(form),
      formatInfoModalGovernmentEmployeeProcedure(dataStore),
      typeflowsProcedures.governmentEmployee
    );
  };

  const {form, setForm, setNext:setConfirm, nextBtn} =
    useFormBuilder(requestBtnGovernmentEmployee, actionValid);

  const [fileError, setFileError] = useState({
    oldLetter: {
      hasError: false,
      errorMessage: null,
    },
    payslip: {
      hasError: false,
      errorMessage: null,
    },
    frontCredential: {
      hasError: false,
      errorMessage: null,
    },
    backCredential: {
      hasError: false,
      errorMessage: null,
    },
  });
  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const { information: infoStore ,data: dataStore} = useSelector(
    (state) => state.proceduresSocialService
  );

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!infoStore?.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.governmentEmployee}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
    setForm(getGovernmentEmployeeDocumentationValidators());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(
        changeUpload.info,
        form,
        setFileError,
        maxSizeFileInGovernmentEmployee,
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
  }

  return (
    <>
      <div className="governmentemployeedocs-content">
      <div className="governmentemployeedocsmax">{texts?.procedures?.uploadTextMax}</div>
        <p className="governmentemployeedocstitle">
          {texts?.procedures?.governmentEmployee?.uploadOldLetter}
        </p>
        <div className="governmentemployeedocsupload">
          <Upload
            data={uploadGEOldLetter}
            hasError={fileError.oldLetter.hasError}
            errorMessage={fileError.oldLetter.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadGEOldLetter.id, isError: true}
              });
            }}
          />
        </div>
        <p className="governmentemployeedocstitle">
          {texts?.procedures?.governmentEmployee?.uploadpayslip}
        </p>
        <div className="governmentemployeedocsfeedback">
          <Feedback
            data={feedbackNoticeGovernmentEmployee}
            text={texts?.procedures?.governmentEmployee?.warnigPaysplip}
          />
        </div>
        <div className="governmentemployeedocsupload">
          <Upload
            data={uploadGEPayslip}
            hasError={fileError.payslip.hasError}
            errorMessage={fileError.payslip.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadGEPayslip.id, isError: true}
              });
            }}
          />
        </div>
        <p className="governmentemployeedocstitle">
          {texts?.procedures?.governmentEmployee?.uploadCredential}
        </p>
        <div className="governmentemployeedocsupload">
          <Upload
            data={uploadGEFrontCredential}
            hasError={fileError.frontCredential.hasError}
            errorMessage={fileError.frontCredential.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadGEFrontCredential.id, isError: true}
              });
            }}
          />
        </div>
        <div className="governmentemployeedocsupload">
          <Upload
            data={uploadGEBackCredential}
            hasError={fileError.backCredential.hasError}
            errorMessage={fileError.backCredential.errorMessage}
            onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
                valid: true,
                info: {id: uploadGEBackCredential.id, isError: true}
              });
            }}
          />
        </div>
      </div>
      <div className="governmentemployeedocsfeedback">
        <Feedback
          data={feedbackNoticeGovernmentEmployee}
          text={texts?.procedures?.feedBackText}
        />
      </div>
      <div className="governmentemployeedocsbtns">
        <div className="governmentemployeedocsbtn">
          <Button
            data={{
              ...backBtnGovernmentEmployee,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              history.push(
                `/procedures-flows/${typeflowsProcedures.equivalenceStudy}/${typeStagesProcedures.information}`
              );
            }}
          />
        </div>
        <div className="governmentemployeedocsbtn">
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
}

export default GovernmentEmployeeDocumentation