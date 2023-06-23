import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";
import { ProceduresContext } from "../../ProceduresContext";
import { useHistory } from "react-router";
import {
  typeflowsProcedures,
  typeStagesProcedures,
  cardProfileProcedures,
} from "../../../../constants/Procedures.constant";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { useFormBuilder } from "../../../../hooks/useForm";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { getImageOfAssets } from "../../../../helpers/getImages";
import {
  cancelBtnAdmissionCertificate,
  endDateAdmissionCertificate,
  initDateAdmissionCertificate,
  inputBirthCountryAdmissionCertificate,
  inputPhoneAdmissionCertificate,
  inputSchoolNameAdmissionCertificate,
  inputStudyCountryAdmissionCertificate,
  nextBtnAdmissionCertificate,
  textareaAdmissionCertificate,
} from "../../../../constants/ProceduresAdmissionCertificate.constant";
import { getAdmissionCertificateInfoValidators } from "../../../../validators/procedures/admissionCertificateValidator";
import { getAdmissionCertificateService } from "../../../../middlewares/proceduresMiddlewares/admissionCertificateMiddleware";
import { setAdmissionCertificateData } from "../../../../actions/proceduresActions/admissionCertificateAction";
import "./AdmissionCertificateInformation.scss";
import DateRangePicker from "../../../../components/DateRangePicker/DateRangePicker";

const AdmissionCertificateInformation = () => {
  const { handleSteps } = useContext(ProceduresContext);
  const { texts } = useSelector((state) => state.texts);

  const history = useHistory();
  const dispatch = useDispatch();

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresAdmissionCertificate
  );

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const [profile, setProfile] = useState({
    ...cardProfileProcedures,
    image: getImageOfAssets(texts?.accountStatus?.images?.user),
  });

  const [valuePhone, setValuePhone] = useState("");
  const [valueBirthCountry, setValueBirthCountry] = useState("");
  const [valueStudyCountry, setValueStudyCountry] = useState("");
  const [valueSchoolName, setValueSchoolName] = useState("");
  const [valueComments, setValueComments] = useState("");
  const [valueFirstDate, setValueFirstDate] = useState("");
  const [valueSecondDate, setValueSecondDate] = useState("");

  const actionValid = () => {
    dispatch(setAdmissionCertificateData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.admissionCertificate}/${typeStagesProcedures.documents}`
    );
  };

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnAdmissionCertificate, actionValid);

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
    setValueBirthCountry(dataStore.countryOfBirth || "");
    setValueStudyCountry(dataStore.countryOfPriorStudies || "");
    setValueSchoolName(dataStore.schoolOfOrigin || "");
    setValueComments(dataStore.comments || "");
    setValueFirstDate(dataStore.dateStudiesStarted || "");
    setValueSecondDate(dataStore.dateStudiesFinished || "");
  }, [dataStore, infoStore, profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSteps(0);

    if (dataStore) {
      setNextBtn(false);
    } else {
      dispatch(getAdmissionCertificateService());
    }
    setForm(getAdmissionCertificateInfoValidators(form.value));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (valuesForm.name) {
      form.get(valuesForm.name).setValue(valuesForm.value);
      setValuesForm({
        name: null,
        value: null,
      });
    }
  }, [valuesForm, form]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="admissioncinfocontainer">
        {profileProcedure ? (
          <div className="admissioncertificateprofile">
            <CardProfile data={profile} />
          </div>
        ) : (
          ""
        )}
        <div className="forminformationadmissioncertificate">
          <div className="admissioncertificateinfonumber">
            <p className="admissioncertificateinfonumbertitle">
              {texts?.procedures?.phoneText}
            </p>
            <div className="admissioncertificateitem">
              <Input
                data={inputPhoneAdmissionCertificate.data}
                value={valuePhone}
                hasError={errorForms[inputPhoneAdmissionCertificate.data.name]}
                errorMessage={inputPhoneAdmissionCertificate.errorMessage}
                eventKeyPress={(e) => {
                  setValuesForm({
                    name: inputPhoneAdmissionCertificate.data.name,
                    value: e.detail.value,
                  });
                }}
              />
            </div>
            <div className="admissioncertificateitem">
              <Input
                data={inputBirthCountryAdmissionCertificate.data}
                value={valueBirthCountry}
                hasError={
                  errorForms[inputBirthCountryAdmissionCertificate.data.name]
                }
                errorMessage={
                  inputBirthCountryAdmissionCertificate.errorMessage
                }
                eventKeyPress={(e) => {
                  setValuesForm({
                    name: inputBirthCountryAdmissionCertificate.data.name,
                    value: e.detail.value,
                  });
                }}
              />
            </div>
            <div className="admissioncertificateitem">
              <Input
                data={inputStudyCountryAdmissionCertificate.data}
                value={valueStudyCountry}
                hasError={
                  errorForms[inputStudyCountryAdmissionCertificate.data.name]
                }
                errorMessage={
                  inputStudyCountryAdmissionCertificate.errorMessage
                }
                eventKeyPress={(e) => {
                  setValuesForm({
                    name: inputStudyCountryAdmissionCertificate.data.name,
                    value: e.detail.value,
                  });
                }}
              />
            </div>
            <div className="admissioncertificateitem">
              <Input
                data={inputSchoolNameAdmissionCertificate.data}
                value={valueSchoolName}
                hasError={
                  errorForms[inputSchoolNameAdmissionCertificate.data.name]
                }
                errorMessage={inputSchoolNameAdmissionCertificate.errorMessage}
                eventKeyPress={(e) => {
                  setValuesForm({
                    name: inputSchoolNameAdmissionCertificate.data.name,
                    value: e.detail.value,
                  });
                }}
              />
            </div>
            <div className="admissioncertificateitem">
              <div className="admissioncertificateselects">
                <DateRangePicker
                  firstDateLabel={initDateAdmissionCertificate.textDefault}
                  secondDateLabel={endDateAdmissionCertificate.textDefault}
                  dateFirst={valueFirstDate}
                  dateSecond={valueSecondDate}
                  onFirstDate={(value) => {
                      setValuesForm({
                        name: initDateAdmissionCertificate.name,
                        value,
                      });
                    }
                  }
                  onSecondDate={(value) => {
                      setValuesForm({
                        name: endDateAdmissionCertificate.name,
                        value,
                      });
                    }
                  }
                />
              </div>
            </div>
            <div className="admissioncertificateitem">
              <Input
                data={textareaAdmissionCertificate.data}
                value={valueComments}
                eventKeyPress={(e) => {
                  setValuesForm({
                    name: textareaAdmissionCertificate.data.name,
                    value: e.detail.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="admissioncertificatebtns">
          <div className="academicbtn">
            <Button
              data={{
                ...cancelBtnAdmissionCertificate,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                resetFlowProcedures(dispatch);
                history.push(`/procedures-main`);
              }}
            />
          </div>
          <div className="academicbtn">
            <Button
              data={nextBtn}
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

export default AdmissionCertificateInformation;
