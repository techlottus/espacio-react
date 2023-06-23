import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../helpers/auth";

export const getDegreeInfoValidators = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    //selectTypeProgramDegree: [values.selectTypeProgramDegree || "", Validators.required],
    selectTypePaymentDegree: [values.selectTypePaymentDegree || "", Validators.required,
    ],
  };
};

export const getDegreeInProgressDocumentationValidators = () => {
  return {
    procedureDegree: [null ,[Validators.required]],
    photo: [null ,[Validators.required]],
    ineFront: [null ,[Validators.required]],
    ineBack: [null ,[Validators.required]],
    curp: [null ,[Validators.required]],
  }
}

export const getDegreeGraduateDocumentationValidators = () => {
  return {
    procedureDegree: [null ,[Validators.required]],
    photo: [null ,[Validators.required]],
    acadHistory: [null ,[Validators.required]],
    ineFront: [null ,[Validators.required]],
    ineBack: [null ,[Validators.required]],
    curp: [null ,[Validators.required]],
    relSocialService: [null], 
  }
}
