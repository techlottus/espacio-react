import React, { useContext, useEffect, useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { Input } from "../../../../components/Input/Input";
import "./EquivalenceStudiesInformation.scss";
import { Button } from "../../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBtnEquivalenceStudy,
  inputEquivalenceStudyNum,
  nextBtnEquivalenceStudy,
  textareaEquivalenceStudy,
} from "../../../../constants/ProceduresEquivalenceStudies.constant";
import { cardProfile } from "../../../../constants/AccountStatus.constant";
import { useHistory } from "react-router";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { ProceduresContext } from "../../ProceduresContext";
import { useFormBuilder } from "../../../../hooks/useForm";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { getEquivalenceStudiesValidators } from "../../../../validators/procedures/equivalenceStudiesValidators";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { getEquivalenceStudiesService } from "../../../../middlewares/proceduresMiddlewares/equivalenceStudiesMiddleware";
import { setEquivalenceStudiesData } from "../../../../actions/proceduresActions/equivalenceStudiesAction";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { cancelStepOneEquivalenceStudiesTag, nextStepOneEquivalenceStudiesTag } from "../../../../tagging/flows/procedures/equivalenceStudiesTag";
import { getImageOfAssets } from "../../../../helpers/getImages";

const EquivalenceStudiesInformation = () => {
  const history = useHistory();
  const { texts } = useSelector((state) => state.texts);
  const [profile, setProfile] = useState({ 
    ...cardProfile, 
    image: getImageOfAssets(texts?.accountStatus?.images?.user)
  });
  const dispatch = useDispatch();

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });
  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.procedureEquivalenceStudies
  );

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const [valuePhone, setValuePhone] = useState("");
  const [valueComments, setValueComments] = useState("");
  const { handleSteps } = useContext(ProceduresContext);

  const actionValid = () => {
    dispatch(setEquivalenceStudiesData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.equivalenceStudy}/${typeStagesProcedures.documents}`
    );
  };

  const {form, setForm, next, setNext, nextBtn, setNextBtn,errorForms} = useFormBuilder(
    nextBtnEquivalenceStudy,
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
      dispatch(getEquivalenceStudiesService());
    }
    setForm(getEquivalenceStudiesValidators(dataStore));
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
        <div className="equivalencestudyprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        ""
      )}
      <div className="equivalencestudynumber">
        <p className="equivalencestudytitlenum">{texts.procedures.phoneText}</p>
        <div className="equivalencestudyinput">
          <Input
            data={inputEquivalenceStudyNum.data}
            value={valuePhone}
            hasError={errorForms[inputEquivalenceStudyNum.data.name]}
            errorMessage={inputEquivalenceStudyNum.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: inputEquivalenceStudyNum.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="equivalencestudyform">
        <div className="equivalencestudyformitem">
          <Input
            data={textareaEquivalenceStudy.data}
            value={valueComments}
            eventKeyPress={(e) => {
              setValuesForm({
                name: textareaEquivalenceStudy.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="equivalencestudyinfbtns">
        <div className="equivalencestudyinfbtn">
          <Button
            data={{
              ...cancelBtnEquivalenceStudy,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              resetFlowProcedures(dispatch);
              history.push(`/procedures-main`);
              sendInfoTM(window, cancelStepOneEquivalenceStudiesTag)

            }}
          />
        </div>
        <div className="equivalencestudyinfbtn">
          <Button
            data={nextBtn}
            onClick={() => {
              sendInfoTM(window, nextStepOneEquivalenceStudiesTag)
              setNext(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EquivalenceStudiesInformation;
