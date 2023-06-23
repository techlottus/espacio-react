import { store } from "../../../store/store";

export const setInfoModalHelpCenter = (setIsModal,setInfoModal,dataStore,file,fileFormat,information,type, recordTypeId) => {
  const {profile} = store.getState().procedures;

  setIsModal({
    valid: true,
    info: dataStore,
    file,
    type,
    recordTypeId
  });
  setInfoModal({
    profile,
    information,
    file:fileFormat,
    recordTypeId
  })
}