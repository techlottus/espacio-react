import React from "react";
import { linkTerms, termsContent } from "../../../constants/Terms.constant";
import "../TermsPublic.scss";
import { Link } from "../../../components/Link/Link";
import { downloadFile } from "../../../helpers/download";
import env from "../../../enviroment/environment";
import { typesNoti } from "../../../types/typeNoti";
import { useSelector } from "react-redux";
import { notiObs } from "../../../observables/notificationObs";

const TermsPub = () => {
  const { texts } = useSelector(state => state.texts);

  return (
    <div className="terms-public-page-container">
      <div className="terms-content">
        <h2 className="termshow-title">{termsContent.title}</h2>
        {termsContent.contents.map((content, i) => {
          return (
            <div className="terms-map" key={i}>
              <h3 className="termshow-subtitle">{content.subtitle}</h3>
              <div
                className="termshow-texts"
                dangerouslySetInnerHTML={{ __html: content.text }}
              ></div>
            </div>
          );
        })}
      </div>
      {/* <div className="download-wrapper">
        <Link 
        data={linkTerms} 
        onClick={() => {
          downloadFile(
            "solicitud-procedimiento-de-notificación-y-retirada.pdf",
            `${env.contentAssets}docs/terminos/solicitud-procedimiento-de-notificación-y-retirada.pdf`
          )
            .then(() => {
              notiObs.next({
                type: typesNoti.success,
                text: texts?.terms.downloadTerms.downloadTermsSuccess,
              });
            })
            .catch(() => {
              notiObs.next({
                type: typesNoti.error,
                text: texts?.terms.downloadTerms.downloadTermsError,
              });
            });
          }}
        />
      </div> */}
    </div>
  );
};

export default TermsPub;
