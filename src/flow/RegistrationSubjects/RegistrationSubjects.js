import React, { useEffect, useState } from "react";
import "./RegistrationSubjects.scss";
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  btnEmptySubjects,
  btnManualDownload,
  btnPlayVideo,
  feedbackSubjects,
  selectSubjects,
  tabsSubjects,
} from "../../constants/RegistrationSubjects.constant";
import { Button } from "../../components/Button/Button";
import { Tabs } from "../../components/Tabs/Tabs";
import RegistrationSubjectsStickResume from "./RegistrationSubjectsStickResume";
import RegistrationSubjectsResumeDesk from "./RegistrationSubjectsResumeDesk";
import { SelectColor } from "../../components/SelectColor/SelectColor";
import { Feedback } from "../../components/Feedback/Feedback";
import {
  getCoursesService,
  postEnrollmentService,
} from "../../middlewares/manhattanMiddleware";
import { Table } from "../../components/Table/Table";
import { ModalList } from "../../components/Modal/ModalList/ModalList";
import { ModalInformation } from "../../components/Modal/ModalInformation/ModalInformation";
import { ModalNoSubjects } from "../../components/Modal/ModalNoSubjects/ModalNoSubjects";
import { TableManhattan } from "../../components/Table/TableManhattan";
import EmptyState from "../../components/EmptyState/EmptyState";
import { getImageOfAssetsMark } from "../../helpers/getImages";
import env from "../../enviroment/environment";
import { downloadFile } from "../../helpers/download";
import { notiObs } from "../../observables/notificationObs";
import { typesNoti } from "../../types/typeNoti";

const RegistrationSubjects = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { texts } = useSelector((state) => state.texts);
  const [tabs, setTabs] = useState({
    ...tabsSubjects,
  });
  const { data: dataManhttan } = useSelector((state) => state.manhattan);
  const [focus, setFocus] = useState("1");
  const [isShowFeedback, setIsShowFeedback] = useState(false);
  const [selectColorItems, setSelectColorItems] = useState({
    ...selectSubjects,
  });

  const [tableApprove, setTableApprove] = useState({});

  const [tableFails, setTableFails] = useState({});

  const [subjectAdd, setSubjectAdd] = useState([]);

  const [isModalList, setIsModalList] = useState(false);

  const [isModalInfo, setIsModalInfo] = useState({
    valid: false,
    title: "",
    description: "",
  });

  const [reload, setReload] = useState(false);

  const [subjectsInProgress, setSubjectsInProgress] = useState([]);

  const [isModalNoSubjects, setIsModalNoSubjects] = useState(false);

  const handleFailedEmpty = () => {
    return (
      <>
        <EmptyState
          img={getImageOfAssetsMark(
            texts?.registrationSubjects?.images?.failedEmpty
          )}
          title={texts?.registrationSubjects?.emptyMessage?.failed}
        />
      </>
    );
  };

  const handleApprovedEmpty = () => {
    return (
      <>
        <EmptyState
          img={getImageOfAssetsMark(
            texts?.registrationSubjects?.images?.approvedEmpty
          )}
          title={texts?.registrationSubjects?.emptyMessage?.approved}
        />
      </>
    );
  };

  const handleEmpty = () => {
    return (
      <>
        <EmptyState
          img={getImageOfAssetsMark(
            texts?.registrationSubjects?.images?.emptyError
          )}
          title={texts?.registrationSubjects?.emptyMessage?.emptyError}
          button={btnEmptySubjects}
          action={() => {
            history.goBack();
          }}
        />
      </>
    );
  };

  useEffect(() => {
    if (reload) {
      dispatch(getCoursesService());
      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    dispatch(getCoursesService());
  }, []);

  useEffect(() => {
    if (dataManhttan?.selectColorItems) {
      setSelectColorItems({ ...dataManhttan?.selectColorItems });
    }
  }, [dataManhttan?.selectColorItems]);

  useEffect(() => {
    if (dataManhttan?.tableFails) {
      setTableFails({ ...dataManhttan?.tableFails });
    }
  }, [dataManhttan?.tableFails]);

  useEffect(() => {
    if (dataManhttan?.subjects) {
      setSubjectsInProgress([...dataManhttan?.subjects]);
    }
  }, [dataManhttan?.subjects]);

  useEffect(() => {
    if (dataManhttan?.tableApprove) {
      setTableApprove({ ...dataManhttan?.tableApprove });
    }
  }, [dataManhttan?.tableApprove]);

  const reviewOptionsTabs = (
    focus,
    optionsSelect,
    tableApproveItems,
    tableFailsItems
  ) => {
    switch (focus) {
      case "1":
        return (
          <SelectColor
            data={optionsSelect}
            onClickAdd={(value) => {
              let values = value.detail?.id.split("-");
              setSubjectsInProgress((valueProgress) => {
                if (valueProgress.length !== 2) {
                  setSubjectAdd((valueAdd) => {
                    let op = [...valueAdd];
                    let valid = op.find((e) => {
                      return e?.code === values[0];
                    });
                    if (!valid && valueProgress.length + valueAdd.length != 2) {
                      op.push({
                        code: values[0],
                        name: values[1],
                        type: values[2],
                        grade: null,
                      });
                    }
                    return [...op];
                  });
                  setSelectColorItems((select) => {
                    let itemNew = select.items.map((e) => {
                      return {
                        ...e,
                        list: e.list.map((e) => {
                          return {
                            ...e,
                            notVisible: e?.value !== value?.detail?.id,
                          };
                        }),
                      };
                    });
                    return {
                      items: itemNew,
                      wrapper: false,
                    };
                  });
                }

                return [...valueProgress];
              });
            }}
            onClickRead={(value) => {
              let words = value?.detail?.id.split("-");
              setIsModalInfo({
                valid: true,
                title: words[1],
                description: words[3],
              });
            }}
          />
        );
      case "2":
        return tableFailsItems && tableFailsItems?.rows?.length > 0 ? (
          <TableManhattan
            data={tableFails}
            onClickAdd={(value) => {
              let values = value.detail?.id.split("-");
              setSubjectsInProgress((valueProgress) => {
                if (valueProgress.length !== 2) {
                  setSubjectAdd((valueAdd) => {
                    let op = [...valueAdd];
                    let valid = op.find((e) => {
                      return e?.code === values[0];
                    });
                    if (!valid && valueProgress.length + valueAdd.length != 2) {
                      op.push({
                        code: values[0],
                        name: values[1],
                        type: values[2],
                        grade: values[4],
                      });
                      setTableFails((valuesFails) => {
                        let op = [...valuesFails.rows];
                        let newRows = op.map((e) => {
                          if (e[0]?.id === value.detail?.id) {
                            let optionOne = e[0];
                            optionOne = {
                              ...optionOne,
                              notVisible: true,
                            };
                            e[0] = {
                              ...optionOne,
                            };
                          }

                          return {
                            ...e,
                          };
                        });

                        return {
                          ...valuesFails,
                        };
                      });
                    }

                    return [...op];
                  });
                }

                return [...valueProgress];
              });
            }}
            onClickRead={(value) => {
              let words = value?.detail?.id.split("-");
              setIsModalInfo({
                valid: true,
                title: words[1],
                description: words[3],
              });
            }}
          />
        ) : (
          handleFailedEmpty()
        );
      case "3":
        return tableApproveItems && tableApproveItems?.rows?.length > 0 ? (
          <TableManhattan
            data={tableApprove}
            onClickAdd={(value) => {}}
            onClickRead={(value) => {
              let words = value?.detail?.id.split("-");
              setIsModalInfo({
                valid: true,
                title: words[1],
                description: words[3],
              });
            }}
          />
        ) : (
          handleApprovedEmpty()
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <HeaderApp />
      <div className="registrationsubjects-container">
        <div className="registrationsubjectstages">
          <div className="registrationsubjectstitle">
            {texts?.registrationSubjects?.title}
          </div>
          <div className="registrationsubjectswrapper">
            {/* <div className="registrationsubjectssubtitle">
              Tu plan tiene vigencia hasta el 31 de marzo
            </div> */}
            <div className="registrationsubjectsbtnwrapper">
              <div className="registrationsubjectsbtn">
                <Button
                  data={btnManualDownload}
                  onClick={() => {
                    downloadFile(
                      "manual-ATR.pdf",
                      `${env.contentAssets}docs/manual-atr/utc/Manual-ATR.pdf`
                    )
                      .then(() => {
                        notiObs.next({
                          type: typesNoti.success,
                          text: texts.procedures.downloadPDFSuccess,
                        });
                      })
                      .catch(() => {
                        notiObs.next({
                          type: typesNoti.error,
                          text: texts.procedures.downloadPDFError,
                        });
                      });
                  }}
                />
              </div>
              {/* <div className="registrationsubjectsbtn">
                <Button
                  data={btnPlayVideo}
                  onClick={() => {
                    "";
                  }}
                />
              </div>*/}
            </div>
          </div> 
          <div>
            <Tabs
              data={tabsSubjects}
              onTap={(value) => {
                setTabs({
                  ...tabsSubjects,
                  focus: value?.detail,
                });
                setFocus(value.detail);
              }}
            />
          </div>
          {/* {handleEmpty()} */}
          <div className="registrationsubjectscontent">
            <p className="registrationsubjectstext">
              {texts?.registrationSubjects?.textSubjectTable}
              <span
                className="material-icons icontable"
                onClick={() => {
                  setIsShowFeedback(true);
                }}
              >
                {texts?.registrationSubjects?.iconTable}
              </span>
            </p>
            <div className="registrationsubjectsfeedback">
              {isShowFeedback ? (
                <Feedback
                  isNoti={true}
                  data={{
                    ...feedbackSubjects,
                    left: {
                      name: "info",
                      status: "normal",
                    },
                    right: {
                      name: "close",
                    },
                  }}
                  text={
                    "Las materias están ordenadas de acuerdo con la recomendación de la academia de la universidad pero siempre puedes elegir tu propia ruta."
                  }
                  html={() => {
                    return;
                  }}
                  onRight={() => {
                    setIsShowFeedback(false);
                  }}
                />
              ) : null}
            </div>
            <div>
              {reviewOptionsTabs(
                focus,
                selectColorItems,
                tableApprove,
                tableFails
              )}
            </div>
          </div>

          <div className="registrationsubjectsresume">
            <RegistrationSubjectsResumeDesk
              addSubjects={subjectAdd}
              onNext={() => {
                setIsModalList(true);
              }}
              onRemove={(code) => {
                setSubjectAdd((value) => {
                  let options = value.filter((e) => {
                    return e?.code != code;
                  });
                  return options;
                });

                setTableFails((valuesFails) => {
                  let op = [...valuesFails.rows];
                  let newRows = op.map((e) => {
                    let failsWords = e[0]?.id.split("-");
                    if (failsWords[0] === code) {
                      let optionOne = e[0];
                      optionOne = {
                        ...optionOne,
                        notVisible: false,
                      };
                      e[0] = {
                        ...optionOne,
                      };
                    }

                    return {
                      ...e,
                    };
                  });
                  return {
                    ...valuesFails,
                  };
                });

                setSelectColorItems((select) => {
                  let itemNew = select.items.map((e) => {
                    return {
                      ...e,
                      list: e.list.map((e) => {
                        let words = e?.value.split("-");
                        return {
                          ...e,
                          notVisible: !!e?.notVisible
                            ? e?.notVisible
                            : words[0] == code,
                        };
                      }),
                    };
                  });
                  return {
                    items: itemNew,
                    wrapper: false,
                  };
                });
              }}
            />
          </div>
        </div>
        <RegistrationSubjectsStickResume
          addSubjects={subjectAdd}
          onNext={() => {
            setIsModalList(true);
          }}
          onRemove={(code) => {
            setSubjectAdd((value) => {
              let options = value.filter((e) => {
                return e?.code != code;
              });
              return options;
            });

            setTableFails((valuesFails) => {
              let op = [...valuesFails.rows];
              let newRows = op.map((e) => {
                let failsWords = e[0]?.id.split("-");
                if (failsWords[0] === code) {
                  let optionOne = e[0];
                  optionOne = {
                    ...optionOne,
                    notVisible: false,
                  };
                  e[0] = {
                    ...optionOne,
                  };
                }

                return {
                  ...e,
                };
              });

              return {
                ...valuesFails,
              };
            });

            setSelectColorItems((select) => {
              let itemNew = select.items.map((e) => {
                return {
                  ...e,
                  list: e.list.map((e) => {
                    let words = e?.value.split("-");
                    return {
                      ...e,
                      notVisible: !!e?.notVisible
                        ? e?.notVisible
                        : words[0] == code,
                    };
                  }),
                };
              });
              return {
                items: itemNew,
                wrapper: false,
              };
            });
          }}
        />
      </div>
      <ModalList
        isShow={isModalList}
        subjects={subjectAdd}
        outside={() => {
          setIsModalList(false);
        }}
        onClose={() => {
          setIsModalList(false);
        }}
        onNext={() => {
          setIsModalList(false);
          dispatch(postEnrollmentService(subjectAdd, setSubjectAdd, setReload));
        }}
      />
      <ModalInformation
        isShow={isModalInfo.valid}
        title={isModalInfo.title}
        description={isModalInfo.description}
        outside={() => {
          setIsModalInfo({
            description: "",
            title: "",
            valid: false,
          });
        }}
        onClose={() => {
          setIsModalInfo({
            description: "",
            title: "",
            valid: false,
          });
        }}
      />
      <ModalNoSubjects
        isShow={isModalNoSubjects}
        outside={() => {
          setIsModalNoSubjects(false);
        }}
        onClose={() => {
          setIsModalNoSubjects(false);
        }}
      />
      ;
    </>
  );
};

export default RegistrationSubjects;
