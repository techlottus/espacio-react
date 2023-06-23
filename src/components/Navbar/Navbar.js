import React, { useEffect } from "react";



export const Navbar = React.memo(({ data, onRight, onLogo }) => {

  const navbarRef = React.createRef();


  useEffect(() => {
    navbarRef.current.data = {
      urlLogo: data.urlLogo || "",
      iconLeft: data.iconLeft || "",
      iconsRight: data.iconsRight || [],
      zindex: 10
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    navbarRef.current.addEventListener("onRight", onRight);
    navbarRef.current.addEventListener("onLogo", onLogo);

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-navbar ref={navbarRef}></lottus-navbar>
    </>
  );
});
