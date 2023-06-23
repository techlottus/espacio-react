import React, { useContext, useEffect, useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { Input } from "../../../../components/Input/Input";
import "./RevalidateStudiesInformation.scss";
import { Button } from "../../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { cardProfile } from "../../../../constants/AccountStatus.constant";
import { useHistory } from "react-router";
import {
  stepsProceduresRevalidate,
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { useFormBuilder } from "../../../../hooks/useForm";
import { getImageOfAssets } from "../../../../helpers/getImages";
import {
  cancelBtnRevalidate,
  inputRevalidateNum,
  nextBtnRevalidate,
  revalidateFirstStepForm,
} from "../../../../constants/ProceduresRevalidateStudies.constant";
import { ProceduresContext } from "../../ProceduresContext";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { getRevalidateStudiesService } from "../../../../middlewares/proceduresMiddlewares/revalidateStudiesMiddleware";
import { setRevalidateStudiesOneData } from "../../../../actions/proceduresActions/revalidateStudiesAction";
import { getRevalidateStudiesPartOneValidators } from "../../../../validators/procedures/revalidateStudiesValidators";

const RevalidateStudiesInformation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { texts } = useSelector((state) => state.texts);

  const { handleStepsBody } = useContext(ProceduresContext);

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresRevalidateStudies
  );

  const [profile, setProfile] = useState({
    ...cardProfile,
    image: getImageOfAssets(texts?.accountStatus?.images?.user),
  });

  const [valuePhone, setValuePhone] = useState("");
  const [valueCountryBirth, setValueCountryBirth] = useState("");
  const [valueCountryStudyPrevious, setValueCountryStudyPrevious] =
    useState("");
  const [valueNameSchoolOrigin, setValueNameSchoolOrigin] = useState("");
  const [valueStreet, setValueStreet] = useState("");
  const [valueNumber, setValueNumber] = useState("");
  const [valueNeighborhood, setValueNeighborhood] = useState("");
  const [valuePostalCode, setValuePostalCode] = useState("");
  const [valueTown, setValueTown] = useState("");
  const [valueCity, setValueCity] = useState("");
  const [valueEntity, setValueEntity] = useState("");

  const actionValid = () => {
    dispatch(setRevalidateStudiesOneData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.data}`
    );
  };

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnRevalidate, actionValid);

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
    setValueCountryBirth(dataStore.countryOfBirth || "");
    setValueCountryStudyPrevious(dataStore.countryOfPriorStudies || "");
    setValueNameSchoolOrigin(dataStore.schoolOfOrigin || "");
    setValueStreet(dataStore.street || "");
    setValueNumber(dataStore.number || "");
    setValueNeighborhood(dataStore.neighborhood || "");
    setValuePostalCode(dataStore.cp || "");
    setValueTown(dataStore.population || "");
    setValueCity(dataStore.city || "");
    setValueEntity(dataStore.entity || "");
  }, [dataStore, infoStore, profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleStepsBody(0, stepsProceduresRevalidate.titles);
    if (dataStore.phone) {
      setNextBtn(false);
    } else {
      dispatch(getRevalidateStudiesService());
    }
    setForm(getRevalidateStudiesPartOneValidators(dataStore));
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
      {profileProcedure ? (
        <div className="revalidateprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        ""
      )}
      <div className="revalidatenumber">
        <p className="revalidatetitlenum">{texts.procedures.phoneText}</p>
        <div className="revalidateinput">
          <Input
            data={inputRevalidateNum.data}
            value={valuePhone}
            hasError={errorForms[inputRevalidateNum.data.name]}
            errorMessage={inputRevalidateNum.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: inputRevalidateNum.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.countryBirthInput.data}
          value={valueCountryBirth}
          hasError={
            errorForms[revalidateFirstStepForm.countryBirthInput.data.name]
          }
          errorMessage={revalidateFirstStepForm.countryBirthInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.countryBirthInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.countryStudyPreviousInput.data}
          value={valueCountryStudyPrevious}
          hasError={
            errorForms[
              revalidateFirstStepForm.countryStudyPreviousInput.data.name
            ]
          }
          errorMessage={
            revalidateFirstStepForm.countryStudyPreviousInput.errorMessage
          }
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.countryStudyPreviousInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.nameSchoolOriginInput.data}
          value={valueNameSchoolOrigin}
          hasError={
            errorForms[revalidateFirstStepForm.nameSchoolOriginInput.data.name]
          }
          errorMessage={
            revalidateFirstStepForm.nameSchoolOriginInput.errorMessage
          }
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.nameSchoolOriginInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <p className="revalidatetitleaddress">
        {texts?.procedures?.revalidateStudy.titleAddress}
      </p>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.streetInput.data}
          value={valueStreet}
          hasError={errorForms[revalidateFirstStepForm.streetInput.data.name]}
          errorMessage={revalidateFirstStepForm.streetInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.streetInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.numberInput.data}
          value={valueNumber}
          hasError={errorForms[revalidateFirstStepForm.numberInput.data.name]}
          errorMessage={revalidateFirstStepForm.numberInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.numberInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.neighborhoodInput.data}
          value={valueNeighborhood}
          hasError={
            errorForms[revalidateFirstStepForm.neighborhoodInput.data.name]
          }
          errorMessage={revalidateFirstStepForm.neighborhoodInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.neighborhoodInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.postalCodeInput.data}
          value={valuePostalCode}
          hasError={
            errorForms[revalidateFirstStepForm.postalCodeInput.data.name]
          }
          errorMessage={revalidateFirstStepForm.postalCodeInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.postalCodeInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.townInput.data}
          value={valueTown}
          hasError={errorForms[revalidateFirstStepForm.townInput.data.name]}
          errorMessage={revalidateFirstStepForm.townInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.townInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.cityInput.data}
          value={valueCity}
          hasError={errorForms[revalidateFirstStepForm.cityInput.data.name]}
          errorMessage={revalidateFirstStepForm.cityInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.cityInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateFirstStepForm.entityInput.data}
          value={valueEntity}
          hasError={errorForms[revalidateFirstStepForm.entityInput.data.name]}
          errorMessage={revalidateFirstStepForm.entityInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateFirstStepForm.entityInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>

      <div className="revalidatebtns">
        <div className="revalidatebtn">
          <Button
            data={{
              ...cancelBtnRevalidate,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              resetFlowProcedures(dispatch);
              history.push(`/procedures-main`);
            }}
          />
        </div>
        <div className="revalidatebtn">
          <Button
            data={nextBtn}
            onClick={() => {
              setNext(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default RevalidateStudiesInformation;
