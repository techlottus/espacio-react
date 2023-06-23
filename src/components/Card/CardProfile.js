import React, { useEffect } from "react";

export const CardProfile = React.memo(({ data }) => {
  const cardRef = React.createRef();

  useEffect(() => {
    cardRef.current.data = {
      image: data.image || "",
      name: data.name || "",
      items: data.items || [],
      disabled: data.disabled,
    };
  }, [data]);

  return (
    <>
      <lottus-card-profile ref={cardRef}></lottus-card-profile>
    </>
  );
});
