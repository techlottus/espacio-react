import React, { useContext, useEffect, useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { Input } from "../../../../components/Input/Input";
import "./RevalidateStudiesData.scss";
import { Button } from "../../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { cardProfile } from "../../../../constants/AccountStatus.constant";
import { useHistory } from "react-router";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { useFormBuilder } from "../../../../hooks/useForm";
import { getImageOfAssets } from "../../../../helpers/getImages";
import {
  backBtnRevalidate,
  nextBtnRevalidate,
  revalidateSecondStepForm,
} from "../../../../constants/ProceduresRevalidateStudies.constant";
import { ProceduresContext } from "../../ProceduresContext";
import {
  setRevalidateStudiesData,
  setRevalidateStudiesTwoData,
} from "../../../../actions/proceduresActions/revalidateStudiesAction";
import { getRevalidateStudiesPartTwoValidators } from "../../../../validators/procedures/revalidateStudiesValidators";

const RevalidateStudiesData = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { texts } = useSelector((state) => state.texts);

  const { handleSteps } = useContext(ProceduresContext);

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

  const [valueSchoolPhone, setValueSchoolPhone] = useState("");
  const [valueschoolEmail, setValueSchoolEmail] = useState("");
  const [valueStartDatePreviousLevel, setValueStartDatePreviousLevel] =
    useState("");
  const [valueEndDatePreviousLevel, setValueEndDatePreviousLevel] =
    useState("");
  const [valueComments, setValueComments] = useState("");

  const actionValid = () => {
    dispatch(setRevalidateStudiesTwoData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.documents}`
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
    setValueSchoolPhone(dataStore.schoolPhone || "");
    setValueSchoolEmail(dataStore.schoolEmail || "");
    setValueStartDatePreviousLevel(dataStore.startDatePreviousLevel || "");
    setValueEndDatePreviousLevel(dataStore.endDatePreviousLevel || "");
    setValueComments(dataStore.comments || "");
  }, [dataStore, infoStore, profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSteps(1);
    if (!dataStore?.phone) {
      history.push(
        `/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.information}`
      );
    }
    setForm(getRevalidateStudiesPartTwoValidators(dataStore));
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
      <p className="revalidatetitleschool">
        {texts?.procedures?.revalidateStudy.titleSchool}
      </p>
      <div className="revalidateformitem">
        <Input
          data={revalidateSecondStepForm.phoneInput.data}
          value={valueSchoolPhone}
          hasError={errorForms[revalidateSecondStepForm.phoneInput.data.name]}
          errorMessage={revalidateSecondStepForm.phoneInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateSecondStepForm.phoneInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateSecondStepForm.emailInput.data}
          value={valueschoolEmail}
          hasError={errorForms[revalidateSecondStepForm.emailInput.data.name]}
          errorMessage={revalidateSecondStepForm.emailInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateSecondStepForm.emailInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateSecondStepForm.startDateInput.data}
          value={valueStartDatePreviousLevel}
          hasError={
            errorForms[revalidateSecondStepForm.startDateInput.data.name]
          }
          errorMessage={revalidateSecondStepForm.startDateInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateSecondStepForm.startDateInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateSecondStepForm.endDateInput.data}
          value={valueEndDatePreviousLevel}
          hasError={errorForms[revalidateSecondStepForm.endDateInput.data.name]}
          errorMessage={revalidateSecondStepForm.endDateInput.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateSecondStepForm.endDateInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidateformitem">
        <Input
          data={revalidateSecondStepForm.commentsInput.data}
          value={valueComments}
          eventKeyPress={(e) => {
            setValuesForm({
              name: revalidateSecondStepForm.commentsInput.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="revalidatebtns">
        <div className="revalidatebtn">
          <Button
            data={{
              ...backBtnRevalidate,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              resetFlowProcedures(dispatch);
              history.push(
                `/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.information}`
              );
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

export default RevalidateStudiesData;
