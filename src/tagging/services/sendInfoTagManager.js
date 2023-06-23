
export const sendInfoTM = (ref,info,idsubelement=null) => {
  if(idsubelement) {
    ref.dataLayer.push({
      ...info,
      idsubelement
    });
  } else {
    ref.dataLayer.push({
      ...info,
    });
  }
}