import React, { useContext,useEffect,useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import {
  cardProfileProcedures,
  typeflowsProcedures,
  typesDelivaryProcedures,
  typeStagesProcedures,
} from "../../../../constants/Procedures.constant";
import { Select } from "../../../../components/Select/Select";
import { Input } from "../../../../components/Input/Input";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import {
  cancelBtnStudyRecord,
  checkboxStudyRecord,
  feedbackNoticeStudyRecord,
  inputNumberStudyRecord,
  nextBtnStudyRecord,
  selectCampusDeliveryStudyRecord,
  selectTypeDeliveryStudyRecord,
  selectTypeRecordStudyRecord,
  textareaStudyRecord,
} from "../../../../constants/ProcedureStudyRecord.constant";
import "./StudyRecordInformation.scss";
import { Button } from "../../../../components/Button/Button";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { ProceduresContext } from "../../ProceduresContext";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudyRecordService } from "../../../../middlewares/proceduresMiddlewares/studyRecordMiddlewares";
import { getValuesOfAuth } from "../../../../helpers/auth";
import {setStudyRecordData, setStudyRecordExtra,} from "../../../../actions/proceduresActions/studyRecordAction";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import { ModalConstants } from "../../../../components/Modal/ModalConstants/ModalConstants";
import { useFormBuilder } from "../../../../hooks/useForm";
import { getStudyRecordDefaultValidators } from "../../../../validators/procedures/studyRecordValidator";
import { resetFlowProcedures } from "../../../../helpers/proceduresActions";
import { typesModality } from "../../../../types/typesProcedures";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import {
  cancelStepOneStudyRecordTag,
  checkboxSendSedenaStudyRecordTag,
  modalRecordTypeStudyRecordTag,
  nextStepOneStudyRecordTag,
} from "../../../../tagging/flows/procedures/studyRecordTag";
import { getImageOfAssets } from "../../../../helpers/getImages";

const StudyRecordInformation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { handleSteps } = useContext(ProceduresContext);
  const { texts } = useSelector((state) => state.texts);
  const actionValid = () => {
    dispatch(setStudyRecordData(next.value));
    history.push(
      `/procedures-flows/${typeflowsProcedures.studyRecord}/${typeStagesProcedures.documents}`
    );
  };
  const {form, setForm, next, setNext, nextBtn, setNextBtn, errorForms} =
    useFormBuilder(nextBtnStudyRecord, actionValid);

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { information: infoStore, data: dataStore } = useSelector(
    (state) => state.procedureStudyRecord
  );

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const [profile, setProfile] = useState({
    ...cardProfileProcedures,
    image: getImageOfAssets(texts?.accountStatus?.images?.user),
  });

  const [optionsTypeDelivery] = useSelectProcedures(
    infoStore.optionsTypeDelivery,
    dataStore.selectTypeDelivery
  );

  const [optionsTypeRecord] = useSelectProcedures(
    infoStore.optionsTypeRecord,
    dataStore.selectTypeRecord
  );

  const [optionsCampusDelivery, setOptionsCampusDelivery] = useSelectProcedures(
    infoStore.optionsCampusDelivery,
    dataStore.selectCampusDelivery
  );

  const [isCheck, setIsCheck] = useState({
    ...checkboxStudyRecord,
  });

  const [valuePhone, setValuePhone] = useState("");

  const [valueComments, setValueComments] = useState("");

  const [isModalConstant, setIsModalConstant] = useState(false);

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

    setIsCheck((state) => {
      return {
        ...state,
        selected: dataStore.isCheck,
      };
    });

    setValuePhone(dataStore.phone || getValuesOfAuth().phone);
    setValueComments(dataStore.comments || "");
  }, [infoStore, dataStore, profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSteps(0);
    if (
      dataStore.phone &&
      dataStore.selectTypeRecord &&
      dataStore.selectTypeDelivery &&
      ((dataStore.selectTypeDelivery === typesDelivaryProcedures.fisico &&
        dataStore.selectCampusDelivery) ||
        dataStore.selectTypeDelivery === typesDelivaryProcedures.digital)
    ) {
      setNextBtn(false);
    } else {
      dispatch(getStudyRecordService(history));
    }

    setForm(
      getStudyRecordDefaultValidators(dataStore, getValuesOfAuth().modality)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (valuesForm.name === selectTypeRecordStudyRecord.name) {
      const { cost, detailId } = infoStore.optionsTypeRecord ? infoStore.optionsTypeRecord.filter(
            (item) => item.value === valuesForm.value 
        )[0] : {};

      dispatch(setStudyRecordExtra({ cost, detailId }));
    }
    if (valuesForm.name && valuesForm.value) {
      form.get(valuesForm.name).setValue(valuesForm.value);
      if (valuesForm.name === selectTypeDeliveryStudyRecord.name) {
        if (valuesForm.value === typesDelivaryProcedures.digital) {
          setOptionsCampusDelivery(infoStore.optionsCampusDelivery, null);
        }
        setForm(
          getStudyRecordDefaultValidators(
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
      <div className="studyrecordformselect">
        <Select
          data={selectCampusDeliveryStudyRecord}
          options={optionsCampusDelivery}
          onClick={(e) => {
            setValuesForm({
              name: selectCampusDeliveryStudyRecord.name,
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
      {profileProcedure ? (
        <div className="studyrecordinfoprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        ""
      )}
      <div className="studyrecordinfonumber">
        <p className="studyrecordinfonumbertitle">
          {texts?.procedures.phoneText}
        </p>
        <div className="studyrecordinfoinput">
          <Input
            data={inputNumberStudyRecord.data}
            value={valuePhone}
            hasError={errorForms[inputNumberStudyRecord.data.name]}
            errorMessage={inputNumberStudyRecord.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: inputNumberStudyRecord.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="studyrecordnotice">
        <Feedback
          data={feedbackNoticeStudyRecord}
          html={() => {
            return (
              <div>
                Conoce los
                <span
                  className="studyrecordnoticelink"
                  onClick={() => {
                    setIsModalConstant(true);
                    sendInfoTM(
                      window,
                      modalRecordTypeStudyRecordTag,
                      "modal_t"
                    );
                  }}
                >
                  tipos de constancias
                </span>
                según tus necesidades
              </div>
            );
          }} 
        />
      </div>
      <div className="studyrecordform">
        <div className="studyrecordformselect">
          <Select
            data={selectTypeRecordStudyRecord}
            options={optionsTypeRecord}
            onClick={(e) => {
              setValuesForm({
                name: selectTypeRecordStudyRecord.name,
                value: e.detail,
              });
            }}
          />
        </div>
        {isShowDelivery ? (
          <>
            <div className="studyrecordformselect">
              <Select
                data={selectTypeDeliveryStudyRecord}
                options={optionsTypeDelivery}
                onClick={(e) => {
                  if (e.detail === typesDelivaryProcedures.fisico) {
                    setIsShowCampus(true);
                  } else {
                    setIsShowCampus(false);
                  }

                  setValuesForm({
                    name: selectTypeDeliveryStudyRecord.name,
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

        <div className="studyrecordformcheck">
          <Checkbox
            data={isCheck}
            onCheck={(e) => {
              setValuesForm({
                name: isCheck.name,
                value: e.detail,
              });
              sendInfoTM(window, checkboxSendSedenaStudyRecordTag, "sedena");
            }}
          />
        </div>
        <div className="studyrecordformitem">
          <Input
            data={textareaStudyRecord.data}
            value={valueComments}
            hasError={textareaStudyRecord.hasError}
            errorMessage={textareaStudyRecord.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: textareaStudyRecord.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="studyrecordbtns">
        <div className="studyrecordbtn">
          <Button
            data={{
              ...cancelBtnStudyRecord,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              resetFlowProcedures(dispatch);
              history.push(`/procedures-main`);
              sendInfoTM(window, cancelStepOneStudyRecordTag, "cancel");
            }}
          />
        </div>
        <div className="studyrecordbtn">
          <Button
            data={nextBtn}
            onClick={() => {
              setNext(true);
              sendInfoTM(window, nextStepOneStudyRecordTag, "next");
            }}
          />
        </div>
      </div>
      <ModalConstants
        isShow={isModalConstant}
        onClose={() => setIsModalConstant(false)}
        outside={() => setIsModalConstant(false)}
      />
    </>
  );
};

export default StudyRecordInformation;
