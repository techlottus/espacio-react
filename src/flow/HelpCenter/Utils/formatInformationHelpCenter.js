import { getFormatDateHelpCenter } from "../../../helpers/formatDate";
import { store } from "../../../store/store";
import { helpCenterText } from "../../../texts/helpCenterText";

const { texts } = store.getState().texts;

export const formatInfoModalAcademicActivitiesHelpCenter = (info, data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.issue +
      info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0]
        .label
  );
  formatInfo.push(helpCenterText.modalHelpCenter.assignment + data.assignment);
  formatInfo.push(helpCenterText.modalHelpCenter.professor + data.professor);
  formatInfo.push(
    helpCenterText.modalHelpCenter.ades +
      info.optionsAdesSelect.filter(
        (e) => e.value === data.selectAdesRequest
      )[0].text
  );
  formatInfo.push(helpCenterText.modalHelpCenter.activity + data.activity);
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );
  return formatInfo;
};

export const formatInfoModalProfessorsFeedbackHelpCenter = (info, data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.issue +
      info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0]
        .label
  );
  formatInfo.push(helpCenterText.modalHelpCenter.assignment + data.assignment);
  formatInfo.push(helpCenterText.modalHelpCenter.professor + data.professor);
  formatInfo.push(
    helpCenterText.modalHelpCenter.ades +
      info.optionsAdesSelect.filter(
        (e) => e.value === data.selectAdesRequest
      )[0].text
  );
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );
  return formatInfo;
};

export const formatInfoModalVirtualContentHelpCenter = (info, data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.issue +
      info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0]
        .label
  );
  formatInfo.push(helpCenterText.modalHelpCenter.assignment + data.assignment);
  formatInfo.push(helpCenterText.modalHelpCenter.activity + data.activity);
  formatInfo.push(
    helpCenterText.modalHelpCenter.assignmentToReport + data.reportedAssignment
  );
  formatInfo.push(
    helpCenterText.modalHelpCenter.ades +
      info.optionsAdesSelect.filter(
        (e) => e.value === data.selectAdesRequest
      )[0].text
  );
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );

  return formatInfo;
};

export const formatInfoModalPaymentClarificationHelpCenter = (info, data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.issue +
      info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0]
        .label
  );
  formatInfo.push(
    helpCenterText.modalHelpCenter.ades +
      info.optionsAdesSelect.filter(
        (e) => e.value === data.selectAdesRequest
      )[0].text
  );
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );

  return formatInfo;
};

export const formatInfoModalRegistrationSubjectsHelpCenter = (info, data) => {
  let formatInfo = [];

  formatInfo.push(
    helpCenterText.modalHelpCenter.issue +
      info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0]
        .label
  );

  formatInfo.push(
    helpCenterText.modalHelpCenter.ades +
      info.optionsAdesSelect.filter(
        (e) => e.value === data.selectAdesRequest
      )[0].text
  );

  if (data?.paymentDate) {
    formatInfo.push(
      helpCenterText.modalHelpCenter.paymentDate + getFormatDateHelpCenter(data?.paymentDate)
    );
  }

  if (data?.paymentMount) {
    formatInfo.push(
      helpCenterText.modalHelpCenter.paymentMount + data?.paymentMount
    );
  }

  if (data?.paymentMethod) {
    formatInfo.push(
      helpCenterText.modalHelpCenter.paymentMethod + data?.paymentMethod
    );
  }

  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );

  return formatInfo;
};

export const formatInfoModalTechnicalLibraryAndCollectionsHelpCenter = (
  info,
  data
) => {
  let formatInfo = [];

  formatInfo.push(
    helpCenterText.modalHelpCenter.issue +
      info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0]
        .label
  );

  formatInfo.push(helpCenterText.modalHelpCenter.assignment + data?.subject);
  formatInfo.push(helpCenterText.modalHelpCenter.professor + data?.teacher);
  formatInfo.push(helpCenterText.modalHelpCenter.activity + data?.activity);
  formatInfo.push(helpCenterText.modalHelpCenter.ades + info.optionsAdesSelect.filter((e) => e.value === data.selectAdesRequest)[0].text);

  if (data.description) {
    formatInfo.push(
      helpCenterText.modalHelpCenter.description + data.description
    );
  }

  return formatInfo;
};
export const formatInfoModalDoubtsOnlinceClassesHelpCenter = (info, data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.issue +
      info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0]
        .label
  );
  formatInfo.push(helpCenterText.modalHelpCenter.assignment + data.assignment);
  formatInfo.push(helpCenterText.modalHelpCenter.professor + data.professor);
  formatInfo.push(helpCenterText.modalHelpCenter.classDate + getFormatDateHelpCenter(data.classDate));
  formatInfo.push(
    helpCenterText.modalHelpCenter.ades +
      info.optionsAdesSelect.filter(
        (e) => e.value === data.selectAdesRequest
      )[0].text
  );
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );
  return formatInfo;
};

export const formatInfoModalExtensionRequestHelpCenter = (info, data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.issue +
      info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0]
        .label
  );
  formatInfo.push(helpCenterText.modalHelpCenter.assignment + data.assignment);
  formatInfo.push(helpCenterText.modalHelpCenter.professor + data.professor);
  formatInfo.push(
    helpCenterText.modalHelpCenter.ades +
      info.optionsAdesSelect.filter(
        (e) => e.value === data.selectAdesRequest
      )[0].text
  );
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );
  return formatInfo;
};

export const formatInfoModalGradesClarificationHelpCenter = (info, data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.issue +
      info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0]
        .label
  );
  formatInfo.push(helpCenterText.modalHelpCenter.assignment + data.assignment);
  formatInfo.push(helpCenterText.modalHelpCenter.professor + data.professor);
  formatInfo.push(
    helpCenterText.modalHelpCenter.ades +
      info.optionsAdesSelect.filter(
        (e) => e.value === data.selectAdesRequest
      )[0].text
  );
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );
  return formatInfo;
};

export const formatInfoModalSupportSchoolHelpCenter = (data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );
  return formatInfo;
};

export const formatInfoModalOtherAreasHelpCenter = (info, data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.issue + info.optionsCheckboxes.filter((e) => e.name === data.selectCheckboxes)[0].label
  );
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );

  return formatInfo
};

export const formatInfoModalContactAnAdvisorHelpCenter = (data) => {
  let formatInfo = [];
  formatInfo.push(
    helpCenterText.modalHelpCenter.description + data.description
  );
  return formatInfo;
};
