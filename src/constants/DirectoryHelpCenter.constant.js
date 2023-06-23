import { texts } from "../texts/indexText";

export const breadcrumbDirectoryHelpCenter = {
  iconColor: "#e14504",
  itemFocusColor: "#e14504",
  textItems: [
    {
      value: "/help-center/dashboard",
      text: "Centro de ayuda",
    },
    {
      value: "/help-center/directory",
      text: "Directorio",
    },
  ],
  icon: "arrow_back",
};

export const cardImageHelpCenterDirectoryInit = {
    path: "",
    id: "",
    allContent: true,
    link: false,
    isShowCardWebsiteContent: true,
    urlImage: "https://images.pexels.com/photos/937483/pexels-photo-937483.jpeg",
    subtitle: "Gerente de Operaciones ULA Online",
    title: "Yazmin Hernández Sanjuan",
    text: "Tel: Tel: 800 00 11 852 opción 2",
    type: "vertical",
}

export const directoryTableOneInit = {
  position: 'horizontal',
  size: 'medium',
  rows: [],
  headers: [
    { title: texts.helpCenter.directory.headerTableCoordinator[0].title },
    { title: texts.helpCenter.directory.headerTableCoordinator[1].title },
    { title: texts.helpCenter.directory.headerTableCoordinator[2].title },
    { title: texts.helpCenter.directory.headerTableCoordinator[3].title },
  ],
  hover: true,
  checkbox: false,
}

export const directoryTableTwoInit = {
  position: 'horizontal',
  size: 'medium',
  rows: [],
  headers: [
    { title: texts.helpCenter.directory.headerTableAdvisor[0].title },
    { title: texts.helpCenter.directory.headerTableAdvisor[1].title },
    { title: texts.helpCenter.directory.headerTableAdvisor[2].title },
  ],
  hover: true,
  checkbox: false,
}


