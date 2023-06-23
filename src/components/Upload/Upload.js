import React, { useEffect } from "react";



export const Upload = React.memo(({ data,hasError,errorMessage, onFile,onRemove }) => {
  const uploadRef = React.createRef();

  useEffect(() => {
    uploadRef.current.data = {
      title: data.title || '',
      extensions: data.extensions || '',
      disabled: data.disabled,
      id: data.id,
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    uploadRef.current.hasError = hasError;
    uploadRef.current.errorMessage = errorMessage;
  }, [hasError,errorMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    uploadRef.current.addEventListener("onFile", onFile);
    uploadRef.current.addEventListener("onRemove", onRemove);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-upload ref={uploadRef}></lottus-upload>
    </>
  );
});
