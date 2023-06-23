import { typeErrorAuth } from "../constants/Login.constant";
import { eventErrorAuth } from "../observables/eventError";

export const handleError = (status,response) => {

  switch(status) {
    case 401:
      eventErrorAuth.next(typeErrorAuth.error401);
      return;
    default:
      if(status && status >= 400) {
        return (response.error && typeof response.status === 'object') ? response.status.info:'Ha ocurrido un error, inténtalo más tarde';
      }
      return 'Ha ocurrido un error, inténtalo más tarde';
  }
}

export const handleErrorPostProcedure = (status, response) => {
  switch(status) {
    case 401:
      eventErrorAuth.next(typeErrorAuth.error401);
      return;
    default:
      if(status && status >= 400 && status < 500) {
        return (response.error && typeof response.status === 'object') ? response.status.info:'No  pudimos completar tu solicitud, inténtalo más tarde';
      }
      return 'Tuvimos dificultades para cargar tu información en este momento, intentalo más tarde';
  }
}

export const handleErrorGetProcedure = (status, response) => {
  switch(status) {
    case 401:
      eventErrorAuth.next(typeErrorAuth.error401);
      return;
    default:
      if(status && status >= 400 && status < 500) {
        return (response.error && typeof response.status === 'object') ? response.status.info:'Tuvimos dificultades para cargar la información, inténtalo más tarde';
      }
      return 'Tuvimos dificultades para cargar la información, inténtalo más tarde';
  }
}