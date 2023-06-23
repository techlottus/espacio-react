import React, { useEffect } from "react";

export const Breadcrumb = React.memo(({ data, onItem, onBack }) => {
  const breadcrumbRef = React.createRef();

  useEffect(() => {
    breadcrumbRef.current.data = {
      textItems: data.textItems || [],
      textColor: data.textColor || "brand",
      // iconColor: data.iconColor || '',
      // itemFocusColor: data.itemFocusColor || '',
      icon: data.icon || "",
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    breadcrumbRef.current.addEventListener("onItem", onItem);
    breadcrumbRef.current.addEventListener("onBack", onBack);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-breadcrumb ref={breadcrumbRef}></lottus-breadcrumb>
    </>
  );
});
