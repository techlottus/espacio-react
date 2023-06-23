import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setAcademicHelpReset } from "../../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";
import { Button } from "../../../../components/Button/Button";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { Input } from "../../../../components/Input/Input";
import { Upload } from "../../../../components/Upload/Upload";
import {
  academicRegistrationSubjectsForm,
  cancelBtnAcademicActivities,
  flowsFormHelpCenter,
  maxSizeFileInAcademicActivities,
  nextBtnAcademicActivities,
  selectAdesAcademicHelp,
} from "../../../../constants/FormPagesHelpCenter.constant";
import { useFormBuilder } from "../../../../hooks/useForm";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import { getAcademicRegistrationSubjectsService } from "../../../../middlewares/helpCenterMiddlewares/academicHelpMiddlewares/academicRegistrationSubjectsMiddleware";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import {
  typesFlowsFormsHelpCenter,
  typesFormHelpCenterAcademicRegistrationSubjects,
} from "../../../../types/typesHelpCenter";
import { getAcademicRegistrationSubjectsValidators } from "../../../../validators/helpCenter/academicHelpValidators/academicRegistrationSubjectsValidator";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { setInfoUploadWihtoutForm } from "../../../Procedures/Utils/setInfoUpload";
import { HelpCenterContext } from "../../HelpCenterContext";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import "./AcademicRegistrationSubjectsForm.scss";
import { formatInfoModalRegistrationSubjectsHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { Select } from "../../../../components/Select/Select";

const nameCheckbox = "selectCheckboxes";

const AcademicRegistrationSubjectsForm = () => {
  const { handleModalHelpCenter, handleInfoModalHelpCenter } =
    useContext(HelpCenterContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });
  const { texts } = useSelector((state) => state.texts);

  const [selectCheckbox, setSelectCheckbox] = useState(
    typesFormHelpCenterAcademicRegistrationSubjects.notSubjectsLoad
  );

  const actionValid = () => {
    setInfoModalHelpCenter(
      handleModalHelpCenter,
      handleInfoModalHelpCenter,
      form.value,
      file,
      file && file.name ? [file.name] : [],
      formatInfoModalRegistrationSubjectsHelpCenter(infoSelect, form.value),
      typesFlowsFormsHelpCenter.registrationsubjects,
      infoStore.recordTypeId
    );
  };
  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnAcademicActivities, actionValid);

  const [valuePaymentDate, setValuePaymentDate] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valuePaymentMount, setValuePaymentMount] = useState("");
  const [valuePaymentMethod, setValuePaymentMethod] = useState("");
  const [itemsCheckboxes, setItemsCheckboxes] = useState([]);
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

  useEffect(() => {
    setItemsCheckboxes(checkboxes);
  }, [checkboxes]);

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
    const select = checkboxes.find((item) => item.selected);
    if (select) {
      setForm(
        getAcademicRegistrationSubjectsValidators(select.name, form.value)
      );
    }
  }, [checkboxes]);

  useEffect(() => {
    setValueDescription("");
    setValuePaymentDate("");
    setValuePaymentMethod("");
    setValuePaymentMount("");
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getAcademicRegistrationSubjectsService());
    setForm(getAcademicRegistrationSubjectsValidators(selectCheckbox, {}));

    return () => {
      dispatch(setAcademicHelpReset());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (valuesForm.name) {
      if (valuesForm.name === nameCheckbox) {
        setSelectCheckbox(valuesForm.value);
      } else {
        form.get(valuesForm.name).setValue(valuesForm.value);
      }

      setValuesForm({
        name: null,
        value: null,
      });
    } else {
      if (selectCheckbox && nameCheckbox in form.value) {
        form.get(nameCheckbox).setValue(selectCheckbox);
      }
    }
  }, [valuesForm, form]); // eslint-disable-line react-hooks/exhaustive-deps


  const viewPage = () => {
    return (
      <>
        <div className="academicregistrationsubjectscontent">
          <div className="academicregistrationsubjectstitle">
            Selecciona el asunto
          </div>
          <div className="academicregistrationsubjectsitem">
            {checkboxes.map((checkbox, i) => {
              return (
                <div key={i} className="academicregistrationsubjectscheckbox">
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
                        name: nameCheckbox,
                        value: checkbox.name,
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
          {selectCheckbox ===
          typesFormHelpCenterAcademicRegistrationSubjects.notSubjectsLoad ? (
            <>
              <div className="academicregistrationsubjectsitem">
                <Input
                  data={academicRegistrationSubjectsForm.paymentDate.data}
                  value={valuePaymentDate}
                  hasError={
                    errorForms[
                      academicRegistrationSubjectsForm.paymentDate.data.name
                    ]
                  }
                  errorMessage={
                    academicRegistrationSubjectsForm.paymentDate.errorMessage
                  }
                  eventKeyPress={(e) => {
                    setValuesForm({
                      name: academicRegistrationSubjectsForm.paymentDate.data
                        .name,
                      value: e.detail.value,
                    });
                  }}
                />
              </div>
              <div className="academicregistrationsubjectsitem">
                <Input
                  data={academicRegistrationSubjectsForm.paymentMount.data}
                  value={valuePaymentMount}
                  hasError={
                    errorForms[
                      academicRegistrationSubjectsForm.paymentMount.data.name
                    ]
                  }
                  errorMessage={
                    academicRegistrationSubjectsForm.paymentMount.errorMessage
                  }
                  eventKeyPress={(e) => {
                    setValuesForm({
                      name: academicRegistrationSubjectsForm.paymentMount.data
                        .name,
                      value: e.detail.value,
                    });
                  }}
                />
              </div>
              <div className="academicregistrationsubjectsitem">
                <Input
                  data={academicRegistrationSubjectsForm.paymentMethod.data}
                  value={valuePaymentMethod}
                  hasError={
                    errorForms[
                      academicRegistrationSubjectsForm.paymentMethod.data.name
                    ]
                  }
                  errorMessage={
                    academicRegistrationSubjectsForm.paymentMethod.errorMessage
                  }
                  eventKeyPress={(e) => {
                    setValuesForm({
                      name: academicRegistrationSubjectsForm.paymentMethod.data
                        .name,
                      value: e.detail.value,
                    });
                  }}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <div className="academicregistrationsubjectsitem">
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
          <div className="academicregistrationsubjectsitem">
            <p className="academicregistrationsubjectsitemtitle">
              Cuentanos el problema
            </p>
            <Input
              data={academicRegistrationSubjectsForm.caseDescription.data}
              value={valueDescription}
              hasError={
                errorForms[
                  academicRegistrationSubjectsForm.caseDescription.data.name
                ]
              }
              errorMessage={
                academicRegistrationSubjectsForm.caseDescription.errorMessage
              }
              eventKeyPress={(e) => {
                setValuesForm({
                  name: academicRegistrationSubjectsForm.caseDescription.data
                    .name,
                  value: e.detail.value,
                });
              }}
            />
          </div>
          <div className="academicregistrationsubjectsitem">
            <p className="academicregistrationsubjectsuploadtitle">
              *Máximo 2MB / Extensiones validas png, jpg, doc, docx, pdf
            </p>
            <Upload
              data={academicRegistrationSubjectsForm.uploadInput}
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
          <div className="academicregistrationsubjectsbtns">
            <div className="academicregistrationsubjectsbtn">
              <Button
                data={cancelBtnAcademicActivities}
                onClick={() => {
                  history.goBack();
                }}
              />
            </div>
            <div className="academicregistrationsubjectsbtn">
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
      </>
    );
  };

  return (
    <>
      <HeaderApp />
      <div>
        <FormHelpCenter
          formData={flowsFormHelpCenter.academicRegistrationSubjectsForm}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default AcademicRegistrationSubjectsForm;
