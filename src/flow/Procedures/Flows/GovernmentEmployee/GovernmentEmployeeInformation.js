import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setSocialServiceInformation } from '../../../../actions/proceduresActions/socialServiceAction';
import { Button } from '../../../../components/Button/Button';
import { CardProfile } from '../../../../components/Card/CardProfile';
import { Input } from '../../../../components/Input/Input';
import { cardProfile } from '../../../../constants/AccountStatus.constant';
import { typeflowsProcedures, typeStagesProcedures } from '../../../../constants/Procedures.constant';
import { cancelBtnGovernmentEmployee, inputGovernmentEmployeeNum, nextBtnGovernmentEmployee } from '../../../../constants/proceduresGovernmentEmployee.constant';
import { getValuesOfAuth } from '../../../../helpers/auth';
import { getImageOfAssets } from '../../../../helpers/getImages';
import { useFormBuilder } from '../../../../hooks/useForm';
import { getGovernmentEmployeeValidators } from '../../../../validators/procedures/socialService/governmentEmployeeValidator';
import { ProceduresContext } from '../../ProceduresContext';
import './GovernmentEmployeeInformation.scss'

const GovernmentEmployeeInformation = () => {
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

  const actionValid = () => {
    dispatch(
      setSocialServiceInformation({
        ...next.value,
      })
    );
    history.push(
      `/procedures-flows/${typeflowsProcedures.governmentEmployee}/${typeStagesProcedures.documents}`
    );
  };

  const {form, setForm, next, setNext, nextBtn, setNextBtn,errorForms} = useFormBuilder(
    nextBtnGovernmentEmployee,
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
  }, [dataStore, infoStore, profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSteps(0);
    if (dataStore.phone) {
      setNextBtn(false);
    } else {
      //dispatch(getReinstatementService());
    }
    setForm(getGovernmentEmployeeValidators(dataStore, getValuesOfAuth()));
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
        <div className="governmentemployeeinfoprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        ""
      )}
      <div className="governmentemployeeinfonumber">
        <p className="governmentemployeeinfotitle">{texts.procedures.phoneText}</p>
        <div className="governmentemployeeinfoinput">
          <Input
            data={inputGovernmentEmployeeNum.data}
            value={valuePhone}
            hasError={errorForms[inputGovernmentEmployeeNum.data.name]}
            errorMessage={inputGovernmentEmployeeNum.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: inputGovernmentEmployeeNum.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="governmentemployeeinfoinfbtns">
        <div className="governmentemployeeinfoinfbtn">
          <Button
            data={{
              ...cancelBtnGovernmentEmployee,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              //resetFlowProcedures(dispatch);
              history.push(`/procedures-main`);
            }}
          />
        </div>
        <div className="governmentemployeeinfoinfbtn">
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
}

export default GovernmentEmployeeInformation