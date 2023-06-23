import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button/Button";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { Input } from "../../../../components/Input/Input";
import { Upload } from "../../../../components/Upload/Upload";
import {
  btnCancelHelpCenter,
  btnSendHelpCenter,
  flowsFormHelpCenter,
  gradesClarificationForm,
  maxFileSizeErrorOneMgb,
  maxSizeFileHelpCenter,
  selectAdesAcademicHelp,
} from "../../../../constants/FormPagesHelpCenter.constant";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import { setInfoUploadWihtoutForm } from "../../../Procedures/Utils/setInfoUpload";
import "./GradesClarificationForm.scss";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import { useFormBuilder } from "../../../../hooks/useForm";
import { getGradesClarificationService } from "../../../../middlewares/helpCenterMiddlewares/academicHelpMiddlewares/gradesClarificationMiddleware";
import { getGradesClarificationValidators } from "../../../../validators/helpCenter/academicHelpValidators/gradesClarificationValidator";
import { HelpCenterContext } from "../../HelpCenterContext";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import { formatInfoModalGradesClarificationHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setAcademicHelpReset } from "../../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { Select } from "../../../../components/Select/Select";

const GradesClarificationForm = () => {
  const { handleModalHelpCenter, handleInfoModalHelpCenter } =
    useContext(HelpCenterContext);
  const history = useHistory();

  const dispatch = useDispatch();
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
      formatInfoModalGradesClarificationHelpCenter(infoSelect, form.value),
      typesFlowsFormsHelpCenter.gradesClarificationHelp,
      infoStore.recordTypeId
    );
  };

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(btnSendHelpCenter, actionValid);

  const [valueAssignment, setValueAssignment] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueProfessor, setValueProfessor] = useState("");
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
    setValueAssignment("");
    setValueProfessor("");
    setValueDescription("");
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getGradesClarificationService());
    setForm(getGradesClarificationValidators({}));

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
      <div className="gradesformcontent">
        <p className="titlegradesform">Selecciona el asunto</p>
        <div className="checkboxgradesform">
          {checkboxes.map((checkbox, i) => {
            return (
              <div className="checkbox" key={i}>
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
        <div className="inputgradesform">
          <Input
            data={gradesClarificationForm.assignmentInput.data}
            value={valueAssignment}
            hasError={
              errorForms[gradesClarificationForm.assignmentInput.data.name]
            }
            errorMessage={gradesClarificationForm.assignmentInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: gradesClarificationForm.assignmentInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="inputgradesform">
          <Input
            data={gradesClarificationForm.professorInput.data}
            value={valueProfessor}
            hasError={
              errorForms[gradesClarificationForm.professorInput.data.name]
            }
            errorMessage={gradesClarificationForm.professorInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: gradesClarificationForm.professorInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="inputgradesform">
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
        <p className="titlegradesform">Cuéntanos el problema</p>
        <div className="commentgradesform">
          <Input
            data={gradesClarificationForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: gradesClarificationForm.descriptionInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="uploadgradesform">
          <p className="descriptionupload">
            *Máximo 2MB / Extensiones validas png, jpg, doc, docx, pdf
          </p>
          <Upload
            data={gradesClarificationForm.uploadGradesClarification}
            hasError={errorUpload.hasError}
            errorMessage={errorUpload.errorMessage}
            onFile={(e) => {
              setInfoUploadWihtoutForm(
                e.detail,
                setFile,
                setErrorUpload,
                maxSizeFileHelpCenter,
                maxFileSizeErrorOneMgb
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
        <div className="btngradesform">
          <Button
            data={btnCancelHelpCenter}
            onClick={() => {
              history.goBack();
            }}
          />
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
    );
  };

  return (
    <>
      <HeaderApp />
      <div>
        <FormHelpCenter
          formData={flowsFormHelpCenter.gradesClarificationForm}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default GradesClarificationForm;
