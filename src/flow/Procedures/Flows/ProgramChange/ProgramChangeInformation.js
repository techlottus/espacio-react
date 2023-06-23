import React, { useContext, useEffect, useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { cardProfile } from "../../../../constants/AccountStatus.constant";
import { useHistory } from "react-router";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { ProceduresContext } from "../../ProceduresContext";
import { getImageOfAssets } from "../../../../helpers/getImages";
import { cancelBtnProgramChange, inputProgramChangeNum, nextBtnProgramChange, textareaProgramChange } from "../../../../constants/ProceduresProgramChange.constant";
import { typeflowsProcedures, typeStagesProcedures } from "../../../../constants/Procedures.constant";
import { useFormBuilder } from "../../../../hooks/useForm";
import "./ProgramChangeInformation.scss";
import { setProgramChangeData } from "../../../../actions/proceduresActions/programChangeAction";
import { getProgramChangeValidators } from "../../../../validators/procedures/programChangeValidator";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { getProgramChangeService } from "../../../../middlewares/proceduresMiddlewares/programChangeMiddleware";

const ProgramChangeInformation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { handleSteps } = useContext(ProceduresContext);

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { information: infoStore, data: dataStore } = useSelector(
   (state) => state.proceduresProgramChange
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
    dispatch(setProgramChangeData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.programChange}/${typeStagesProcedures.documents}`
    );
  };
 const {form, setForm, next, setNext, nextBtn, setNextBtn, errorForms} = useFormBuilder(
   nextBtnProgramChange,
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
      dispatch(getProgramChangeService());
    }
    setForm(getProgramChangeValidators(dataStore));
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
        <div className="programchangeprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        ""
      )}
      <div className="programchangenumber">
        <p className="programchangetitlenum">{texts.procedures.phoneText}</p>
        <div className="programchangeinput">
          <Input
            data={inputProgramChangeNum.data}
            value={valuePhone}
            hasError={errorForms[inputProgramChangeNum.data.name]}
            errorMessage={inputProgramChangeNum.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: inputProgramChangeNum.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="programchangeformitem">
        <Input
          data={textareaProgramChange.data}
          value={valueComments}
          eventKeyPress={(e) => {
            setValuesForm({
              name: textareaProgramChange.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="programchangeinfbtns">
        <div className="programchangeinfbtn">
          <Button
            data={{
              ...cancelBtnProgramChange,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              resetFlowProcedures(dispatch);
              history.push(`/procedures-main`);
            }}
          />
        </div>
        <div className="programchangeinfbtn">
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

export default ProgramChangeInformation;
