import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ModalProcedures } from "../../components/Modal/ModalProcedures/ModalProcedures";
import { helpCenterRequests } from "../../middlewares/helpCenterMiddlewares/indexHelpCenterMiddleware";
import { getProfileProceduresService } from "../../middlewares/proceduresMiddlewares/procedureMainMiddleware";
import HelpCenterRoutes from "../../routes/HelpCenterRoutes";
import { HelpCenterContext } from "./HelpCenterContext";

const HelpCenter = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState({
    valid: false,
    info: null,
    file: null,
    type: null,
    recordTypeId: null
  });
  const [infoModal, setInfoModal] = useState({
    profile: null,
    information: null,
    file: null,
    title: null,
  });
  const handleModalHelpCenter = (info) => {
    setIsModal(info)
  }
  const handleRequest = () => {
    setIsModal(false);
    dispatch(
      helpCenterRequests(isModal.type, history, isModal.info, isModal.file, isModal.recordTypeId)
    );
  };
  const handleInfoModalHelpCenter = (info) => {
    setInfoModal(info)
  }

  useEffect(() => {
    dispatch(getProfileProceduresService());
  },[])

  return (
    <>
      <HelpCenterContext.Provider
         value={{
          isModal,
          handleModalHelpCenter,
          handleInfoModalHelpCenter,
        }}>
        <HelpCenterRoutes />
        <ModalProcedures
          isShow={isModal.valid}
          outside={() => setIsModal(false)}
          onClose={() => {
            setIsModal(false);
          }}
          onNext={() => {
            handleRequest();
          }}
          infoModal={infoModal}
        />
      </HelpCenterContext.Provider>
    </>
  );
};

export default HelpCenter;
