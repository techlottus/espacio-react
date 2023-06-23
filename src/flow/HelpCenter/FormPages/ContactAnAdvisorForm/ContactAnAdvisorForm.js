import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import {
  btnCancelHelpCenter,
  btnSendHelpCenter,
  contactAnAdvisorForm,
  flowsFormHelpCenter,
} from "../../../../constants/FormPagesHelpCenter.constant";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import "./ContactAnAdvisorForm.scss";
import { useFormBuilder } from "../../../../hooks/useForm";
import { HelpCenterContext } from "../../HelpCenterContext";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import { setInfoModalHelpCenter } from "../../../HelpCenter/Utils/infoModalHelpCenter";
import { getContactAnAdvisorValidators } from "../../../../validators/helpCenter/proceduresHelpValidators/contactAnAdvisorValidator";
import { formatInfoModalContactAnAdvisorHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { setProceduresHelpReset } from "../../../../actions/helpCenterActions/proceduresHelpActions/proceduresHelpActions";
import { useHistory } from "react-router-dom";
import { getContactAnAdvisorService } from "../../../../middlewares/helpCenterMiddlewares/proceduresHelpMiddlewares/contactAnAdvisorMiddleware";

const ContactAnAdvisorForm = () => {
  const { handleModalHelpCenter, handleInfoModalHelpCenter } = useContext(HelpCenterContext);
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
      null,
      [],
      formatInfoModalContactAnAdvisorHelpCenter(form.value),
      typesFlowsFormsHelpCenter.supportSchoolHelp,
      infoStore.recordTypeId
    )
  };

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(btnSendHelpCenter, actionValid);

  const [valueDescription, setValueDescription] = useState("");

  const { information: infoStore } = useSelector(
    (state) => state.helpCenterProcedures
  );

  useEffect(() => {
    setValueDescription("");
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);
      setNextBtn(false);
      
      dispatch(getContactAnAdvisorService())
      setForm(getContactAnAdvisorValidators({}));

      return () => {
        dispatch(setProceduresHelpReset());
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
      <div className="advisorformcontent">
        <p className="titleadvisorform">Cuéntanos el problema</p>
        <div className="commentadvisorform">
          <Input
            data={contactAnAdvisorForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: contactAnAdvisorForm.descriptionInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="btnadvisorform">
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
          formData={flowsFormHelpCenter.contactAnAdvisorForm}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default ContactAnAdvisorForm;
