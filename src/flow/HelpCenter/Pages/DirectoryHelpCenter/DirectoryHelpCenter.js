import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Breadcrumb } from "../../../../components/Breadcrumb/Breadcrumb";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import "./DirectoryHelpCenter.scss";
import {
  breadcrumbDirectoryHelpCenter,
  cardImageHelpCenterDirectoryInit,
  directoryTableOneInit,
  directoryTableTwoInit,
} from "../../../../constants/DirectoryHelpCenter.constant";
import { useContainerHeigh } from "../../../../hooks/contentHeight";
import { Table } from "../../../../components/Table/Table";
import { getDirectoryHelpService } from "../../../../middlewares/helpCenterMiddlewares/directoryHelpMiddleware/directoryHelpMiddleware";
import env from "../../../../enviroment/environment";
import { CardImageDescription } from "../../../../components/Card/CardImageDescription";
import { typesMark } from "../../../../types/typesMark";

const DirectoryHelpCenter = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { texts } = useSelector((state) => state.texts);
  const { height } = useContainerHeigh(0);

  const {
    optionCoordinators,
    optionAdvisors,
    data: dataDirectory,
  } = useSelector((state) => state.helpCenterDirectory);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getDirectoryHelpService());
  }, []);

  const onItem = (e) => {
    if (e.detail === "/help-center/dashboard") {
      history.push(e.detail);
    }
  };

  const onBack = () => {
    history.push("/help-center/dashboard");
  };

  return (
    <>
      <HeaderApp />
      <div
        className="directoryhelpcentercontainer"
        style={{ minHeight: `calc(${height}px - 77px)` }}
      >
        <div className="directoryhelpcentercontent">
          <div>
            <Breadcrumb
              data={breadcrumbDirectoryHelpCenter}
              onItem={onItem}
              onBack={onBack}
            />
          </div>
          <h2 className="directoryhelpcentertitle">
            {texts?.helpCenter?.directory.title}
          </h2>
        </div>
        <div className="directoryhelpcenterwrapper">
          {env.mark === typesMark.utc ? (
            <div className="directoryhelpcentertable">
              <div className="directorytabletitle">
                <h3>{texts?.helpCenter?.directory.tableTitleOne}</h3>
              </div>
              <Table
                data={{
                  ...directoryTableOneInit,
                  rows: [...optionCoordinators],
                }}
              />
            </div>
          ) : (
            <div className="directoryhelpcentercards">
              {optionCoordinators.map((card, i) => {
                return (
                  <div key={i} className="cardwrapper">
                    <CardImageDescription
                      data={{
                        ...cardImageHelpCenterDirectoryInit,
                        urlImage: card.image,
                        subtitle: card.role,
                        title: card.name,
                      }}
                      html={() => {
                        return (
                          <div>
                            <p>{card.phone}</p>
                            <p>{card.email}</p>
                          </div>
                        );
                      }}
                      onClick={() => {
                        history.push(card.path);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {dataDirectory && dataDirectory?.flagAdvisors ? (
            <div className="directoryhelpcentertable">
              <div className="directorytabletitle">
                <h3>{texts?.helpCenter?.directory.tableTitleTwo}</h3>
              </div>
              <Table
                data={{
                  ...directoryTableTwoInit,
                  rows: [...optionAdvisors],
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
      <FooterApp />
    </>
  );
};

export default DirectoryHelpCenter;
