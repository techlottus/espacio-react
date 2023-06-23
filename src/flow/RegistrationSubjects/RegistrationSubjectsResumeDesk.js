import React, { useEffect, useState } from "react";
import "./RegistrationSubjectsResumeDesk.scss";
import { useDispatch, useSelector } from "react-redux";
import { CardButton } from "../../components/CardButton/CardButton";
import {
  btnConfirmSubjects,
  btnRemoveStudy,
  btnStudy,
  cardAvailableSubject,
  cardButtonSubjects,
} from "../../constants/RegistrationSubjects.constant";
import { CardAvailable } from "../../components/CardAvailable/CardAvailable";
import { Button } from "../../components/Button/Button";
import { setLoading } from "../../actions/loadingAction";
import { moodleRedirect } from "../../helpers/moodle";
import env from "../../enviroment/environment";

const RegistrationSubjectsResumeDesk = React.memo(
  ({
    isMobile = false,
    isShow = false,
    addSubjects = [],
    onNext = () => {},
    onRemove = () => {},
  }) => {
    const { texts } = useSelector((state) => state.texts);
    const [next, setNext] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const dispatch = useDispatch();

    const { data: dataManhttan } = useSelector((state) => state.manhattan);

    useEffect(() => {
      if (dataManhttan?.subjects) {
        setSubjects([...dataManhttan?.subjects]);
      }
    }, [dataManhttan?.subjects]);

    useEffect(() => {
      if (next) {
        onNext();
        setNext(false);
      }
    }, [next]);

    return (
      <>
        <div
          className={`registrationsubjectsresumedesk ${
            isMobile && "-ismobile"
          }`}
        >
          <div className="registrationsubjectsresumetitle">
            {texts?.registrationSubjects?.titleResumeSubjects}
          </div>
          {subjects.map((e) => {
            return (
              <div className="registrationsubjectscards">
                <CardButton
                  data={{
                    ...cardButtonSubjects,
                    title: e?.name,
                  }}
                  dataButton={{
                    ...btnStudy,
                  }}
                  onBtn={() => {
                    dispatch(setLoading(true));
                    moodleRedirect()
                      .then((res) => {
                        dispatch(setLoading(false));
                        window.open(res); // cambiar windows.location.href
                      })
                      .catch((error) => {
                        dispatch(setLoading(false));
                        window.open(env.redirectClassroom, "_blank");
                      });
                  }}
                />
              </div>
            );
          })}
          {addSubjects.map((e) => {
            return (
              <div className="registrationsubjectscards">
                <CardButton
                  data={{
                    ...cardButtonSubjects,
                    title: e?.name,
                  }}
                  dataButton={{
                    ...btnRemoveStudy,
                  }}
                  onBtn={() => {
                    onRemove(e?.code);
                  }}
                />
              </div>
            );
          })}
          {[...Array(2 - (subjects.length + addSubjects.length)).keys()].map(
            () => {
              return (
                <div className="registrationsubjectscards">
                  <CardAvailable data={cardAvailableSubject} />
                </div>
              );
            }
          )}

          <div className="registrationsubjectscardtext">
            {subjects.length} de 2 materias agregadas
          </div>
          <div className="registrationsubjectsconfirmbtn">
            <Button
              data={{
                ...btnConfirmSubjects,
                disabled: addSubjects.length === 0,
              }}
              onClick={() => {
                setNext(true);
              }}
            />
          </div>
        </div>
      </>
    );
  }
);

export default RegistrationSubjectsResumeDesk;
