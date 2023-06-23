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
import "./RegisterProgramOrInstituteInformation.scss";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { getImageOfAssets } from "../../../../helpers/getImages";
import {
  nextBtnSocialServiceElderOrIll,
} from "../../../../constants/ProceduresElderOrIllSocialService.constant.js";
import { getRegisterProgramOrInstituteValidator } from "../../../../validators/procedures/registerProgramOrInstituteValidator";
import {
  cancelBtnRegisterProgramOrInstitute,
  inputRegisterProgramOrInstituteNum,
} from "../../../../constants/ProceduresRegisterProgramOrInstitute.constant";
import { setSocialServiceInformation } from "../../../../actions/proceduresActions/socialServiceAction";

const RegisterProgramOrInstituteInformation = () => {
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
      `/procedures-flows/${typeflowsProcedures.registerProgramorInstitute}/${typeStagesProcedures.documents}`
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
    setForm(getRegisterProgramOrInstituteValidator(form.value));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (valuesForm.name && valuesForm.value) {
      form.get(valuesForm.name).setValue(valuesForm.value);
      if (valuesForm.name) {
        setForm(getRegisterProgramOrInstituteValidator(form.value));
      }
      setValuesForm({
        name: null,
        value: null,
      });
    }
  }, [valuesForm, form]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="registerprogramorinstituteinfocontainer">
        <div className="registerprogramorinstituteprofile">
          <CardProfile data={profile} />
        </div>
        <div className="registerprogramorinstituteinfonumber">
          <p className="registerprogramorinstituteinfonumbertitle">
            {texts?.procedures?.phoneText}
          </p>
          <div className="registerprogramorinstituteitem">
            <Input
              data={inputRegisterProgramOrInstituteNum.data}
              value={valuePhone}
              hasError={
                errorForms[inputRegisterProgramOrInstituteNum.data.name]
              }
              errorMessage={inputRegisterProgramOrInstituteNum.errorMessage}
              eventKeyPress={(e) => {
                setValuesForm({
                  name: inputRegisterProgramOrInstituteNum.data.name,
                  value: e.detail.value,
                });
              }}
            />
          </div>
        </div>
        <div className="registerprogramorinstitutebtns">
          <div className="registerprogramorinstitutebtn">
            <Button
              data={{
                ...cancelBtnRegisterProgramOrInstitute,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                resetFlowProcedures(dispatch);
                history.push(`/procedures-main`);
              }}
            />
          </div>
          <div className="registerprogramorinstitutebtn">
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

export default RegisterProgramOrInstituteInformation;
