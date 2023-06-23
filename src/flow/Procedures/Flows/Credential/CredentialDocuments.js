import React from "react";
import "./CredentialDocuments.scss";
import { Button } from "../../../../components/Button/Button";
import { Upload } from "../../../../components/Upload/Upload";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { useSelector } from "react-redux";
import { backBtnCredential, feedbackNoticeCredential, requestBtnCredential, uploadCredential } from "../../../../constants/ProceduresCredential.constant";
import { typeflowsProcedures, typeStagesProcedures } from "../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";

 //FALTA LA PARTE DE SUBIR LA FOTO Y MOSTRARLA 
const CredentialDocuments = () => {
  const { texts } = useSelector((state) => state.texts);

  const history = useHistory();

  return (
    <>
      <div className="credentialfile-content">
      <p className="credentialfileNotice">
         {texts.procedures.credentialNotice}
        </p>
        <p className="credentialfileUpload">
         {texts.procedures.credentialUploadText}
        </p>
        <p className="credentialtitle">*Foto digital</p>
        <div className="credentiaupload">
          <Upload data={uploadCredential} />
        </div>
        </div>
      <div className="credentialfeedback">
        <Feedback
          data={feedbackNoticeCredential}
          text={texts.procedures.feedBackText}
        />
      </div>
      <div className="credentialdocbtns">
        <div className="credentialdocbtn">
          <Button
            data={{
              ...backBtnCredential,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              history.push(`/procedures-flows/${typeflowsProcedures.credential}/${typeStagesProcedures.information}`)
            }}
          />
        </div>
        <div className="credentialdocbtn">
          <Button
            data={{
              ...requestBtnCredential,
              isExpand: window.innerWidth < 991,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CredentialDocuments;