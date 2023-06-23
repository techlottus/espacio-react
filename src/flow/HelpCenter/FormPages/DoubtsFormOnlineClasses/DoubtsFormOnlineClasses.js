import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button/Button";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { Input } from "../../../../components/Input/Input";
import { Upload } from "../../../../components/Upload/Upload";
import {
  btnCancelHelpCenter,
  btnSendHelpCenter,
  doubtsOnlineClassesForm,
  flowsFormHelpCenter,
  maxSizeFileHelpCenter,
  selectAdesAcademicHelp,
} from "../../../../constants/FormPagesHelpCenter.constant";
import { useFormBuilder } from "../../../../hooks/useForm";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import { getDoubtsOnlineClassesService } from "../../../../middlewares/helpCenterMiddlewares/academicHelpMiddlewares/doubtsOnlineClassesMiddleware";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import { getDoubtsOnlineClassesValidators } from "../../../../validators/helpCenter/academicHelpValidators/doubtsOnlineClassesValidator";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import { setInfoUploadWihtoutForm } from "../../../Procedures/Utils/setInfoUpload";
import "./DoubtsFormOnlineClasses.scss";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { HelpCenterContext } from "../../HelpCenterContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setAcademicHelpReset } from "../../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";
import { formatInfoModalDoubtsOnlinceClassesHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { Select } from "../../../../components/Select/Select";

const DoubtsFormOnlineClasses = ({}) => {
  const { handleModalHelpCenter, handleInfoModalHelpCenter } = useContext(HelpCenterContext);
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
      file && file.name ? [file.name]: [],
      formatInfoModalDoubtsOnlinceClassesHelpCenter(infoSelect, form.value),
      typesFlowsFormsHelpCenter.doubtsClassesOnlineHelp,
      infoStore.recordTypeId
    )
  };

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(btnSendHelpCenter, actionValid);

  const [valueAssignment, setValueAssignment] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueProfessor, setValueProfessor] = useState("");
  const [valueClassDate, setValueClassDate] = useState("");
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

  const [checkboxes,setCheckboxes] = useSelectProcedures(
    infoStore.optionsCheckboxes,
    null
  );

  const [selectAds] = useSelectProcedures(
    optionsAds,
    null
  );

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
    setValueDescription( "");
    setValueAssignment( "");
    setValueProfessor( "");
    setValueClassDate( "");
  }, [ infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    dispatch(getDoubtsOnlineClassesService());
    setForm(getDoubtsOnlineClassesValidators({}));

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
      <div className="doubtsformcontent">
        <p className="titledoubtsform">Selecciona el asunto</p>
        <div className="checkboxdoubtsform">
          {checkboxes.map((checkbox, i) => {
              return (
                <div className="checkbox" key={i}>
                  <Checkbox
                    data={checkbox}
                    onCheck={(e) => {
                      setCheckboxes((state) => { 
                        return state.map((val) => {
                          return {...val, selected: checkbox.name === val.name && e.detail }
                        })
                      });
                      setValuesForm({
                        name: 'selectCheckboxes',
                        value: checkbox.name,
                      });
                    }}
                  />
                </div>
              );
            }
          )}
        </div>
        <div className="inputdoubtsform">
          <Input
            data={doubtsOnlineClassesForm.assignmentInput.data}
            value={valueAssignment}
            hasError={
              errorForms[doubtsOnlineClassesForm.assignmentInput.data.name]
            }
            errorMessage={doubtsOnlineClassesForm.assignmentInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: doubtsOnlineClassesForm.assignmentInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="inputdoubtsform">
          <Input
            data={doubtsOnlineClassesForm.professorInput.data}
            value={valueProfessor}
            hasError={
              errorForms[doubtsOnlineClassesForm.professorInput.data.name]
            }
            errorMessage={doubtsOnlineClassesForm.professorInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: doubtsOnlineClassesForm.professorInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="inputdoubtsform">
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
        <div className="inputdoubtsform">
          <Input
            data={doubtsOnlineClassesForm.classDateInput.data}
            value={valueClassDate}
            hasError={
              errorForms[doubtsOnlineClassesForm.classDateInput.data.name]
            }
            errorMessage={doubtsOnlineClassesForm.classDateInput.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: doubtsOnlineClassesForm.classDateInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <p className="titledoubtsform">Cuéntanos el problema</p>
        <div className="commentdoubtsform">
          <Input
            data={doubtsOnlineClassesForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: doubtsOnlineClassesForm.descriptionInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="uploaddoubtsform">
        <p className="descriptionupload">
          *Máximo 2MB / Extensiones validas png, jpg, doc, docx, pdf
        </p>
          <Upload 
          data={doubtsOnlineClassesForm.uploadDoubtsOnlineClasses }
          hasError={errorUpload.hasError}
          errorMessage={errorUpload.errorMessage}
          onFile={(e) => {
            setInfoUploadWihtoutForm(
              e.detail,
              setFile,
              setErrorUpload,
              maxSizeFileHelpCenter,
              texts
            );
          }}
          onRemove={() => {
            setFile({
              name: null,
              body: null,
              type: null,
            })
          }}
           />
        </div>
        <div className="btndoubtsform">
          <Button 
          data={btnCancelHelpCenter} 
          onClick={() => {
            history.goBack()
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
          formData={flowsFormHelpCenter.doubtsFormOnlineClasses}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default DoubtsFormOnlineClasses;
