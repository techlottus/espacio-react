import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProfile } from "../../../../../components/Card/CardProfile";
import { Input } from "../../../../../components/Input/Input";
import {
  cancelBtnDegree,
  feedbackNoticeDegree,
  inputPhoneDegree,
  nextBtnDegree,
  selectTypePaymentDegree,
  selectTypeProgramDegree,
} from "../../../../../constants/ProceduresDegree.constant";
import { Select } from "../../../../../components/Select/Select";
import { Button } from "../../../../../components/Button/Button";
import { ProceduresContext } from "../../../ProceduresContext";
import { useHistory } from "react-router";
import {
  typeflowsProcedures,
  typeStagesProcedures,
  cardProfileProcedures,
} from "../../../../../constants/Procedures.constant";
import { getValuesOfAuth } from "../../../../../helpers/auth";
import { useSelectProcedures } from "../../../../../hooks/useSelectProcedures";
import { setDegreeDataGraduate } from "../../../../../actions/proceduresActions/degreeAction";
import { useFormBuilder } from "../../../../../hooks/useForm";
import "./DegreeGraduateInformation.scss";
import { resetFlowProcedures } from "../../../../../helpers/proceduresActions";
import { getImageOfAssets } from "../../../../../helpers/getImages";
import { getDegreeInfoValidators } from "../../../../../validators/procedures/degreeValidator";
import { Feedback } from "../../../../../components/Feedback/Feedback";

const DegreeGraduateInformation = () => {
  const { handleSteps } = useContext(ProceduresContext);
  const { texts } = useSelector((state) => state.texts);

  const history = useHistory();
  const dispatch = useDispatch();

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresDegree.degreeGraduate
  );

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const [profile, setProfile] = useState({
    ...cardProfileProcedures,
    image: getImageOfAssets(texts?.accountStatus?.images?.user),
  });

  const [optionsTypeProgramDegree] = useSelectProcedures(
    infoStore.optionsTypeProgramDegree,
    dataStore.selectTypeProgramDegree
  );

  const [optionsTypePaymentDegree] = useSelectProcedures(
    infoStore.optionsTypePaymentDegree,
    dataStore.selectTypePaymentDegree
  );

  const [valuePhone, setValuePhone] = useState("");

  const actionValid = () => {
    dispatch(setDegreeDataGraduate(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.degreeGraduate}/${typeStagesProcedures.documents}`
    );
  };

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnDegree, actionValid);

  useEffect(() => {
    const infoProfile = profileProcedure;
    setProfile((state) => {
      return {
        ...state,
        name: infoProfile?.name,
        items: infoProfile?.items,
      };
    });
    setValuePhone(dataStore.phone || getValuesOfAuth().phone);
  }, [dataStore, profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSteps(0);
    setNextBtn(false);
    setForm(getDegreeInfoValidators(dataStore));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (valuesForm.name && valuesForm.value) {
      form.get(valuesForm.name).setValue(valuesForm.value);
      setValuesForm({
        name: null,
        value: null,
      });
    }
  }, [valuesForm, form]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="degreeinfocontainer">
        <div className="degreeprofile">
          <CardProfile data={profile} />
        </div>
        <div className="degreeinfonumber">
          <p className="degreeinfonumbertitle">
            {texts?.procedures?.phoneText}
          </p>
          <div className="degreeitem">
            <Input
              data={inputPhoneDegree.data}
              value={valuePhone}
              hasError={errorForms[inputPhoneDegree.data.name]}
              errorMessage={inputPhoneDegree.errorMessage}
              eventKeyPress={(e) => {
                setValuesForm({
                  name: inputPhoneDegree.data.name,
                  value: e.detail.value,
                });
              }}
            />
          </div>
          {/* <div className="degreeitem">
              <Select
                data={selectTypeProgramDegree.data}
                options={optionsTypeProgramDegree}
                onClick={(e) => {
                  setValuesForm({
                    name: selectTypeProgramDegree.name,
                    value: e.detail,
                  });
                }}
              />
            </div> */}
          <div className="degreeitem">
            <Select
              data={selectTypePaymentDegree.data}
              options={optionsTypePaymentDegree}
              onClick={(e) => {
                setValuesForm({
                  name: selectTypePaymentDegree.name,
                  value: e.detail,
                });
              }}
            />
          </div>
        </div>
        <div className="degreebtns">
          <div className="degreebtn">
            <Button
              data={{
                ...cancelBtnDegree,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                resetFlowProcedures(dispatch);
                history.push(`/procedures-main`);
              }}
            />
          </div>
          <div className="degreebtn">
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

export default DegreeGraduateInformation;
