import React, { useContext, useEffect, useState } from "react";
import {
  cancelBtnAcademicActivities,
  financialPaymentClarificationForm,
  flowsFormHelpCenter,
  maxFileSizeErrorOneMgb,
  maxSizeFinancialPaymentClarification,
  nextBtnAcademicActivities,
  selectAdesFinancialHelp,
} from "../../../../constants/FormPagesHelpCenter.constant";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import "./FinancialHelpClarificationForm.scss";
import { Input } from "../../../../components/Input/Input";
import { useFormBuilder } from "../../../../hooks/useForm";
import { Upload } from "../../../../components/Upload/Upload";
import { setInfoUploadWihtoutForm } from "../../../Procedures/Utils/setInfoUpload";
import { Button } from "../../../../components/Button/Button";
import { getPaymentClarificationService } from "../../../../middlewares/helpCenterMiddlewares/financialHelpMiddleware/financialPyamentClarificationMiddleware";
import { getPaymentClarificationFormValidators } from "../../../../validators/helpCenter/financialHelpValidatos/paymentClarificationValidator";
import { HelpCenterContext } from "../../HelpCenterContext";
import { formatInfoModalPaymentClarificationHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import { setFinancialHelpReset } from "../../../../actions/helpCenterActions/financialHelpActions/financialHelpAction";
import { useHistory } from "react-router-dom";
import { Select } from "../../../../components/Select/Select";

const FinancialHelpClarificationForm = () => {
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
      formatInfoModalPaymentClarificationHelpCenter(infoSelect, form.value),
      typesFlowsFormsHelpCenter.paymentClarificationHelp,
      infoStore.recordTypeId
    );
  };
  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnAcademicActivities, actionValid);

  const [valueDescription, setValueDescription] = useState("");
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
    (state) => state.helpCenterFinancial
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
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getPaymentClarificationService());
    setForm(getPaymentClarificationFormValidators({}));

    return () => {
      dispatch(setFinancialHelpReset());
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
            data={selectAdesFinancialHelp}
            options={selectAds}
            onClick={(e) => {
              setValuesForm({
                name: selectAdesFinancialHelp.name,
                value: e.detail,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <p className="academicdescriptiontitle">Cuentanos el problema</p>
          <Input
            data={financialPaymentClarificationForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: financialPaymentClarificationForm.descriptionInput.data
                  .name,
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
            data={financialPaymentClarificationForm.uploadInput}
            hasError={errorUpload.hasError}
            errorMessage={errorUpload.errorMessage}
            onFile={(e) => {
              setInfoUploadWihtoutForm(
                e.detail,
                setFile,
                setErrorUpload,
                maxSizeFinancialPaymentClarification,
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
          formData={flowsFormHelpCenter.paymentHelpClarification}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default FinancialHelpClarificationForm;
