import React, { useContext, useEffect, useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { Input } from "../../../../components/Input/Input";
import "./ReinstatementInformation.scss";
import { Button } from "../../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { cardProfile } from "../../../../constants/AccountStatus.constant";
import { useHistory } from "react-router";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import {
  cancelBtnReinstatement,
  inputReinstatementNum,
  nextBtnReinstatement,
  textareaReinstatement,
} from "../../../../constants/ProceduresReinstatement.constant";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import {
  setReinstatementData,
} from "../../../../actions/proceduresActions/reinstatementAction";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { getReinstatementValidators } from "../../../../validators/procedures/reinstatementValidator";
import { useFormBuilder } from "../../../../hooks/useForm";
import { ProceduresContext } from "../../ProceduresContext";
import { getReinstatementService } from "../../../../middlewares/proceduresMiddlewares/reinstamentMiddleware";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { cancelStepOneReinstatementTag, nextStepOneReinstatementTag } from "../../../../tagging/flows/procedures/reinstatementTag";
import { getImageOfAssets } from "../../../../helpers/getImages";

const ReinstatementInformation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { handleSteps } = useContext(ProceduresContext);

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresReinstatement
  );

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const { texts } = useSelector((state) => state.texts);
  const [profile, setProfile] = useState({ 
    ...cardProfile, 
    image: getImageOfAssets(texts?.accountStatus?.images?.user)
  });
  const [valuePhone, setValuePhone] = useState("");
  const [valueComments, setValueComments] = useState("");

  const actionValid = () => {
    dispatch(setReinstatementData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.reinstatement}/${typeStagesProcedures.documents}`
    );
  };
  const {form, setForm, next, setNext, nextBtn, setNextBtn,errorForms} = useFormBuilder(
    nextBtnReinstatement,
    actionValid
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
  }, [dataStore, infoStore, profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSteps(0);
    if (dataStore.phone) {
      setNextBtn(false);
    } else {
      dispatch(getReinstatementService());
    }
    setForm(getReinstatementValidators(dataStore, getValuesOfAuth()));
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
      {profileProcedure ? (
        <div className="reinstatementprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        ""
      )}
      <div className="reinstatementnumber">
        <p className="reinstatementtitle">{texts.procedures.phoneText}</p>
        <div className="reinstatementinput">
          <Input
            data={inputReinstatementNum.data}
            value={valuePhone}
            hasError={errorForms[inputReinstatementNum.data.name]}
            errorMessage={inputReinstatementNum.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: inputReinstatementNum.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="reinstatementformitem">
        <Input
          data={textareaReinstatement.data}
          value={valueComments}
          eventKeyPress={(e) => {
            setValuesForm({
              name: textareaReinstatement.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="reinstatementinfbtns">
        <div className="reinstatementinfbtn">
          <Button
            data={{
              ...cancelBtnReinstatement,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              resetFlowProcedures(dispatch);
              history.push(`/procedures-main`);
              sendInfoTM(window, cancelStepOneReinstatementTag, "cancel")
            }}
          />
        </div>
        <div className="reinstatementinfbtn">
          <Button
            data={nextBtn}
            onClick={() => {
              setNext(true);
              sendInfoTM(window, nextStepOneReinstatementTag, "next")
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ReinstatementInformation;
