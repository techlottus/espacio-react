import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { Input } from "../../../../components/Input/Input";
import {
  cancelBtnAcademicHistory,
  inputPhoneAcademicHistory,
  nextBtnAcademicHistory,
  selectDeliveryCampusAcademicHistory,
  selectTypeDeliveryAcademicHistory,
  textareaAcademicHistory,
} from "../../../../constants/ProceduresAcademicHistory.constant";
import { Select } from "../../../../components/Select/Select";
import { Button } from "../../../../components/Button/Button";
import { ProceduresContext } from "../../ProceduresContext";
import { getAcademicHistoryService } from "../../../../middlewares/proceduresMiddlewares/academicHistoryMiddleware";
import { useHistory } from "react-router";
import {
  typeflowsProcedures,
  typeStagesProcedures,
  typesDelivaryProcedures,
  cardProfileProcedures,
} from "../../../../constants/Procedures.constant";
import { getValuesOfAuth } from "../../../../helpers/auth";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import { setAcademicHistoryData } from "../../../../actions/proceduresActions/academicHistoryAction";
import { useFormBuilder } from "../../../../hooks/useForm";

import "./AcademicHistoryInformation.scss";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { getAcademicHistoryValidators } from "../../../../validators/procedures/academicHistoryValidator";
import { typesModality } from "../../../../types/typesProcedures";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { cancelStepOneAcademicHistoryTag, nextStepOneAcademicHistoryTag } from "../../../../tagging/flows/procedures/academicHistoryTag";
import { getImageOfAssets } from "../../../../helpers/getImages";

const AcademicHistoryInformation = () => {
  const { handleSteps } = useContext(ProceduresContext);
  const { texts } = useSelector((state) => state.texts);

  const history = useHistory();
  const dispatch = useDispatch();

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.proceduresAcademicHistory
  );

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const [profile, setProfile] = useState({ 
    ...cardProfileProcedures, 
    image: getImageOfAssets(texts?.accountStatus?.images?.user)
  });

  const [optionsCampusDelivery,setOptionsCampusDelivery] = useSelectProcedures(
    infoStore.optionsCampusDelivery,
    dataStore.selectCampusDelivery
  );
  const [optionsTypeDelivery] = useSelectProcedures(
    infoStore.optionsTypeDelivery,
    dataStore.selectTypeDelivery
  );

  const [valuePhone, setValuePhone] = useState("");

  const [valueComments, setValueComments] = useState("");

  const actionValid = () => {
    dispatch(setAcademicHistoryData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.academyHistory}/${typeStagesProcedures.documents}`
    );
  };

  const {form, setForm, next, setNext, nextBtn, setNextBtn,errorForms} = useFormBuilder(
    nextBtnAcademicHistory,
    actionValid
  );

  const [isShowCampus, setIsShowCampus] = useState(
    dataStore.selectTypeDelivery === typesDelivaryProcedures.fisico
  );

  const [isShowDelivery] = useState(
    getValuesOfAuth().modality === typesModality.withDelivery
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

    if (
      dataStore.phone &&
      dataStore.selectTypeDelivery &&
      ((dataStore.selectTypeDelivery === typesDelivaryProcedures.fisico &&
        dataStore.selectCampusDelivery) ||
        dataStore.selectTypeDelivery === typesDelivaryProcedures.digital)
    ) {
      setNextBtn(false);
    } else {
      dispatch(getAcademicHistoryService(history));
    }
    setForm(
      getAcademicHistoryValidators(dataStore, getValuesOfAuth().modality)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (valuesForm.name && valuesForm.value) {
      form.get(valuesForm.name).setValue(valuesForm.value);
      if (valuesForm.name === selectTypeDeliveryAcademicHistory.name) {
        if (valuesForm.value === typesDelivaryProcedures.digital) {
          setOptionsCampusDelivery(infoStore.optionsCampusDelivery, null);
        }
        setForm(
          getAcademicHistoryValidators(
            form.value,
            getValuesOfAuth().modality,
            valuesForm.value
          )
        );
      }
      setValuesForm({
        name: null,
        value: null,
      });
    }
  }, [valuesForm, form]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIsShowCampus = () => {
    return isShowCampus ? (
      <div className="academichistoryitem">
        <Select
          data={selectDeliveryCampusAcademicHistory}
          options={optionsCampusDelivery}
          onClick={(e) => {
            setValuesForm({
              name: selectDeliveryCampusAcademicHistory.name,
              value: e.detail,
            });
          }}
        />
      </div>
    ) : (
      <></>
    )
  }

  return (
    <>
      <div className="academicinfocontainer">
        {profileProcedure ? (
          <div className="academichistoryprofile">
            <CardProfile data={profile} />
          </div>
        ) : (
          ""
        )}
        <div className="forminformationacademichistory">
          <div className="academichistoryinfonumber">
            <p className="academichistoryinfonumbertitle">
              {texts?.procedures?.phoneText}
            </p>
            <div className="academichistoryitem">
              <Input
                data={inputPhoneAcademicHistory.data}
                value={valuePhone}
                hasError={errorForms[inputPhoneAcademicHistory.data.name]}
                errorMessage={inputPhoneAcademicHistory.errorMessage}
                eventKeyPress={(e) => {
                  setValuesForm({
                    name: inputPhoneAcademicHistory.data.name,
                    value: e.detail.value,
                  });
                }}
              />
            </div>
            {isShowDelivery ? (
              <>
                <div className="academichistoryitem">
                  <Select
                    data={selectTypeDeliveryAcademicHistory.data}
                    options={optionsTypeDelivery}
                    onClick={(e) => {
                      if (e.detail === typesDelivaryProcedures.fisico) {
                        setIsShowCampus(true);
                      } else {
                        setIsShowCampus(false);
                      }

                      setValuesForm({
                        name: selectTypeDeliveryAcademicHistory.name,
                        value: e.detail,
                      });
                    }}
                  />
                </div>
                {handleIsShowCampus()}
              </>
            ) : (
              ""
            )}
            <div className="academichistoryitem">
              <Input
                data={textareaAcademicHistory.data}
                value={valueComments}
                eventKeyPress={(e) => {
                  setValuesForm({
                    name: textareaAcademicHistory.data.name,
                    value: e.detail.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="academichistorybtns">
          <div className="academicbtn">
            <Button
              data={{
                ...cancelBtnAcademicHistory,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                resetFlowProcedures(dispatch);
                history.push(`/procedures-main`);
                sendInfoTM(window, cancelStepOneAcademicHistoryTag)
              }}
            />
          </div>
          <div className="academicbtn">
            <Button
              data={nextBtn}
              onClick={() => {
                sendInfoTM(window, nextStepOneAcademicHistoryTag) 
                setNext(true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicHistoryInformation;
