import { fileBase64 } from "../../../helpers/convertFile";

export const setInfoUpload = (info, form, setErrorUpload,maxSizeFile,texts) => {
  if (info.isError) {
    form.get(info.id).setValue(null);
    return;
  }
  setErrorUpload((state) => {
    return {
      ...state,
      [info.id]: {
        hasError: false,
        errorMessage: null,
      },
    };
  });
  fileBase64(info.file, info.sizeInBytes, maxSizeFile,texts)
    .then((res) => {
      form.get(info.id).setValue({
        name: info.name,
        body: res,
        type: info.file.type,
      });
    })
    .catch((err) => {
      form.get(info.id).setValue(null);
      setErrorUpload((state) => {
        return {
          ...state,
          [info.id]: {
            hasError: true,
            errorMessage: err,
          },
        };
      });
    });
};


export const setInfoUploadWihtoutForm = (info,setFile,setErrorUpload,maxSizeFile, texts) => {
  if (info.isError) {
    setFile(null);
    return;
  }
  setErrorUpload({
    hasError: false,
    errorMessage: null,
  });
  fileBase64(
    info.file,
    info.sizeInBytes,
    maxSizeFile,
    texts
  )
    .then((res) => {
      setFile({
        name: info.name,
        body: res,
        type: info.file.type,
      });
    })
    .catch((err) => {
      setFile({
        name: null,
        body: null,
        type: null,
      });
      setErrorUpload({
        hasError: true,
        errorMessage: err,
      });
    });
}