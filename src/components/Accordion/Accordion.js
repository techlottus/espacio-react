import React, { useEffect } from "react";

export const Accordion = ({ data }) => {
  const accordionRef = React.createRef();

  useEffect(() => {
    accordionRef.current.data = {
      items: data.items || [],
    };
  });
  return (
    <>
      <lottus-accordion ref={accordionRef}></lottus-accordion>
    </>
  );
};
