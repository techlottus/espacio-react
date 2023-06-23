import axios from "axios";
import env from "../../enviroment/environment";
import { getValuesOfAuth } from "../../helpers/auth";
import { filterEmpty } from "../../helpers/filterEmpty";
import { formatDateComplete } from "../../helpers/formatDate";
import {
  handleErrorGetProcedure,
  handleErrorPostProcedure,
} from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = "";
const urlGetCourses = env.manhattanCourses;
const urlPostEnrollment = env.manhattanEnrollment;

export const getCoursesHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlGetCourses}`;

    headers = {
      ...headers,
      "Service-Id": "espacio-manhattan-api",
      "Service-Name": "Manhattan API",
    };

    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    const {
      subjectsToStudy,
      approvedSubjects,
      failedSubjects,
      subjectsInProgress,
    } = res.data;

    let selectColorItems = [];

    selectColorItems.push({
      title: "Área integral",
      iconArrow: "expand_circle_down",
      list: subjectsToStudy?.integral?.map((item) => {
        return {
          value:
            item?.courseId +
            "-" +
            item?.fullname +
            "-integral-" +
            item?.description,
          text: item?.fullname,
          iconMore: "more_horiz",
          description: item?.description,
          disabled: !item?.active,
          isListTable: true,
          notVisible: true,
        };
      }),
      id: "integral",
      color: "#83B96C",
    });

    let subjects = [];

    subjectsInProgress.forEach((e) => {
      subjects.push({
        code: e?.courseId,
        name: e?.fullname,
      });
    });

    selectColorItems.push({
      title: "Área disciplinar",
      iconArrow: "expand_circle_down",
      list: subjectsToStudy?.disciplinar?.map((item) => {
        return {
          value:
            item?.courseId +
            "-" +
            item?.fullname +
            "-disciplinar-" +
            item?.description,
          text: item?.fullname,
          iconMore: "more_horiz",
          description: item?.description,
          disabled: !item?.active,
          notVisible: true,
        };
      }),
      id: "disciplinar",
      color: "#6286BF",
    });

    selectColorItems.push({
      title: "Área profesional",
      iconArrow: "expand_circle_down",
      list: subjectsToStudy?.profesional?.map((item) => {
        return {
          value:
            item?.courseId +
            "-" +
            item?.fullname +
            "-profesional-" +
            item?.description,
          text: item?.fullname,
          iconMore: "more_horiz",
          description: item?.description,
          disabled: !item?.active,
          notVisible: true,
        };
      }),
      id: "profesional",
      color: "#F6CE52",
    });

    let tableApprove = {
      position: "horizontal",
      size: "medium",
      rows: approvedSubjects.map((e) => {
        let options = [];
        options.push({
          title: e?.fullname,
          id:
            e?.courseId +
            "-" +
            e?.fullname +
            "-fails-" +
            e?.description +
            "-" +
            e?.grade,
          notVisible: false,
        });
        options.push({ title: getDate(e?.timeStarted) });
        options.push({ title: getDate(e?.timeCompleted) });
        options.push({ title: e?.grade });
        options.push({ title: "", icon: "more_horiz" });

        return [...options];
      }),
      headers: [
        { title: "Materia" },
        { title: "Inicio" },
        { title: "Fin" },
        { title: "Calificación" },
        { title: "" },
      ],
      items: [
        {
          id: "Read",
          icon: "help_outline",
          text: "Ver descripción",
        },
      ],
    };

    let tableFails = {
      position: "horizontal",
      size: "medium",
      rows: failedSubjects.map((e) => {
        let options = [];
        options.push({
          title: e?.fullname,
          id:
            e?.courseId +
            "-" +
            e?.fullname +
            "-fails-" +
            e?.description +
            "-" +
            e?.grade,
          notVisible: false,
        });
        options.push({ title: getDate(e?.timeStarted) });
        options.push({ title: getDate(e?.timeCompleted) });
        options.push({ title: e?.grade });
        options.push({ title: "", icon: "more_horiz" });

        return [...options];
      }),
      headers: [
        { title: "Materia" },
        { title: "Inicio" },
        { title: "Fin" },
        { title: "Calificación" },
        { title: "" },
      ],
      items: [
        {
          id: "Add",
          icon: "add_circle",
          text: "Agregar materia",
        },
        {
          id: "Read",
          icon: "help_outline",
          text: "Ver descripción",
        },
      ],
    };

    return {
      ...res.data,
      selectColorItems: {
        items: [...selectColorItems],
        wrapper: false,
      },
      tableApprove,
      tableFails,
      subjects,
    };
  } catch (error) {
    console.log(error);
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};

export const postEnrollmentHttp = async (data) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "espacio-manhattan-api",
      "Service-Name": "Manhattan API",
    };
    const url = `${baseUrl}${urlPostEnrollment}`;

    const { data: res } = await axios({
      method: "post",
      headers,
      url,
      data: {
        subjectsToEnroll: data.map((e) => {
          return {
            idCourse: parseInt(e?.code),
            grade: e?.grade ? parseFloat(e?.grade) : null,
          };
        }),
      },
    });

    return;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};

const getDate = (timestamp) => {
  let date = new Date(timestamp);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};
