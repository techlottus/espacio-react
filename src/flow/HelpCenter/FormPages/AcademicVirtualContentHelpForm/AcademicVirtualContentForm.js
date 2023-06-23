import React, { useContext, useEffect, useState } from "react";
import {
  academicVirtualContentForm,
  cancelBtnAcademicActivities,
  flowsFormHelpCenter,
  maxSizeFileInVirtualContent,
  nextBtnAcademicActivities,
  selectAdesAcademicHelp,
} from "../../../../constants/FormPagesHelpCenter.constant";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import "./AcademicVirtualContentForm.scss";
import { Input } from "../../../../components/Input/Input";
import { useFormBuilder } from "../../../../hooks/useForm";
import { Upload } from "../../../../components/Upload/Upload";
import { setInfoUploadWihtoutForm } from "../../../Procedures/Utils/setInfoUpload";
import { Button } from "../../../../components/Button/Button";
import { getVirtualContentService } from "../../../../middlewares/helpCenterMiddlewares/academicHelpMiddlewares/academicVirtualContentMiddleware";
import { getVirtualContentFormValidators } from "../../../../validators/helpCenter/academicHelpValidators/virtualContentValidator";
import { HelpCenterContext } from "../../HelpCenterContext";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import { formatInfoModalVirtualContentHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { setAcademicHelpReset } from "../../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";
import { useHistory } from "react-router-dom";
import { Select } from "../../../../components/Select/Select";
const AcademicVirtualContentForm = () => {
  const { handleModalHelpCenter, handleInfoModalHelpCenter } =
    useContext(HelpCenterContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });
  const { texts } = useSelector((state) => state.texts);

  const actionValid = () => {
    setInfoModalHelpCenter(
      handleModalHelpCenter,
      handleInfoModalHelpCenter,
      form.value,
      file,
      file && file.name ? [file.name] : [],
      formatInfoModalVirtualContentHelpCenter(infoSelect, form.value),
      typesFlowsFormsHelpCenter.virtualContentHelp,
      infoStore.recordTypeId
    );
  };
  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnAcademicActivities, actionValid);

  const [valueAssignment, setValueAssignment] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueReportedAssignment, setValueReportedAssignment] = useState("");
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
  const [selectAds] = useSelectProcedures(optionsAds, null);

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
    setValueReportedAssignment("");
    setValueActivity("");
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getVirtualContentService());
    setForm(getVirtualContentFormValidators({}));

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
          <Select
            data={selectAdesAcademicHelp}
            options={selectAds}
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
            data={academicVirtualContentForm.assignmentInput.data}
            value={valueAssignment}
            hasError={
              errorForms[academicVirtualContentForm.assignmentInput.data.name]
            }
            errorMessage={
              academicVirtualContentForm.assignmentInput.errorMessage
            }
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicVirtualContentForm.assignmentInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <Input
            data={academicVirtualContentForm.activitysInput.data}
            value={valueActivity}
            hasError={
              errorForms[academicVirtualContentForm.activitysInput.data.name]
            }
            errorMessage={
              academicVirtualContentForm.activitysInput.errorMessage
            }
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicVirtualContentForm.activitysInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <Input
            data={academicVirtualContentForm.reportedAssignmentInput.data}
            value={valueReportedAssignment}
            hasError={
              errorForms[
                academicVirtualContentForm.reportedAssignmentInput.data.name
              ]
            }
            errorMessage={
              academicVirtualContentForm.reportedAssignmentInput.errorMessage
            }
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicVirtualContentForm.reportedAssignmentInput.data
                  .name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <p className="academicdescriptiontitle">Cuentanos el problema</p>
          <Input
            data={academicVirtualContentForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicVirtualContentForm.descriptionInput.data.name,
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
            data={academicVirtualContentForm.uploadAcademicActivities}
            hasError={errorUpload.hasError}
            errorMessage={errorUpload.errorMessage}
            onFile={(e) => {
              setInfoUploadWihtoutForm(
                e.detail,
                setFile,
                setErrorUpload,
                maxSizeFileInVirtualContent,
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
          formData={flowsFormHelpCenter.academicVirtualContentForm}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default AcademicVirtualContentForm;
