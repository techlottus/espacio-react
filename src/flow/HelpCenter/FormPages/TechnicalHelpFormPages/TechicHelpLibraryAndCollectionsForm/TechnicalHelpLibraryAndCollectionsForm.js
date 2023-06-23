import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setTechnicalHelpReset } from "../../../../../actions/helpCenterActions/technicalHelpActions/technicalHelpActions";
import { Button } from "../../../../../components/Button/Button";
import { Checkbox } from "../../../../../components/Checkbox/Checkbox";
import { Input } from "../../../../../components/Input/Input";
import { Upload } from "../../../../../components/Upload/Upload";
import {
  cancelBtnAcademicActivities,
  flowsFormHelpCenter,
  maxSizeFileInAcademicActivities,
  nextBtnAcademicActivities,
  selectAdescHelp,
  technicalHelpLibraryAndCollections,
} from "../../../../../constants/FormPagesHelpCenter.constant";
import { useFormBuilder } from "../../../../../hooks/useForm";
import { useSelectProcedures } from "../../../../../hooks/useSelectProcedures";
import { getTechnicalLibraryAndCollectionsService } from "../../../../../middlewares/helpCenterMiddlewares/technicalHelpMiddlewares/technicalLibraryAndCollectionsMiddleware";
import FooterApp from "../../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../../shared/HeaderApp/HeaderApp";
import { typesFlowsFormsHelpCenter } from "../../../../../types/typesHelpCenter";
import { getTechnicalLibraryAndCollectionsValidators } from "../../../../../validators/helpCenter/technicalHelpValidators/technicalLibraryAndCollectionsValidator";
import { setInfoModalHelpCenter } from "../../../Utils/infoModalHelpCenter";
import { setInfoUploadWihtoutForm } from "../../../../Procedures/Utils/setInfoUpload";
import { HelpCenterContext } from "../../../HelpCenterContext";
import FormHelpCenter from "../../../Layouts/FormHelpCenter/FormHelpCenter";
import "./TechnicalHelpLibraryAndCollectionsForm.scss";
import { formatInfoModalTechnicalLibraryAndCollectionsHelpCenter } from "../../../Utils/formatInformationHelpCenter";
import { Select } from "../../../../../components/Select/Select";

const nameCheckbox = "selectCheckboxes";

const TechnicalHelpLibraryAndCollectionsForm = () => {
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
      formatInfoModalTechnicalLibraryAndCollectionsHelpCenter(
        infoSelect,
        form.value
      ),
      typesFlowsFormsHelpCenter.technicalHelpLibraryAndCollections,
      infoStore.recordTypeId
    );
  };
  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnAcademicActivities, actionValid);

  const [valueSubject, setValueSubject] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueTeacher, setValueTeacher] = useState("");
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
    (state) => state.helpCenterTechnical
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
    setValueTeacher("");
    setValueActivity("");
    setValueSubject("");
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getTechnicalLibraryAndCollectionsService());
    setForm(getTechnicalLibraryAndCollectionsValidators({}));

    return () => {
      dispatch(setTechnicalHelpReset());
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
      <>
        <div className="technicallibraryandcollectionscontent">
          <div className="technicallibraryandcollectionstitle">
            Selecciona el asunto
          </div>
          <div className="technicallibraryandcollectionsitem">
            {checkboxes.map((checkbox, i) => {
              return (
                <div key={i} className="technicallibraryandcollectionscheckbox">
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
          <div className="technicallibraryandcollectionsitem">
            <Input
              data={technicalHelpLibraryAndCollections.subject.data}
              value={valueSubject}
              hasError={
                errorForms[technicalHelpLibraryAndCollections.subject.data.name]
              }
              errorMessage={
                technicalHelpLibraryAndCollections.subject.errorMessage
              }
              eventKeyPress={(e) => {
                setValuesForm({
                  name: technicalHelpLibraryAndCollections.subject.data.name,
                  value: e.detail.value,
                });
              }}
            />
          </div>
          <div className="technicallibraryandcollectionsitem">
            <Input
              data={technicalHelpLibraryAndCollections.teacher.data}
              value={valueTeacher}
              hasError={
                errorForms[technicalHelpLibraryAndCollections.teacher.data.name]
              }
              errorMessage={
                technicalHelpLibraryAndCollections.teacher.errorMessage
              }
              eventKeyPress={(e) => {
                setValuesForm({
                  name: technicalHelpLibraryAndCollections.teacher.data.name,
                  value: e.detail.value,
                });
              }}
            />
          </div>
          <div className="technicallibraryandcollectionsitem">
            <Input
              data={technicalHelpLibraryAndCollections.activity.data}
              value={valueActivity}
              hasError={
                errorForms[
                  technicalHelpLibraryAndCollections.activity.data.name
                ]
              }
              errorMessage={
                technicalHelpLibraryAndCollections.activity.errorMessage
              }
              eventKeyPress={(e) => {
                setValuesForm({
                  name: technicalHelpLibraryAndCollections.activity.data.name,
                  value: e.detail.value,
                });
              }}
            />
          </div>
          <div className="technicallibraryandcollectionsitem">
            <Select
              data={selectAdescHelp}
              options={selectAds}
              onClick={(e) => {
                setValuesForm({
                  name: selectAdescHelp.name,
                  value: e.detail,
                });
              }}
            />
          </div>
          <div className="technicallibraryandcollectionsitem">
            <p className="technicallibraryandcollectionsitemtitle">
              Cuentanos el problema
            </p>
            <Input
              data={technicalHelpLibraryAndCollections.description.data}
              value={valueDescription}
              hasError={
                errorForms[
                  technicalHelpLibraryAndCollections.description.data.name
                ]
              }
              errorMessage={
                technicalHelpLibraryAndCollections.description.errorMessage
              }
              eventKeyPress={(e) => {
                setValuesForm({
                  name: technicalHelpLibraryAndCollections.description.data
                    .name,
                  value: e.detail.value,
                });
              }}
            />
          </div>
          <div className="technicallibraryandcollectionsitem">
            <p className="technicallibraryandcollectionsuploadtitle">
              *Máximo 2MB / Extensiones validas png, jpg, doc, docx, pdf
            </p>
            <Upload
              data={technicalHelpLibraryAndCollections.uploadInput}
              hasError={errorUpload.hasError}
              errorMessage={errorUpload.errorMessage}
              onFile={(e) => {
                setInfoUploadWihtoutForm(
                  e.detail,
                  setFile,
                  setErrorUpload,
                  maxSizeFileInAcademicActivities,
                  "Documento"
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
          <div className="technicallibraryandcollectionsbtns">
            <div className="technicallibraryandcollectionsbtn">
              <Button
                data={cancelBtnAcademicActivities}
                onClick={() => {
                  history.goBack();
                }}
              />
            </div>
            <div className="technicallibraryandcollectionsbtn">
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
          formData={flowsFormHelpCenter.technicalHelpLibraryAndCollections}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default TechnicalHelpLibraryAndCollectionsForm;
