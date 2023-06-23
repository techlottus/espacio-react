import React, { useContext, useEffect, useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { Input } from "../../../../components/Input/Input";
import "./ScholarshipInformation.scss";
import { Button } from "../../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { cardProfile } from "../../../../constants/AccountStatus.constant";
import { useHistory } from "react-router";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { useFormBuilder } from "../../../../hooks/useForm";
import { ProceduresContext } from "../../ProceduresContext";
import { getImageOfAssets } from "../../../../helpers/getImages";
import { setScholarshipData } from "../../../../actions/proceduresActions/scholarshipAction";
import { cancelBtnScholarship, inputScholarshipNum, nextBtnScholarship, textareaScholarship } from "../../../../constants/ProceduresScholarship.constant";
import { getScholarshipService } from "../../../../middlewares/proceduresMiddlewares/scholarshipMiddleware";
import { getScholarshipValidators } from "../../../../validators/procedures/scholarshipValidator";

const ScholarshipInformation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { handleSteps } = useContext(ProceduresContext);

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresScholarship
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
    dispatch(setScholarshipData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.scholarship}/${typeStagesProcedures.documents}`
    );
  };
  const {form, setForm, next, setNext, nextBtn, setNextBtn,errorForms} = useFormBuilder(
    nextBtnScholarship,
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
      dispatch(getScholarshipService());
    }
    setForm(getScholarshipValidators(dataStore));
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
        <div className="scholarshipprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        ""
      )}
      <div className="scholarshipnumber">
        <p className="scholarshiptitlenum">{texts.procedures.phoneText}</p>
        <div className="scholarshipinput">
          <Input
            data={inputScholarshipNum.data}
            value={valuePhone}
            hasError={errorForms[inputScholarshipNum.data.name]}
            errorMessage={inputScholarshipNum.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: inputScholarshipNum.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="scholarshipformitem">
        <Input
          data={textareaScholarship.data}
          value={valueComments}
          eventKeyPress={(e) => {
            setValuesForm({
              name: textareaScholarship.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="scholarshipinfbtns">
        <div className="scholarshipinfbtn">
          <Button
            data={{
              ...cancelBtnScholarship,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              resetFlowProcedures(dispatch);
              history.push(`/procedures-main`);
            }}
          />
        </div>
        <div className="scholarshipinfbtn">
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

export default ScholarshipInformation;
