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
import "./ElderOrIllSocialServiceInformation.scss";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { getImageOfAssets } from "../../../../helpers/getImages";
import {
  cancelBtnSocialServiceElderOrIll,
  inputSocialServiceElderOrIllNum,
  nextBtnSocialServiceElderOrIll,
} from "../../../../constants/ProceduresElderOrIllSocialService.constant.js";
import { getElderOrIllValidator } from "../../../../validators/procedures/elderOrIllValidator";
import {
  setSocialServiceInformation,
} from "../../../../actions/proceduresActions/socialServiceAction";

const ElderOrIllSocialServiceInformation = () => {
  const { handleSteps } = useContext(ProceduresContext);
  const { texts } = useSelector((state) => state.texts);

  const history = useHistory();
  const dispatch = useDispatch();

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresSocialService
  );

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const [profile, setProfile] = useState({
    ...cardProfileProcedures,
    image: getImageOfAssets(texts?.accountStatus?.images?.user),
  });

  const [valuePhone, setValuePhone] = useState("");

  const actionValid = () => {
    dispatch(
      setSocialServiceInformation({
        ...next.value,
      })
    );
    history.push(
      `/procedures-flows/${typeflowsProcedures.elderOrIllSocialService}/${typeStagesProcedures.documents}`
    );
  };

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnSocialServiceElderOrIll, actionValid);

  useEffect(() => {
    if (infoStore !== null) {
      const inforProfile = profileProcedure;
      setProfile((state) => {
        return {
          ...state,
          name: inforProfile?.name,
          items: inforProfile?.items,
        };
      });
    }
    setValuePhone(infoStore.phone || getValuesOfAuth().phone);
  }, [dataStore, infoStore, profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSteps(0);

    if (dataStore) {
      setNextBtn(false);
    }
    setForm(getElderOrIllValidator(form.value));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (valuesForm.name && valuesForm.value) {
      form.get(valuesForm.name).setValue(valuesForm.value);
      if (valuesForm.name) {
        setForm(getElderOrIllValidator(form.value));
      }
      setValuesForm({
        name: null,
        value: null,
      });
    }
  }, [valuesForm, form]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="elderorillinfocontainer">
        <div className="elderorillprofile">
          <CardProfile data={profile} />
        </div>
        <div className="elderorillinfonumber">
          <p className="elderorillinfonumbertitle">
            {texts?.procedures?.phoneText}
          </p>
          <div className="elderorillitem">
            <Input
              data={inputSocialServiceElderOrIllNum.data}
              value={valuePhone}
              hasError={errorForms[inputSocialServiceElderOrIllNum.data.name]}
              errorMessage={inputSocialServiceElderOrIllNum.errorMessage}
              eventKeyPress={(e) => {
                setValuesForm({
                  name: inputSocialServiceElderOrIllNum.data.name,
                  value: e.detail.value,
                });
              }}
            />
          </div>
        </div>
        <div className="elderorillbtns">
          <div className="elderorillbtn">
            <Button
              data={{
                ...cancelBtnSocialServiceElderOrIll,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                resetFlowProcedures(dispatch);
                history.push(`/procedures-main`);
              }}
            />
          </div>
          <div className="elderorillbtn">
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

export default ElderOrIllSocialServiceInformation;
