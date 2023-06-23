import React, { useContext, useEffect, useState } from "react";
import {
  academicProfessorsFeedbackForm,
  cancelBtnAcademicActivities,
  flowsFormHelpCenter,
  nextBtnAcademicActivities,
  selectAdesAcademicHelp,
} from "../../../../constants/FormPagesHelpCenter.constant";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";
import "./AcademicProfessorsFeedbackForm.scss";
import { Input } from "../../../../components/Input/Input";
import { useFormBuilder } from "../../../../hooks/useForm";

import { Button } from "../../../../components/Button/Button";
import { getProfessorsFeedbackValidators } from "../../../../validators/helpCenter/academicHelpValidators/professorsFeedbackValidator";
import { getProfessorsFeedbackService } from "../../../../middlewares/helpCenterMiddlewares/academicHelpMiddlewares/academicProfessorsFeedbackMiddleware";
import { HelpCenterContext } from "../../HelpCenterContext";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { formatInfoModalProfessorsFeedbackHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { setAcademicHelpReset } from "../../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Select } from "../../../../components/Select/Select";

const AcademicProfessorsFeedbackForm = () => {
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
      formatInfoModalProfessorsFeedbackHelpCenter(infoSelect, form.value),
      typesFlowsFormsHelpCenter.professorsFeedbackHelp,
      infoStore.recordTypeId
    );
  };
  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnAcademicActivities, actionValid);

  const [valueAssignment, setValueAssignment] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueProfessor, setValueProfessor] = useState("");
  const [file] = useState({
    name: null,
    body: null,
    type: null,
  });
  const { information: infoStore, optionsAds } = useSelector(
    (state) => state.helpCenterAcademic
  );

  const [infoSelect, setInfoSelect] = useState({
    optionsCheckboxes: [],
    optionsAdesSelect: [],
  });

  useEffect(() => {
    setInfoSelect({
      optionsCheckboxes: infoStore.optionsCheckboxes,
      optionsAdesSelect: optionsAds,
    });
  }, [infoStore.optionsCheckboxes, optionsAds]);

  const [checkboxes, setCheckboxes] = useSelectProcedures(
    infoStore.optionsCheckboxes,
    null
  );
  const [selectAds] = useSelectProcedures(optionsAds, null);

  useEffect(() => {
    setValueDescription("");
    setValueAssignment("");
    setValueProfessor("");
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getProfessorsFeedbackService());
    setForm(getProfessorsFeedbackValidators({}));

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
            data={academicProfessorsFeedbackForm.assignmentInput.data}
            value={valueAssignment}
            hasError={
              errorForms[
                academicProfessorsFeedbackForm.assignmentInput.data.name
              ]
            }
            errorMessage={
              academicProfessorsFeedbackForm.assignmentInput.errorMessage
            }
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicProfessorsFeedbackForm.assignmentInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="academicactivitiesitem">
          <Input
            data={academicProfessorsFeedbackForm.professorInput.data}
            value={valueProfessor}
            hasError={
              errorForms[
                academicProfessorsFeedbackForm.professorInput.data.name
              ]
            }
            errorMessage={
              academicProfessorsFeedbackForm.professorInput.errorMessage
            }
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicProfessorsFeedbackForm.professorInput.data.name,
                value: e.detail.value,
              });
            }}
          />
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
          <p className="academicdescriptiontitle">Cuentanos el problema</p>
          <Input
            data={academicProfessorsFeedbackForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: academicProfessorsFeedbackForm.descriptionInput.data.name,
                value: e.detail.value,
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
          formData={flowsFormHelpCenter.academicProfessorsFeedbackForm}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default AcademicProfessorsFeedbackForm;
