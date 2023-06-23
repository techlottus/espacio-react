import { texts } from "../texts/indexText";

export const sidebar = {
  sidebartitle: texts.sidebar.sidebartitle,
  searchImg: texts.sidebar.searchImg,
};

export const cardIconSideBar = {
  icon: texts.sidebar.iconSidebar,
  titlesidebar: texts.sidebar.titleSidebar,
  disabled: false,
  isContent: true,
};

export const labelSidebar = {
  id: "",
  type: "outlined",
  title: texts.sidebar.labelSidebar,
  icon: "",
  iconEvent: "",
  size: "medium",
  disabled: false,
};

export const btnSidebar = {
  type: "outlined",
  title: texts.sidebar.buttonSidebar,
  size: "small",
  icon: "",
  lyIcon: false,
  disabled: false,
  isExpand: false,
};

export const SidebarTable = {
  position: "vertical",
  size: "medium",
  hover: false,
  headers: [
    { title: texts.sidebar.tableSidebar[0].title },
    { title: texts.sidebar.tableSidebar[1].title },
    { title: texts.sidebar.tableSidebar[2].title },
    { title: texts.sidebar.tableSidebar[3].title },
    { title: texts.sidebar.tableSidebar[4].title },
    { title: texts.sidebar.tableSidebar[5].title },
    { title: texts.sidebar.tableSidebar[6].title },
    { title: texts.sidebar.tableSidebar[7].title },
  ],
  rows: [
    [
      { title: texts.sidebar.tableContentSidebar[0].title },
      { title: texts.sidebar.tableContentSidebar[1].title },
      { title: texts.sidebar.tableContentSidebar[2].title },
      { title: texts.sidebar.tableContentSidebar[3].title },
      { title: texts.sidebar.tableContentSidebar[4].title },
      { title: texts.sidebar.tableContentSidebar[5].title },
      { title: texts.sidebar.tableContentSidebar[6].title },
      { title: texts.sidebar.tableContentSidebar[7].title },
    ],
  ],
};
