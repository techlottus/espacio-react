import React, { useContext, useEffect, useState } from "react";
import "./ScholarshipDocuments.scss";
import { Button } from "../../../../components/Button/Button";
import { Upload } from "../../../../components/Upload/Upload";
import { useDispatch, useSelector } from "react-redux";
import { typeflowsProcedures, typeStagesProcedures } from "../../../../constants/Procedures.constant";
import { useHistory } from "react-router-dom";
import { formatDocumentsModalScholarshipProcedure, formatInfoModalScholarshipProcedure } from "../../Utils/formatInformationProcedures";
import { useFormBuilder } from "../../../../hooks/useForm";
import { setInfoUpload } from "../../Utils/setInfoUpload";
import { ProceduresContext } from "../../ProceduresContext";
import { setInfoModalProcedure } from "../../Utils/infoModalProcedures";
import { backBtnScholarship, maxSizeFileScholarship, requestBtnScholarship, uploadScholarship, uploadAcademicHistory,uploadProofPayment, uploadDiscountCard, uploadCredentialINE, selectTypeRequest } from "../../../../constants/ProceduresScholarship.constant";
import { getScholarshipDocumentationValidators } from "../../../../validators/procedures/scholarshipValidator";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { typesModality } from "../../../../types/typesProcedures";
import { Select } from "../../../../components/Select/Select";
import { getScholarshipRenovationTypesService } from "../../../../middlewares/proceduresMiddlewares/scholarshipMiddleware";

const ScholarshipDocuments = () => {
  const { texts } = useSelector((state) => state.texts);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isShowTypeRequest] = useState(
    getValuesOfAuth().modality === typesModality.withoutDelivery
  );

  const [optionsTypeRequest, setoptionsTypeRequest] = useState([]);

  const { handleSteps, handleModalProcedures, handleInfoModalProcedures } = useContext(ProceduresContext);

  const [changeUpload, setChangeUpload] = useState({
    valid: false,
    info: null,
  });

  const [fixtureSelectTypeRequest, setFixtureSelectTypeRequest] = useState({...selectTypeRequest})

  const {information: informationStore, data: dataStore } = useSelector(
    (state) => state.proceduresScholarship
  );

  const [fileError, setFileError] = useState({
     requestScholarship: {
      hasError: false,
      errorMessage: null,
    },
    requestScholarshipAcademicHistory: {
      hasError: false,
      errorMessage: null,
    },
    requestScholarshipProofPayment: {
      hasError: false,
      errorMessage: null,
    },
    requestScholarshipDiscountCard: {
      hasError: false,
      errorMessage: null,
    },
    requestScholarshipCredentialINE: {
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
      formatDocumentsModalScholarshipProcedure(form),
      formatInfoModalScholarshipProcedure(dataStore),
      typeflowsProcedures.scholarship,
    )
  }

  const {form, setForm, setNext:setConfirm, nextBtn} =
    useFormBuilder(requestBtnScholarship,actionValid);

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getScholarshipRenovationTypesService())
    if (!dataStore.phone) {
      history.replace(
        `/procedures-flows/${typeflowsProcedures.scholarship}/${typeStagesProcedures.information}`
      );
      return;
    }
    handleSteps(1);
    setForm(getScholarshipDocumentationValidators(getValuesOfAuth().modality));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(!!informationStore.renovationTypes && !!informationStore.renovationTypes.length) {
      setoptionsTypeRequest([...informationStore.renovationTypes])
    }
  }, [informationStore]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changeUpload.valid) {
      setInfoUpload(changeUpload.info, form, setFileError, maxSizeFileScholarship, texts);
      setChangeUpload({
        valid: false,
        info: null,
      });
    }
  }, [changeUpload]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!valuesForm.name && !!valuesForm.value) {
      form.get(valuesForm.name).setValue(valuesForm.value)
      setValuesForm({
        name: null,
        value: null,
      })
    }
  }, [valuesForm])

  useEffect(() => {
    setFixtureSelectTypeRequest({...fixtureSelectTypeRequest, disabled: !optionsTypeRequest.length})
  }, [optionsTypeRequest]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = (e) => {
    setChangeUpload({
      valid: true,
      info: e.detail,
    });
  };

  return (
    <>
    {isShowTypeRequest ? (
      <>
        <div className="certificatestudyformitem">
        <Select
          data={fixtureSelectTypeRequest}
          options={optionsTypeRequest}
          onClick={(e) => {
            setValuesForm({
              name: fixtureSelectTypeRequest.name,
              value: e.detail,
            });
          }}
        />
      </div>
      </>
    ): (
      ""
    )}
      <div className="scholarshipfile-content">
        <div className="scholarshipnoticeupload">{texts?.procedures?.uploadTextMax}</div>
        <p className="scholarshiptitle">{texts?.procedures?.scholarship.uploadScholarship}</p>
        <div className="scholarshipupload">
          <Upload 
          data={uploadScholarship} 
          hasError={fileError.requestScholarship.hasError}
          errorMessage={fileError.requestScholarship.errorMessage}
          onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
              valid: true,
              info: {id: uploadScholarship.id, isError: true}
            });
          }}
          />
        </div>
    {isShowTypeRequest ? (
      <>
        <p className="scholarshiptitle">{texts?.procedures?.scholarship.uploadAcademicHistory}</p>
        <div className="scholarshipupload">
          <Upload 
          data={uploadAcademicHistory} 
          hasError={fileError.requestScholarshipAcademicHistory.hasError}
          errorMessage={fileError.requestScholarshipAcademicHistory.errorMessage}
          onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
              valid: true,
              info: {id: uploadAcademicHistory.id, isError: true}
            });
          }}
          />
        </div>
        </>
    ): (
      ""
    )}
    {isShowTypeRequest ? (
      <>
        <p className="scholarshiptitle">{texts?.procedures?.scholarship.uploadProofPayment}</p>
        <div className="scholarshipupload">
          <Upload 
          data={uploadProofPayment} 
          hasError={fileError.requestScholarshipProofPayment.hasError}
          errorMessage={fileError.requestScholarshipProofPayment.errorMessage}
          onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
              valid: true,
              info: {id: uploadProofPayment.id, isError: true}
            });
          }}
          />
        </div>
        </>
    ): (
      ""
    )}
    {isShowTypeRequest ? (
      <>
        <p className="scholarshiptitle">{texts?.procedures?.scholarship.uploadDiscountCard}</p>
        <div className="scholarshipupload">
          <Upload 
          data={uploadDiscountCard} 
          hasError={fileError.requestScholarshipDiscountCard.hasError}
          errorMessage={fileError.requestScholarshipDiscountCard.errorMessage}
          onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
              valid: true,
              info: {id: uploadDiscountCard.id, isError: true}
            });
          }}
          />
        </div>
        </>
    ): (
      ""
    )}
    {isShowTypeRequest ? (
      <>
        <p className="scholarshiptitle">{texts?.procedures?.scholarship.uploadCredentialINE}</p>
        <div className="scholarshipupload">
          <Upload 
          data={uploadCredentialINE} 
          hasError={fileError.requestScholarshipCredentialINE.hasError}
          errorMessage={fileError.requestScholarshipCredentialINE.errorMessage}
          onFile={handleUpload}
            onRemove={() => {
              setChangeUpload({
              valid: true,
              info: {id: uploadCredentialINE.id, isError: true}
            });
          }}
          />
        </div>
        </>
    ): (
      ""
    )}
      </div>
      <div className="scholarshipdocbtns">
        <div className="scholarshipdocbtn">
          <Button
            data={{
              ...backBtnScholarship,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
                history.push(`/procedures-flows/${typeflowsProcedures.scholarship}/${typeStagesProcedures.information}`)
              }}
          />
        </div>
        <div className="scholarshipdocbtn">
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

export default ScholarshipDocuments;