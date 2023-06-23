import React, { useContext, useEffect, useState } from "react";
import {
  academicActivitiesForm,
  cancelBtnAcademicActivities,
  flowsFormHelpCenter,
  maxSizeFileInAcademicActivities,
  nextBtnAcademicActivities,
  selectAdesAcademicHelp,
} from "../../../../constants/FormPagesHelpCenter.constant";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import "./AcademicActivitiesHelpForm.scss";
import { Input } from "../../../../components/Input/Input";
import { useFormBuilder } from "../../../../hooks/useForm";
import { Upload } from "../../../../components/Upload/Upload";
import { Button } from "../../../../components/Button/Button";
import { getActivitiesFormValidators } from "../../../../validators/helpCenter/academicHelpValidators/academicActivitiesValidator";
import { getAcademicActivitiesService } from "../../../../middlewares/helpCenterMiddlewares/academicHelpMiddlewares/academicActivitiesMiddleware";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { HelpCenterContext } from "../../HelpCenterContext";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import { setAcademicHelpReset } from "../../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";
import { formatInfoModalAcademicActivitiesHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { setInfoUploadWihtoutForm } from "../../../Procedures/Utils/setInfoUpload";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { Select } from "../../../../components/Select/Select";

const AcademicActivitiesHelpForm = () => {
  const { handleModalHelpCenter, handleInfoModalHelpCenter } =
    useContext(HelpCenterContext);
  const { texts } = useSelector((state) => state.texts);

  const dispatch = useDispatch();
  const history = useHistory();

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const actionValid = () => {
    setInfoModalHelpCenter(
      handleModalHelpCenter,
      handleInfoModalHelpCenter,
      form.value,
      file,
      file && file.name ? [file.name] : [],
      formatInfoModalAcademicActivitiesHelpCenter(infoSelect, form.value),
      typesFlowsFormsHelpCenter.activitiesHelp,
      infoStore.recordTypeId
    );
  };
  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnAcademicActivities, actionValid);

  const [valueAssignment, setValueAssignment] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueProfessor, setValueProfessor] = useState("");
  const [valueActivity, setValueActivity] = useState("");
  const [file, setFile] = useState({
    name: null,
    body: null,
    type: null,
  });
  const [errorUpload, setErrorUpload] = useState({
    hasError: false,
    errorMessage: "",
  });

  const { information: infoStore, optionsAds } = useSelector(
    (state) => state.helpCenterAcademic
  );

  const [checkboxes,setCheckboxes] = useSelectProcedures(infoStore.optionsCheckboxes, null);
  const [selectsAdes] = useSelectProcedures(optionsAds, null);

  const [infoSelect,setInfoSelect] = useState({
    optionsCheckboxes: [],
    optionsAdesSelect: [],
  });

  useEffect(() => {
    setInfoSelect({
      optionsCheckboxes: infoStore.optionsCheckboxes,
      optionsAdesSelect: optionsAds,
    })
  },[infoStore.optionsCheckboxes,optionsAds])
  
  useEffect(() => {
    setValueDescription("");
    setValueAssignment("");
    setValueProfessor("");
    setValueActivity("");
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAcademicActivitiesService());
    setForm(getActivitiesFormValidators({}));

    return () => {
      dispatch(setAcademicHelpReset());
    };
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

  const viewPage = () => {
    return (
      <div className="academicactivitiescontent">
        <p className="academicactivitiestitle">Selecciona el asunto</p>
        <div className="academicactivitiesitem">
          {checkboxes.map((checkbox, i) => {
            return (
              <div key={i} className="academicactivitiescheckbox">
                <Checkbox
                  data={checkbox}
                  onCheck={(e) => {
                    setCheckboxes((state) => {
                      return state.map((val) => {
                        return {
                          ...val,
                          selected: checkbox.name === val.name && e.detail,
                        };
                      });
                    });
                    setValuesForm({
                      name: "selectCheckboxes",
                      value: checkbox.name,
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="academicactivitiesitem">
          <Input
            data={academicActivitiesForm.assignmentInput.data}
            value={valueAssignment}
            hasError={
              errorForms[academicActivitiesForm.assignmentInput.data.name]
            }
            errorMessage={academicActivitiesForm.assignmentInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicActivitiesForm.assignmentInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <Input
            data={academicActivitiesForm.professorInput.data}
            value={valueProfessor}
            hasError={
              errorForms[academicActivitiesForm.professorInput.data.name]
            }
            errorMessage={academicActivitiesForm.professorInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicActivitiesForm.professorInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <Select
            data={selectAdesAcademicHelp}
            options={selectsAdes}
            onClick={(e) => {
              setValuesForm({
                name: selectAdesAcademicHelp.name,
                value: e.detail,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <Input
            data={academicActivitiesForm.activitysInput.data}
            value={valueActivity}
            hasError={
              errorForms[academicActivitiesForm.activitysInput.data.name]
            }
            errorMessage={academicActivitiesForm.activitysInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicActivitiesForm.activitysInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <p className="academicdescriptiontitle">Cuentanos el problema</p>
          <Input
            data={academicActivitiesForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicActivitiesForm.descriptionInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <p className="academicactivitiesinfouploadtitle">
            *Máximo 2MB / Extensiones validas png, jpg, doc, docx, pdf
          </p>
          <Upload
            data={academicActivitiesForm.uploadAcademicActivities}
            hasError={errorUpload.hasError}
            errorMessage={errorUpload.errorMessage}
            onFile={(e) => {
              setInfoUploadWihtoutForm(
                e.detail,
                setFile,
                setErrorUpload,
                maxSizeFileInAcademicActivities,
                texts
              );
            }}
            onRemove={() => {
              setFile({
                name: null,
                body: null,
                type: null,
              });
            }}
          />
        </div>
        <div className="academicactivitiesbtns">
          <div className="academicbtn">
            <Button
              data={cancelBtnAcademicActivities}
              onClick={() => {
                history.goBack();
              }}
            />
          </div>
          <div className="academicbtn">
            <Button
              data={nextBtn}
              onClick={() => {
                setNext({
                  valid: true,
                  value: form.value
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <HeaderApp />
      <div>
        <FormHelpCenter
          formData={flowsFormHelpCenter.academicActivitiesHelpForm}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default AcademicActivitiesHelpForm;
