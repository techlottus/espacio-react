import React, { useContext, useEffect, useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import {
  cardProfileProcedures,
  typeflowsProcedures,
  typesDelivaryProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { Select } from "../../../../components/Select/Select";
import { Input } from "../../../../components/Input/Input";
import {
  cancelBtnCertificateStudy,
  inputCertificatestudyNum,
  nextBtnCertificateStudy,
  selectCampusDeliveryCertificateStudy,
  selectRequestCertificateStudy,
  selectTypeCertificateStudy,
  selectTypeDeliveryCertificateStudy,
  textareaCertificateStudy,
} from "../../../../constants/ProceduresCertificateStudies.constant";
import "./CertificateStudiesInformation.scss";
import { Button } from "../../../../components/Button/Button";
import { ProceduresContext } from "../../ProceduresContext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getCertificateStudyService } from "../../../../middlewares/proceduresMiddlewares/certificateStudyMiddlewares";
import { getValuesOfAuth } from "../../../../helpers/auth";
import {
  setCertificateStudyData,
  setCertificateStudyExtra,
} from "../../../../actions/proceduresActions/certificateStudiesAction";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { useFormBuilder } from "../../../../hooks/useForm";
import {
  typeCertificateProcedure,
  typesModality,
} from "../../../../types/typesProcedures";
import { getCertificateStudyDefaultValidators } from "../../../../validators/procedures/certificateStudiesValidator";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { certificateStudyP1Tag } from "../../../../tagging/flows/procedures/certificateStudyTag";
import { getImageOfAssets } from "../../../../helpers/getImages";

const CertificateStudiesInformation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { handleSteps } = useContext(ProceduresContext);
  const { texts } = useSelector((state) => state.texts);

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.procedureCertificateStudy
  );

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const [profile, setProfile] = useState({
    ...cardProfileProcedures,
    image: getImageOfAssets(texts?.accountStatus?.images?.user),
  });

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const [optionsCertificateType] = useSelectProcedures(
    infoStore.optionsTypeCertificate,
    dataStore.selectTypeCertificate
  );

  const [optionsCertificateRequest] = useSelectProcedures(
    infoStore.optionsCertificateRequest,
    dataStore.selectCertificateRequest
  );

  const [optionsTypeDelivery] = useSelectProcedures(
    infoStore.optionsTypeDelivery,
    dataStore.selectTypeDelivery
  );

  const [optionsCampusDelivery, setOptionsCampusDelivery] = useSelectProcedures(
    infoStore.optionsCampusDelivery,
    dataStore.selectCampusDelivery
  );

  const [valuePhone, setValuePhone] = useState("");

  const [valueComments, setValueComments] = useState("");

  const actionValid = () => {
    dispatch(setCertificateStudyData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.certificateStudy}/${typeStagesProcedures.documents}`
    );
  };

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnCertificateStudy, actionValid);

  const [isShowCampus, setIsShowCampus] = useState(
    dataStore.selectTypeDelivery === typesDelivaryProcedures.fisico
  );

  const [isShowCertificateRequest, setIsShowCertificateRequest] = useState(
    dataStore.selectTypeCertificate === null ||
      dataStore.selectTypeCertificate === typeCertificateProcedure.total
  );

  const [isShowDelivery] = useState(
    getValuesOfAuth().modality === typesModality.withDelivery
  );

  useEffect(() => {
    if (infoStore.profile !== null) {
      const inforProfile = profileProcedure;
      setProfile((state) => {
        return {
          ...state,
          name: inforProfile?.name,
          items: inforProfile?.items,
        };
      });
    }

    setValuePhone(dataStore.phone || getValuesOfAuth().phone);
    setValueComments(dataStore.comments || "");
  }, [infoStore, dataStore, profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSteps(0);

    if (
      dataStore.phone &&
      dataStore.selectCertificateRequest &&
      dataStore.selectTypeCertificate &&
      ((dataStore.selectTypeDelivery === typesDelivaryProcedures.fisico &&
        dataStore.selectCampusDelivery) ||
        dataStore.selectTypeDelivery === typesDelivaryProcedures.digital)
    ) {
      setNextBtn(false);
    } else {
      dispatch(getCertificateStudyService(history));
    }

    setForm(
      getCertificateStudyDefaultValidators(
        dataStore,
        getValuesOfAuth().modality,
        isShowCertificateRequest
      )
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (valuesForm.name === selectTypeCertificateStudy.name) {
      const { cost, detailId } = infoStore.optionsTypeCertificate
        ? infoStore.optionsTypeCertificate.filter(
            (item) => item.value === valuesForm.value
          )[0]
        : {};
      dispatch(setCertificateStudyExtra({ cost, detailId }));
    }
    if (valuesForm.name && valuesForm.value) {
      form.get(valuesForm.name).setValue(valuesForm.value);
      if (valuesForm.name === selectTypeCertificateStudy.name) {
        setForm(
          getCertificateStudyDefaultValidators(
            form.value,
            getValuesOfAuth().modality,
            isShowCertificateRequest
          )
        );
      }

      if (valuesForm.name === selectTypeDeliveryCertificateStudy.name) {
        if (valuesForm.value === typesDelivaryProcedures.digital) {
          setOptionsCampusDelivery(infoStore.optionsCampusDelivery, null);
        }
        const typeDelivery =
          form.get(selectTypeCertificateStudy.name).value ===
          typeCertificateProcedure.total;
        const type =
          form.get(selectTypeDeliveryCertificateStudy.name).value || null;
        setForm(
          getCertificateStudyDefaultValidators(
            form.value,
            getValuesOfAuth().modality,
            typeDelivery,
            type
          )
        );
      }

      setValuesForm({
        name: null,
        value: null,
      });
    }
  }, [valuesForm, form]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIsShowCampus = () => {
    return isShowCampus ? (
      <div className="certificatestudyformitem">
        <Select
          data={selectCampusDeliveryCertificateStudy}
          options={optionsCampusDelivery}
          onClick={(e) => {
            setValuesForm({
              name: selectCampusDeliveryCertificateStudy.name,
              value: e.detail,
            });
          }}
        />
      </div>
    ) : (
      <></>
    );
  };

  return (
    <>
      {profileProcedure ? (
        <div className="certificatestudyprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        <></>
      )}
      <div className="certificatestudynumber">
        <p className="certificatestudytitlenum">{texts.procedures.phoneText}</p>
        <div className="certificatestudyinput">
          <Input
            data={inputCertificatestudyNum.data}
            value={valuePhone}
            hasError={errorForms[inputCertificatestudyNum.data.name]}
            errorMessage={inputCertificatestudyNum.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: inputCertificatestudyNum.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="certificatestudyform">
        <div className="certificatestudyformitem">
          <Select
            data={selectTypeCertificateStudy}
            options={optionsCertificateType}
            onClick={(e) => {
              if (e.detail === typeCertificateProcedure.parcial) {
                setIsShowCertificateRequest(false);
              } else {
                setIsShowCertificateRequest(true);
              }
              setValuesForm({
                name: selectTypeCertificateStudy.name,
                value: e.detail,
              });
            }}
          />
        </div>
        {isShowCertificateRequest ? (
          <div className="certificatestudyformitem">
            <Select
              data={selectRequestCertificateStudy}
              options={optionsCertificateRequest}
              onClick={(e) => {
                setValuesForm({
                  name: selectRequestCertificateStudy.name,
                  value: e.detail,
                });
              }}
            />
          </div>
        ) : (
          <></>
        )}
        {isShowDelivery ? (
          <>
            <div className="certificatestudyformitem">
              <Select
                data={selectTypeDeliveryCertificateStudy}
                options={optionsTypeDelivery}
                onClick={(e) => {
                  if (e.detail === typesDelivaryProcedures.fisico) {
                    setIsShowCampus(true);
                  } else {
                    setIsShowCampus(false);
                  }
                  setValuesForm({
                    name: selectTypeDeliveryCertificateStudy.name,
                    value: e.detail,
                  });
                }}
              />
            </div>
            {handleIsShowCampus()}
          </>
        ) : (
          <></>
        )}
        <div className="certificatestudyformitem">
          <Input
            data={textareaCertificateStudy.data}
            value={valueComments}
            eventKeyPress={(e) => {
              setValuesForm({
                name: textareaCertificateStudy.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="certificatestudyinfbtns">
        <div className="certificatestudyinfbtn">
          <Button
            data={{
              ...cancelBtnCertificateStudy,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              sendInfoTM(window, certificateStudyP1Tag, "cancel");
              resetFlowProcedures(dispatch);
              history.push(`/procedures-main`);
            }}
          />
        </div>
        <div className="certificatestudyinfbtn">
          <Button
            data={nextBtn}
            onClick={() => {
              sendInfoTM(window, certificateStudyP1Tag, "next");
              setNext(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CertificateStudiesInformation;
