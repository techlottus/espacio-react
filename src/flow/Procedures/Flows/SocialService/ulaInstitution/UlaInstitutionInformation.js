import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../../../../../components/Button/Button";
import { CardProfile } from "../../../../../components/Card/CardProfile";
import { Feedback } from "../../../../../components/Feedback/Feedback";
import { Input } from "../../../../../components/Input/Input";
import { Link } from "../../../../../components/Link/Link";
import { cardProfile } from "../../../../../constants/AccountStatus.constant";
import {
  typeflowsProcedures,
} from "../../../../../constants/Procedures.constant";
import {
  cancelBtnUlaInstitution,
  conventionsLinkUlaInsituttion,
  feedbackNoticeUlaInstitution,
  inputUlaInstitutionManager,
  inputUlaInstitutionName,
  inputUlaInstitutionNum,
  nextBtnUlaInstitution,
  requirementGuideLinkUlaInsituttion,
  textareaUlaInstitution,
} from "../../../../../constants/ProceduresUlaInstitution.constant";
import { getValuesOfAuth } from "../../../../../helpers/auth";
import { downloadFile } from "../../../../../helpers/download";
import { getImageOfAssets } from "../../../../../helpers/getImages";
import { resetFlowProcedures } from "../../../../../helpers/proceduresActions";
import { useFormBuilder } from "../../../../../hooks/useForm";
import { getUlaInstitutionValidator } from "../../../../../validators/procedures/socialService/ulaInstituteValidator";
import { ProceduresContext } from "../../../ProceduresContext";
import { formatInfoModalUlaInstitutionSocialServiceProcedure } from "../../../Utils/formatInformationProcedures";
import { setInfoModalProcedure } from "../../../Utils/infoModalProcedures";
import "./UlaInstitutionInformation.scss";

const UlaInstitutionInformation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { 
    handleSteps, 
    handleModalProcedures, 
    handleInfoModalProcedures,
    handleModalRequirements,
    handleIsTabs
   } = useContext(ProceduresContext);

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { data } = useSelector(
    (state) => state.proceduresSocialService
  );

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const [infoModal,setInfoModal] = useState({
    links: {},
    steps: []
  });

  const { texts } = useSelector((state) => state.texts);
  const [profile, setProfile] = useState({
    ...cardProfile,
    image: getImageOfAssets(texts?.accountStatus?.images?.user),
  });
  const [valuePhone,setValuePhone] = useState("");
  const [institutionName] = useState("");
  const [programManager] = useState("");
  const [valueComments] = useState("");

  const actionValid = () => {
  };
  
  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(nextBtnUlaInstitution, actionValid);

  useEffect(() => {
    setInfoModal({
      links: data?.filesLinks || {},
      steps: data?.socialServiceRequirements || []
    });
  },[data])

  useEffect(() => {
    //if (infoStore.profile !== null) {
    const inforProfile = profileProcedure;
    setProfile((state) => {
      return {
        ...state,
        name: inforProfile?.name,
        items: inforProfile?.items,
      };
    });
    //}
    setValuePhone(getValuesOfAuth().phone);
  }, [profileProcedure]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleIsTabs(false);
    handleSteps(0);
    setNextBtn(false);
    setForm(getUlaInstitutionValidator({}, getValuesOfAuth()));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (valuesForm.name && valuesForm.value) {
      form.get(valuesForm.name).setValue(valuesForm.value);
      setValuesForm({
        name: null,
        value: null,
      });
    }
  }, [valuesForm, form]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(next.valid) {
      setInfoModalProcedure(
        handleModalProcedures,
        handleInfoModalProcedures,
        next.value,
        {},
        [],
        formatInfoModalUlaInstitutionSocialServiceProcedure(next.value),
        typeflowsProcedures.ulaInstitutionSocialService,
        {}
      )
      setNext(false);
    }
  },[next]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {profileProcedure ? (
        <div className="ulainstitutionprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        ""
      )}
      <div className="ulainstitutionnumber">
        <p className="ulainstitutiontitle">{texts.procedures.phoneText}</p>
        <div className="ulainstitutioninput">
          <Input
            data={inputUlaInstitutionNum.data}
            value={valuePhone}
            hasError={errorForms[inputUlaInstitutionNum.data.name]}
            errorMessage={inputUlaInstitutionNum.errorMessage}
            eventKeyPress={(e) => {
              setValuesForm({
                name: inputUlaInstitutionNum.data.name,
                value: e.detail.value,
              });
            }}
          />
        </div>
      </div>
      <div className="ulainstitutionformitem">
        <Input
          data={inputUlaInstitutionName.data}
          value={institutionName}
          hasError={errorForms[inputUlaInstitutionName.data.name]}
          errorMessage={inputUlaInstitutionName.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: inputUlaInstitutionName.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="ulainstitutionformitem">
        <Input
          data={inputUlaInstitutionManager.data}
          value={programManager}
          hasError={errorForms[inputUlaInstitutionManager.data.name]}
          errorMessage={inputUlaInstitutionManager.errorMessage}
          eventKeyPress={(e) => {
            setValuesForm({
              name: inputUlaInstitutionManager.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="ulainstitutionformitem">
        <Input
          data={textareaUlaInstitution.data}
          value={valueComments}
          eventKeyPress={(e) => {
            setValuesForm({
              name: textareaUlaInstitution.data.name,
              value: e.detail.value,
            });
          }}
        />
      </div>
      <div className="ulainstitutioninfolinks">
        <div className="ulainstitutioninfolink">
          <Link data={conventionsLinkUlaInsituttion} onClick={() => {
            setInfoModal(state => {
              downloadFile(
                "Convenios ULA",
                state.links.registeredInstitutions
              );
              return state;
            })
          }}/>
        </div>
        <div className="ulainstitutioninfolinkwarnig">
          {texts?.procedures?.ulaInstitutionSocialService?.warning}
        </div>
      </div>
      <div className="ulainstitutioninfonoti">
        <Feedback
          data={feedbackNoticeUlaInstitution}
          text={texts?.procedures?.feedBackText}
        />
      </div>
      <div className="ulainstitutioninfbtns">
        <div className="ulainstitutioninfbtn">
          <Button
            data={{
              ...cancelBtnUlaInstitution,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              resetFlowProcedures(dispatch);
              history.push(`/procedures-main`);
            }}
          />
        </div>
        <div className="ulainstitutioninfbtn">
          <Button
            data={nextBtn}
            onClick={() => {
              setNext(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default UlaInstitutionInformation;
