import { setLoading } from "../actions/loadingAction";
import { setCourses } from "../actions/manhattanAction";
import {
  getCoursesHttp,
  postEnrollmentHttp,
} from "../services/manhattan/manhattanService";

export const getCoursesService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getCoursesHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setCourses(res));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
};

export const postEnrollmentService = (data, setSubjectAdd, setReload) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    postEnrollmentHttp(data)
      .then(() => {
        setSubjectAdd([]);
        dispatch(setLoading(false));
        setReload(true);
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
};
