import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '../../../../components/Button/Button'
import { Feedback } from '../../../../components/Feedback/Feedback'
import { Upload } from '../../../../components/Upload/Upload'
import { typeflowsProcedures, typeStagesProcedures } from '../../../../constants/Procedures.constant'
import { backBtnStudyRecord, feedbackNoticeStudyRecord, requestBtnStudyRecord, uploadStudyRecord, maxSizeFileInStudyRecord } from '../../../../constants/ProcedureStudyRecord.constant'
import { ProceduresContext } from '../../ProceduresContext'
import { formatInfoModalStudyRecordProcedure } from '../../Utils/formatInformationProcedures'
import { setInfoModalProcedure } from '../../Utils/infoModalProcedures'
import { setInfoUploadWihtoutForm } from '../../Utils/setInfoUpload'
import './StudyRecordDocuments.scss'
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { backStepTwoStudyRecordTag, nextStepTwoStudyRecordTag, uploadFileStudyRecordTag } from '../../../../tagging/flows/procedures/studyRecordTag'

const StudyRecordDocuments = () => {
  const { handleSteps, handleModalProcedures, handleInfoModalProcedures } = useContext(ProceduresContext);
  const { texts } = useSelector(state => state.texts);
  const [file,setFile] = useState({
    name: null,
    body: null,
    type: null
  });
  const [next,setNext] = useState(false);
  const [errorUpload,setErrorUpload] = useState({
    hasError: false,
    errorMessage: ''
  })

  const history = useHistory();

  const {data:dataStore,information:infoStore, extra:extraStore} = useSelector(state => state.procedureStudyRecord);

  useEffect(() => {
    window.scrollTo(0, 0);
    if(!dataStore.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.studyRecord}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(next) {
      setInfoModalProcedure(
        handleModalProcedures,
        handleInfoModalProcedures,
        dataStore,
        file,
        file && file.name ? [file.name]: [],
        formatInfoModalStudyRecordProcedure(infoStore,dataStore),
        typeflowsProcedures.studyRecord,
        extraStore
      )
      setNext(false);
    }
  },[next]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="studyrecorddocsmax">{texts.procedures.uploadTextMax}</div>
      <div className="studyrecorddocsupload">
        <p className="studyrecorddocsuploadtitle">
         {texts?.procedures?.studyRecord?.uploadExample}
        </p>
        <div className="studyrecorddocsuploadcmp">
          <Upload
            data={uploadStudyRecord}
            hasError={errorUpload.hasError}
            errorMessage={errorUpload.errorMessage}
            onFile={(e) => {
              setInfoUploadWihtoutForm(e.detail,setFile,setErrorUpload,maxSizeFileInStudyRecord,texts)
              sendInfoTM(window, uploadFileStudyRecordTag, "upload") 
            }}
            onRemove={() => {
              setFile({
                valid: true,
                info: {id: uploadStudyRecord.id, isError: true}
              })
            }}
          />
        </div>
      </div>
      <div className="studyrecorddocsnotice">
        <Feedback
          data={feedbackNoticeStudyRecord}
          text={texts.procedures.feedBackText}
        />
      </div>
      <div className="studyrecorddocsbtns">
        <div className="studyrecorddocsbtn">
          <Button
            data={backBtnStudyRecord}
            onClick={() => {
              history.push(
                `/procedures-flows/${typeflowsProcedures.studyRecord}/${typeStagesProcedures.information}`
              );
              sendInfoTM(window, backStepTwoStudyRecordTag, "back") 
            }}
          />
        </div>
        <div className="studyrecorddocsbtn">
          <Button
            data={requestBtnStudyRecord}
            onClick={() => {
              setNext(true);
              sendInfoTM(window, nextStepTwoStudyRecordTag, "next") 
            }}
          />
        </div>
      </div>
    </>
  );
};

export default StudyRecordDocuments;
