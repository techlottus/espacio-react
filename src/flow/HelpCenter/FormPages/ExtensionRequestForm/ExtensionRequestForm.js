import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button/Button";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { Input } from "../../../../components/Input/Input";
import { Upload } from "../../../../components/Upload/Upload";
import {
  btnCancelHelpCenter,
  btnSendHelpCenter,
  extensionRequestForm,
  flowsFormHelpCenter,
  maxFileSizeErrorOneMgb,
  maxSizeFileHelpCenter,
  selectAdesAcademicHelp,
} from "../../../../constants/FormPagesHelpCenter.constant";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import { setInfoUploadWihtoutForm } from "../../../Procedures/Utils/setInfoUpload";
import "./ExtensionRequestForm.scss";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import { useFormBuilder } from "../../../../hooks/useForm";
import { getExtensionRequestService } from "../../../../middlewares/helpCenterMiddlewares/academicHelpMiddlewares/extensionRequestMiddleware";
import { getExtensionRequestValidators } from "../../../../validators/helpCenter/academicHelpValidators/extensionRequestValidator";
import { HelpCenterContext } from "../../HelpCenterContext";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import { formatInfoModalExtensionRequestHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setAcademicHelpReset } from "../../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";
import { Select } from "../../../../components/Select/Select";

const ExtensionRequestForm = () => {
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
      formatInfoModalExtensionRequestHelpCenter(infoSelect, form.value),
      typesFlowsFormsHelpCenter.extensionRequestHelp,
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
    setValueDescription("");
    setValueAssignment("");
    setValueProfessor("");
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getExtensionRequestService());
    setForm(getExtensionRequestValidators({}));

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
      <div className="extensionformcontent">
        <p className="titleextensionform">Selecciona el asunto</p>
        <div className="checkboxextensionform">
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
        <div className="inputextensionform">
          <Input
            data={extensionRequestForm.assignmentInput.data}
            value={valueAssignment}
            hasError={
              errorForms[extensionRequestForm.assignmentInput.data.name]
            }
            errorMessage={extensionRequestForm.assignmentInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: extensionRequestForm.assignmentInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="inputextensionform">
          <Input
            data={extensionRequestForm.professorInput.data}
            value={valueProfessor}
            hasError={errorForms[extensionRequestForm.professorInput.data.name]}
            errorMessage={extensionRequestForm.professorInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: extensionRequestForm.professorInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="inputextensionform">
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
        <p className="titleextensionform">Cuéntanos el problema</p>
        <div className="commentextensionform">
          <Input
            data={extensionRequestForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: extensionRequestForm.descriptionInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="uploadextensionform">
          <p className="descriptionupload">
            *Máximo 2MB / Extensiones validas png, jpg, doc, docx, pdf
          </p>
          <Upload
            data={extensionRequestForm.uploadExtensionRequest}
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
        <div className="btnextensionform">
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
          formData={flowsFormHelpCenter.extensionRequestForm}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default ExtensionRequestForm;
