import React, { useEffect } from "react";



export const Menu = React.memo(({ data, onClose, onCard,outside }) => {
  const menuRef = React.createRef();

  useEffect(() => {
    menuRef.current.data = {
      items: data.items || [],
      disabledBtnClose: data.disabledBtnClose,
      isShow: data.isShow,
    };
  },[data]) // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    menuRef.current.addEventListener("onClose", onClose);
    menuRef.current.addEventListener("onCard", onCard);
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && window.innerWidth > 991) {
        outside();
      }
      
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-menu ref={menuRef}></lottus-menu>
    </>
  );
});
