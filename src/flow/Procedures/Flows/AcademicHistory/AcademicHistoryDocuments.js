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
  backBtnAcademicHistory,
  feedbackAcademicHistory,
  maxSizeFileInAcademicHistory,
  sendBtnAcademicHistory,
  uploadAcademicHistory,
} from "../../../../constants/ProceduresAcademicHistory.constant";
import { backStepTwoAcademicHistoryTag, uploadAcademicHistoryTag } from "../../../../tagging/flows/procedures/academicHistoryTag";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { ProceduresContext } from "../../ProceduresContext";
import { formatInfoModalAcademicRecordProcedure } from "../../Utils/formatInformationProcedures";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";
import { setInfoUploadWihtoutForm } from "../../Utils/setInfoUpload";
import "./AcademicHistoryDocument.scss";

const AcademicHistoryDocuments = () => {
  const { handleSteps, handleModalProcedures, handleInfoModalProcedures } = useContext(ProceduresContext);

  const history = useHistory();

  const { texts } = useSelector((state) => state.texts);

  const [file, setFile] = useState({
    name: null,
    body: null,
    type: null,
  });
  const [next, setNext] = useState(false);
  const [errorUpload, setErrorUpload] = useState({
    hasError: false,
    errorMessage: "",
  });

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresAcademicHistory
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!dataStore.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.academyHistory}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (next) {
      setInfoModalProcedure(
        handleModalProcedures,
        handleInfoModalProcedures,
        dataStore,
        file,
        file && file.name ? [file.name]: [],
        formatInfoModalAcademicRecordProcedure(infoStore,dataStore),
        typeflowsProcedures.academyHistory,
      )
      setNext(false);
    }
  }, [next]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <>
      <div className="academicdocumentscontainer">
        <div className="forminformationacademichistory">
          <div className="academichistoryupload">
            <p className="academichistoryinfouploadtitle">
              {texts?.procedures?.uploadTextMax || ''}
            </p>
            <div className="academichistoryuploadinput">
              <Upload
                data={uploadAcademicHistory}
                hasError={errorUpload.hasError}
                errorMessage={errorUpload.errorMessage}
                onFile={(e) => {
                  setInfoUploadWihtoutForm(e.detail,setFile,setErrorUpload,maxSizeFileInAcademicHistory,texts)
                  sendInfoTM(window, uploadAcademicHistoryTag) 

                }}
                onRemove={() => {
                  setFile({
                    valid: true,
                    info: {id: uploadAcademicHistory.id, isError: true}
                  });
                }}
              />
            </div>
            <div className="academichistoryitem">
              <Feedback
                data={feedbackAcademicHistory}
                text={texts?.procedures?.feedBackText || ''}
              />
            </div>
          </div>
        </div>
        <div className="academichistorybtns">
          <div className="academicbtn">
            <Button
              data={backBtnAcademicHistory}
              onClick={() => {
                history.push(
                  `/procedures-flows/${typeflowsProcedures.academyHistory}/${typeStagesProcedures.information}`
                );
                sendInfoTM(window, backStepTwoAcademicHistoryTag) 

              }}
            />
          </div>
          <div className="academicbtn">
            <Button
              data={sendBtnAcademicHistory}
              onClick={() => {
                setNext(true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicHistoryDocuments;
