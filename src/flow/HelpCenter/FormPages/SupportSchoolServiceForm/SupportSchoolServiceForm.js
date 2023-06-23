import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import {
  btnCancelHelpCenter,
  btnSendHelpCenter,
  flowsFormHelpCenter,
  supportSchoolForm,
} from "../../../../constants/FormPagesHelpCenter.constant";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import "./SupportSchoolServiceForm.scss";
import { useFormBuilder } from "../../../../hooks/useForm";
import { getSupportSchoolValidators } from "../../../../validators/helpCenter/proceduresHelpValidators/supportSchoolValidator";
import { HelpCenterContext } from "../../HelpCenterContext";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import { formatInfoModalSupportSchoolHelpCenter } from "../../Utils/formatInformationHelpCenter";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setProceduresHelpReset } from "../../../../actions/helpCenterActions/proceduresHelpActions/proceduresHelpActions";
import { getSupportSchoolService } from "../../../../middlewares/helpCenterMiddlewares/proceduresHelpMiddlewares/supportSchoolMiddleware";

const SupportSchoolForm = () => {
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
      formatInfoModalSupportSchoolHelpCenter(form.value),
      typesFlowsFormsHelpCenter.supportSchoolHelp,
      infoStore.recordTypeId
    );
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
    dispatch(getSupportSchoolService())
    setForm(getSupportSchoolValidators({}));

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
      <div className="supportformcontent">
        <p className="titlesupportform">Cuéntanos el problema</p>
        <div className="commentsupportform">
          <Input
            data={supportSchoolForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: supportSchoolForm.descriptionInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="btnsupportform">
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
          formData={flowsFormHelpCenter.supportSchoolForm}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default SupportSchoolForm;
