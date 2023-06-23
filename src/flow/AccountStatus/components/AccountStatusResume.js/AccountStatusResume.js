import React, { useEffect, useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import {
  cardProfile,
  checkInvoiceBtn,
  downloadBtn,
} from "../../../../constants/AccountStatus.constant";
import "./AccountStatusResume.scss";
import { Button } from "../../../../components/Button/Button";
import AccountStatusTable from "../AccountStatusTable/AccountStatusTable";
import { useDispatch, useSelector } from "react-redux";
import { capitalize, formatString } from "../../../../helpers/formatString";
import { getAccountReportService } from "../../../../middlewares/accountStatusMiddleware";
import { typesRequestErrors } from "../../../../constants/error.constant";
import ScreenEmpty from "../../../Screens/ScreenAccountStatus/ScreenEmptyAccountStatus";
import { notiObs } from "../../../../observables/notificationObs";
import { typesNoti } from "../../../../types/typeNoti";
import { useHistory } from "react-router";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import { buttonDownloadAccountStatusTag } from "../../../../tagging/flows/accountStatusTag";
import { getImageOfAssets } from "../../../../helpers/getImages";

const AccountStatusResume = () => {
  const history = useHistory();

  const { texts } = useSelector((state) => state.texts);
  const [downloadButton] = useState({
    ...downloadBtn,
    isExpand: window.innerWidth < 991,
  });

  const [checkButton] = useState({
    ...checkInvoiceBtn,
    isExpand: window.innerWidth < 991,
  });

  const [next, setNext] = useState(false);

  const [profile, setProfile] = useState({
    ...cardProfile,
    image: getImageOfAssets(texts?.accountStatus?.images?.user)
  });

  const accountStatus = useSelector((state) => state.accountStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (accountStatus.profile !== null)
      setProfile((state) => {
        return {
          ...state,
          name: capitalize(accountStatus.profile.fullName),
          items: [
            formatString(accountStatus.profile.enrollmentNumber),
            formatString(accountStatus.profile.institute),
            formatString(accountStatus.profile.academicLevel),
            formatString(accountStatus.profile.program),
          ],
        };
      });
  }, [accountStatus.profile]);

  useEffect(() => {
    if (
      accountStatus.errors &&
      accountStatus.errors[typesRequestErrors.getAccountStatus].isError
    ) {
      notiObs.next({
        type: typesNoti.error,
        text: accountStatus.errors[typesRequestErrors.getAccountStatus].msg,
      });
    }
  }, [accountStatus.errors]);

  useEffect(() => {
    if (next) {
      history.push("/account-status-invoices-query");
      setNext(false);
    }
  }, [next]);

  const hanldeResume = () => {
    return accountStatus.debitPeriods !== null ? (
      <>
        {accountStatus.debitPeriods.length === 0 ? (
          <ScreenEmpty />
        ) : (
          <div>
            <div className="accountstatusresumetitle">
              {texts?.accountStatus?.resumeTitle}
            </div>
            <div className="accountstatusresumetable">
              <AccountStatusTable />
            </div>
          </div>
        )}
      </>
    ) : (
      ""
    );
  };

  const handleError = () => {
    return (
      <div className="accountstatuserror">
        {texts?.accountStatus?.errorMessage}
      </div>
    );
  };

  return (
    <>
      <div className="accountstatusresume-container">
        {accountStatus.profile === null || accountStatus.debitPeriods === null
          ? handleError()
          : ""}
        <div className="accountstatusresumeperfil">
          {accountStatus.profile !== null ? <CardProfile data={profile} /> : ""}
        </div>
        {hanldeResume()}
        <div className="accountstatusresumebtn">
          <div className="downloadbtn">
            <Button
              data={downloadButton}
              onClick={() => {
                dispatch(getAccountReportService());
                sendInfoTM(window, buttonDownloadAccountStatusTag);
              }}
            />
          </div>
          <Button
            data={checkButton}
            onClick={() => {
              setNext(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AccountStatusResume;
