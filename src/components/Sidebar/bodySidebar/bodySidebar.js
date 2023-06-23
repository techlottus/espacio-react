import { getImageOfAssetsMark } from "../../../helpers/getImages";
import {
  btnBackSideBartTag,
  detailSideBartTag,
} from "../../../tagging/flows/procedures/SidebarTag";
import { Table } from "../../Table/Table";
import { CardRequest } from "../../Card/CardRequest";
import { setConceptDefault } from "../../../actions/paymentAction";
import { sendInfoTM } from "../../../tagging/services/sendInfoTagManager";
import EmptyState from "../../EmptyState/EmptyState";

export const hanldeTableRequestSidebar = (
  isCheckRequest,
  setIsCheckRequest
) => {
  return (
    <div className="sidebarbodytable">
      <div
        className="iconback"
        onClick={() => {
          setIsCheckRequest({
            valid: false,
            table: {},
          });
          sendInfoTM(window, btnBackSideBartTag, "back");
        }}
      >
        <span className="material-icons">arrow_back</span>
        <span className="back">Atrás</span>
      </div>
      <Table data={isCheckRequest.table} />
    </div>
  );
};

export const hanldeCardRequestSidebar = (
  texts,
  dispatch,
  setIsCheckRequest,
  history,
  cards = [],
) => {
  return (
    <div className="sidebarbodycardrequests">
      {cards && cards.length > 0 ? (
        cards.map((e, i) => {
          return (
            <div className="sidebarbodycardrequest" key={i + "cardrequestdiv"}>
              <CardRequest
                key={i + "cardrequest"}
                data={e?.card}
                label={e?.label}
                isButton={e?.isButton}
                onCard={() => {
                  setIsCheckRequest({
                    valid: true,
                    table: e?.table,
                  });
                  sendInfoTM(window, detailSideBartTag, "detalle_tramite");
                }}
                handleRequest={(event) => {
                  event.stopPropagation();
                  dispatch(setConceptDefault(e?.card?.id));
                  history.push("/payment");
                }}
              />
            </div>
          );
        })
      ) : (
        <EmptyState
          img={getImageOfAssetsMark(texts?.procedures?.images?.emptyFirst)}
          title={texts?.procedures?.emptyRequestInquiry}
        />
      )}
      {}
    </div>
  );
};


export const handleSuccessSidebar = (
  texts,
  isCheckRequest,
  dispatch,
  setIsCheckRequest,
  history,
  cards = [],
  hanldeTableRequest = () => {return},
  hanldeCardRequest = () => {return},
) => {
  return (
    <>
      <div className="sidebarbody">
        {cards.length > 0 ? (
          <div className="sidebarbodytitle">{texts?.sidebar?.sidebartitle}</div>
        ) : (
          ""
        )}
        {!isCheckRequest.valid && cards.length > 0 ? (
          <div className="sidebarbodyimg">
            <img
              src={getImageOfAssetsMark(texts?.sidebar?.images?.searchSidebar)}
              className="imgsidebar"
              alt="img-sidebar"
            />
          </div>
        ) : (
          ""
        )}

        <div className="sidebarbodyitems">
          {isCheckRequest.valid
            ? hanldeTableRequest(isCheckRequest, setIsCheckRequest)
            : hanldeCardRequest(
              texts,
              dispatch,
              setIsCheckRequest,
              history,
              cards
              )}
        </div>
      </div>
    </>
  );
};

export const handleErrorSidebar = (texts, error) => {
  return (
    <>
      <div className="sidebarbody">
        <EmptyState
          img={getImageOfAssetsMark(texts?.procedures?.images?.emptyError)}
          title={error.msg}
        />
      </div>
    </>
  );
};

export const typeSliderbar = {
  procedures: 'procedures',
  helpCenter: 'helpCenter'
}
