import React, { useEffect } from "react";

export const Search = React.memo(({ data, value='', onEnter }) => {
  const searchRef = React.createRef();

  useEffect(() => {
    searchRef.current.data = {
      icon: data.icon || "",
      placeholder: data.placeholder || "",
      autocomplete: data.autocomplete || "",
      typeSearch: data.typeSearch || "",
      alphabetical: data.alphabetical,
      upperCase: data.upperCase,
      type: data.type || "",
      size: data.size || "",
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    searchRef.current.value = value;
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    searchRef.current.addEventListener("eventEnter", onEnter);
  }, []);

  return (
    <>
      <lottus-search ref={searchRef}></lottus-search>
    </>
  );
});
