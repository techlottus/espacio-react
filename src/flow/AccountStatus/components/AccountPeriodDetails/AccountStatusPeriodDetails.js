import React, { useEffect, useState } from "react";
import { Select } from "../../../../components/Select/Select";
import { Label } from "../../../../components/Label/Label";
import { CardMovement } from "../../../../components/Card/CardMovement";
import { getMovementsService } from "../../../../middlewares/accountStatusMiddleware";
import { convertMoney } from "../../../../helpers/formatCurrency";
import {
  selectProgram,
  selectPeriod,
  labelInit,
  feedbackErrorAccountStatus,
} from "../../../../constants/AccountStatus.constant";
import "./AccountStatusPeriodDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { convertPeriod } from "../../../../helpers/accountStatusTypes";
import { formatDate } from "../../../../helpers/formatDate";
import { setConceptDefault } from "../../../../actions/paymentAction";
import { formatString } from "../../../../helpers/formatString";
import { Feedback } from "../../../../components/Feedback/Feedback";
import { typesRequestErrors } from "../../../../constants/error.constant";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { btnPaymentAccountStatusTag, selectPeriodAccountStatusTag, selectProgramAccountStatusTag } from "../../../../tagging/flows/accountStatusTag";

const AccountStatusPeriodDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accountStatusStore = useSelector((state) => state.accountStatus);
  const [errorPrograms, setErrorPrograms] = useState({
    isError: false,
    msg: null,
  });

  const [errorMovements, setErrorMovements] = useState({
    isError: false,
    msg: null,
  });

  const [movements, setMovements] = useState(null);

  const [filters, setFilters] = useState({
    program: null,
    period: null,
  });

  const [selectPrograms, setSelectPrograms] = useState({
    valid: false,
    index: null,
  });

  const [selectPeriods, setSelectPeriods] = useState({
    valid: false,
    index: null,
  });

  const [programs, setPrograms] = useState([]);

  const [periods, setPeriods] = useState([]);

  const changePrograms = (value) => {
    if (programs && programs.length > 0) {
      const index = programs.findIndex((e) => e.value === value);
      const periodsList = accountStatusStore.programs[index].periods.map(
        (period, index) => {
          return {
            text: `${period.periodDescription}/${formatDate(
              period.startDate,
              period.endDate
            )}`,
            value: period.periodCode,
            active: index === 0,
          };
        }
      );
      setFilters((state) => {
        return {
          ...state,
          period: accountStatusStore.programs[index].periods[0].periodCode,
          program: selectPrograms.index,
        };
      });
      setPeriods(periodsList);
    }
  };

  useEffect(() => {
    if (filters.program !== null && filters.period !== null) {
      setMovements(null);
      dispatch(getMovementsService(filters.period, filters.program));
    }
  }, [filters.program, filters.period]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectPrograms.valid) {
      changePrograms(selectPrograms.index);
      setSelectPrograms({
        valid: false,
        index: null,
      });
    }
  }, [selectPrograms]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectPeriods.valid) {
      setFilters((state) => {
        return {
          ...state,
          period: selectPeriods.index,
        };
      });
      setSelectPeriods({
        valid: false,
        index: null,
      });
    }
  }, [selectPeriods]);

  useEffect(() => {
    if (accountStatusStore.programs !== null) {
      const programsList = accountStatusStore.programs.map((program, index) => {
        return {
          value: program.programCode || "",
          text: formatString(program.programDescription || ""),
          active: index === 0,
        };
      });
      setPrograms(programsList);
      const periodsList = accountStatusStore?.programs[0].periods.map(
        (period, index) => {
          return {
            text: `${period.periodDescription}/${formatDate(
              period.startDate,
              period.endDate
            )}`,
            value: period.periodCode,
            active: index === 0,
          };
        }
      );
      setFilters((state) => {
        return {
          ...state,
          period: accountStatusStore.programs[0].periods[0].periodCode,
          program: programsList[0].value,
        };
      });
      setPeriods(periodsList);
    }
  }, [accountStatusStore.programs]);

  useEffect(() => {
    if (accountStatusStore.movements !== null) {
      setMovements(accountStatusStore.movements);
    }
  }, [accountStatusStore.movements]);

  useEffect(() => {
    if (
      accountStatusStore.errors[typesRequestErrors.getProgramsAccountStatus]
        .isError
    ) {
      setErrorPrograms({
        isError: true,
        msg: accountStatusStore.errors[
          typesRequestErrors.getProgramsAccountStatus
        ].msg,
      });
    }

    if (
      accountStatusStore.errors[
        typesRequestErrors.getMovementsOfPeriosAccountAccountStatus
      ].isError
    ) {
      setErrorMovements({
        isError: true,
        msg: accountStatusStore.errors[
          typesRequestErrors.getMovementsOfPeriosAccountAccountStatus
        ].msg,
      });
    }

    return () => {
      setErrorPrograms({
        isError: false,
        msg: null
      });
      setErrorMovements({
        isError: false,
        msg: null
      })
    }
  }, [accountStatusStore.errors]);

  const handleClickPayment = (conceptCode) => {
    dispatch(setConceptDefault(conceptCode));
    history.push("/payment");
  };

  const handleSelects = () => {
    return (
      <div className="accountdetails-selects">
        <div className="select-details">
          <p className="textprogram">Programa</p>
          <Select
            data={selectProgram.data}
            options={programs}
            onClick={(e) => {
              sendInfoTM(window,selectProgramAccountStatusTag);
              setSelectPrograms({
                valid: true,
                index: e.detail,
              });
            }}
          />
        </div>
        <div className="select-details">
          <p className="textprogram">Periodo</p>
          <Select
            data={selectPeriod.data}
            options={periods}
            onClick={(e) => {
              sendInfoTM(window,selectPeriodAccountStatusTag);
              setSelectPeriods({
                valid: true,
                index: e.detail,
              });
            }}
          />
        </div>
      </div>
    );
  };

  const handleDetails = () => {
    return (
      <>
        <div className="accountdetails-period">
          <div>
            <h2 className="headingdetails">
              Periodo {(movements && movements.periodCode) || ""}
            </h2>
            <div className="calendar">
              <span className="material-icons icon iconright">
                calendar_today
              </span>
              <p className="textperiod">
                {movements && movements.startDate
                  ? formatDate(movements.startDate, movements.endDate)
                  : ""}
              </p>
            </div>
          </div>
          <div>
            <p>Saldo del periodo</p>
            <p className="detail-amount textperiod">
              {convertMoney(
                movements && movements.periodBalance
                  ? movements.periodBalance
                  : 0
              )}
            </p>
          </div>
        </div>
        <div>
          <Label
            data={{
              ...labelInit,
              title:
                movements && movements.periodType
                  ? convertPeriod(movements.periodType)
                  : "",
            }}
          />
        </div>
        <div className="accountdetails-movements">
          <h2 className="headingdetails">Movimientos</h2>
          <div>
            {movements !== null &&
            movements?.cards &&
            movements?.cards.length > 0
              ? movements.cards.map((data, i) => {
                  return (
                    <div className="cardmovement" key={i + "dev"}>
                      <CardMovement
                        key={i}
                        data={data}
                        onBtn={() => {
                          sendInfoTM(window,btnPaymentAccountStatusTag)
                          handleClickPayment(data.code);
                        }}
                      />{" "}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </>
    );
  };

  const handlePrograms = () => {
    return (
      <>
        {handleSelects()}
        {!errorMovements.isError
          ? handleDetails()
          : handleErrorFeedback(errorMovements.msg)}
      </>
    );
  };

  const handleErrorFeedback = (message) => {
    return (
      <div className="accountperioddetailserror">
        <Feedback data={feedbackErrorAccountStatus} text={message} />
      </div>
    );
  };

  return (
    <div className="accountdetails-container">
      <h2 className="headingdetails">Detalles por periodo</h2>
      <p className="textdetails">
        Selecciona el programa y el periodo para ver los detalles de los
        movimientos; se clasifican de la siguiente manera:
      </p>
      <div className="detail-bullets">
        <p className="org-p">
          <span className="org-bullet"></span>Con adeudo
        </p>
        <p className="gr-p">
          <span className="gr-bullet"></span>Pagados
        </p>
        <p className="pr-p">
          <span className="pr-bullet"></span>Por pagar
        </p>
      </div>
      {errorPrograms.isError
        ? handleErrorFeedback(errorPrograms.msg)
        : handlePrograms()}
    </div>
  );
};

export default AccountStatusPeriodDetails;
