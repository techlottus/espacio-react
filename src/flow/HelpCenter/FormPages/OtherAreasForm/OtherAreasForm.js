import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import {
  btnCancelHelpCenter,
  btnSendHelpCenter,
  flowsFormHelpCenter,
  otherAreasForm,
} from "../../../../constants/FormPagesHelpCenter.constant";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import FormHelpCenter from "../../Layouts/FormHelpCenter/FormHelpCenter";
import "./OtherAreasForm.scss";
import { useFormBuilder } from "../../../../hooks/useForm";
import { HelpCenterContext } from "../../HelpCenterContext";
import { typesFlowsFormsHelpCenter } from "../../../../types/typesHelpCenter";
import {
  formatInfoModalOtherAreasHelpCenter,
} from "../../Utils/formatInformationHelpCenter";
import { setInfoModalHelpCenter } from "../../Utils/infoModalHelpCenter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { getOtherAreasValidators } from "../../../../validators/helpCenter/proceduresHelpValidators/otherAreasValidator";
import { setProceduresHelpReset } from "../../../../actions/helpCenterActions/proceduresHelpActions/proceduresHelpActions";
import { getOtherAreasService } from "../../../../middlewares/helpCenterMiddlewares/proceduresHelpMiddlewares/otherAreasMiddleware";
import { useSelectProcedures } from "../../../../hooks/useSelectProcedures";

const OtherAreasForm = () => {
  const { handleModalHelpCenter, handleInfoModalHelpCenter } =
    useContext(HelpCenterContext);
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
      formatInfoModalOtherAreasHelpCenter(infoSelect, form.value),
      typesFlowsFormsHelpCenter.otherAreasHelp,
      infoStore.value
    );
  };

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(btnSendHelpCenter, actionValid);

  const [valueDescription, setValueDescription] = useState("");

  const { information: infoStore } = useSelector(
    (state) => state.helpCenterProcedures
  );
  const [checkboxes,setCheckboxes] = useSelectProcedures(infoStore.optionsCheckboxes, null);

  const [infoSelect,setInfoSelect] = useState({
    optionsCheckboxes: [],
  });

  useEffect(() => {
    setInfoSelect({
      optionsCheckboxes: infoStore.optionsCheckboxes,
    })
  },[infoStore.optionsCheckboxes])
  

  useEffect(() => {
    setValueDescription("");
  }, [infoStore]);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getOtherAreasService());
    setForm(getOtherAreasValidators({}));

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
      <div className="otherareasformcontent">
        <p className="titleotherareasform">Cuéntanos el problema</p>
        <div className="otherareasactivitiesitem">
          {checkboxes.map((checkbox, i) => {
            return (
              <div key={i} className="otherareasactivitiescheckbox">
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
        <div className="commentotherareasform">
          <Input
            data={otherAreasForm.descriptionInput.data}
            value={valueDescription}
            eventKeyPress={(e) => {
              setValuesForm({
                name: otherAreasForm.descriptionInput.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
        <div className="btnotherareasform">
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
          formData={flowsFormHelpCenter.otherAreasForm}
          html={viewPage}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default OtherAreasForm;
