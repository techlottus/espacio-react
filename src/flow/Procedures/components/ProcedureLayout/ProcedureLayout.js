import React, { useEffect, useState } from "react";
import Information from "./views/Information";
import Forms from "./views/Forms";
import "./ProcedureLayout.scss";
import { useHistory } from "react-router-dom";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import { typesRequestErrors } from "../../../../constants/error.constant";
import { setErrorPocedures } from "../../../../actions/proceduresActions/proceduresAction";
import { useDispatch, useSelector } from "react-redux";
import { buttonEmptyProcedures } from "../../../../constants/Procedures.constant";
import { texts } from "../../../../texts/indexText";
import { getImageOfAssetsMark } from "../../../../helpers/getImages";

const ProcedureLayout = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const [typeView, setTypeView] = useState({
    flow: null,
    stage: null,
  });

  useEffect(() => {
    const items = history.location.pathname
      .replace("/procedures-flows/", "")
      .split("/");
    setTypeView({
      flow: items[0],
      stage: items[1],
    });

    return () => {
      dispatch(
        setErrorPocedures(
          typesRequestErrors.getInformationProcedures,
          false,
          null
        )
      );
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const procedureStore = useSelector((state) => state.procedures);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(
      procedureStore.errors[typesRequestErrors.getInformationProcedures].isError
    );
  }, [procedureStore.errors]);

  const renderSuccess = () => {
    return (
      <>
        <div className="infocontent">
          <Information type={typeView} />
        </div>
        <div className="formscontent">
          <Forms />
        </div>
      </>
    );
  };

  const renderError = () => {
    return (
      <div>
        <EmptyState 
        img={getImageOfAssetsMark(texts?.accountStatus?.images?.empty)}
        title={texts.procedures.emptyText}
        button={buttonEmptyProcedures}
        action={() => {
          history.goBack()
        }}
        />

      </div>
    );
  };

  return (
    <>
      <div className="procedurelayout-container">
        {isError ? renderError()
          : renderSuccess()}
      </div>
    </>
  );
};

export default ProcedureLayout;
