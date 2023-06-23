import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import ConfirmHelpCenter from "../../Layouts/ConfirmHelpCenter/ConfirmHelpCenter";

const ProceduresHelpConfirm = () => {
  const history = useHistory();

  const [noTicket, setTicket] = useState({
    ticket: null
  });

  const [error, setIsError] = useState(false);

  useEffect(() => {
    window.scrollTo(0,0);
    if (history.location.state) {
      setIsError(history.location.state.error);
      setTicket({
        ticket: history.location.state.status,
      });
    }

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <HeaderApp />
      <div>
        <ConfirmHelpCenter
          isError={error}
          noTicket={noTicket.ticket}
          btnTitle={"Regresar a Ayuda en trámites y servicios"}
          onBack={() => {
            history.push('/help-center/flow/procedures-help')
          }}
          onNext={() => {
            history.push('/help-center/dashboard')
          }}
        />
      </div>
      <FooterApp />
    </>
  );
};

export default ProceduresHelpConfirm;