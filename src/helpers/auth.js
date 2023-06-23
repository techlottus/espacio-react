import jwt_decode from "jwt-decode";
import env from "../enviroment/environment";
import { getCheckAuthHttp } from "../services/Login/loginService";
import { store } from "../store/store";
import { typesMark } from "../types/typesMark";
import { typesModality, typesModalityBanner } from "../types/typesProcedures";

export const useProvideAuth = () => {
  const user = store.getState().login.accessToken;
  return {
    user,
  };
};

export const authCheck = async () => {
  try {
    const { authorized } = await getCheckAuthHttp();
    return authorized;
  } catch (e) {
    throw e;
  }
};

export const getValuesOfAuth = () => {
  const token = store.getState().login.accessToken;
  if (token) {
    const {
      name,
      email,
      privacyNotice,
      studentEnrollmentNumber,
      modality,
      phoneNumber,
      studentId,
      permissions,
      medallia,
    } = jwt_decode(token);
    return {
      name,
      email,
      userId: studentId,
      mask: studentEnrollmentNumber,
      phone: phoneNumber,
      modality: getModality(modality),
      typeModality: modality,
      permissions,
      medallia,
      isTerms:
        privacyNotice.privacy_notice_agreed &&
        privacyNotice.terms_and_conditions_agreed,
      degree: {
        inProgress: {
          access:
            permissions?.serviciosEscolares?.functions?.titulacion?.buttons
              ?.cursando?.access,
          isDocsValid:
            permissions?.serviciosEscolares?.functions?.titulacion?.buttons
              ?.cursando?.validations?.documents,
          isTotalCredit:
            permissions?.serviciosEscolares?.functions?.titulacion?.buttons
              ?.cursando?.validations?.percent,
        },
        graduates: {
          access:
            permissions?.serviciosEscolares?.functions?.titulacion?.buttons
              ?.egresado?.access,
          isDocsValid:
            permissions?.serviciosEscolares?.functions?.titulacion?.buttons
              ?.egresado?.validations?.documents,
          isTotalCredit:
            permissions?.serviciosEscolares?.functions?.titulacion?.buttons
              ?.egresado?.validations?.percent,
        },
      },
      socialService: {
        key: "servicioSocial",
        isDocsValid:
          permissions?.serviciosEscolares?.functions?.servicioSocial?.buttons
            ?.servicioSocialGral?.validations?.documents,
        isTotalCredit:
          permissions?.serviciosEscolares?.functions?.servicioSocial?.buttons
            ?.servicioSocialGral?.validations?.percent,
      },
      isShowPaymentOnline: permissions?.pagos?.functions?.stripe?.access,
      urlsBecas: {
        ...permissions?.serviciosEscolares?.functions?.becas?.buttons
      }
    };
  } else {
    return {
      name: null,
      email: null,
      userId: null,
      mask: null,
      phone: null,
      isTerms: false,
      permissions: null,
    };
  }
};

export const getModality = (type) => {
  if (env.mark === typesMark.ula) {
    switch (type) {
      case typesModalityBanner.executive:
      case typesModalityBanner.toDistance:
        return typesModality.withDelivery;
      case typesModalityBanner.school:
        return typesModality.withoutDelivery;
      default:
        return typesModality.withDelivery;
    }
  }

  if (env.mark === typesMark.utc) {
    switch (type) {
      case typesModalityBanner.toDistance:
        return typesModality.withDelivery;
      case typesModalityBanner.school:
      case typesModalityBanner.executive:
        return typesModality.withoutDelivery;
      default:
        return typesModality.withDelivery;
    }
  }

  return null;
};
