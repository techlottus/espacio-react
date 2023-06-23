export const proceduresAcademicHistoryMock = {
  information: {
    phone: "5512345678",
    profile: {
      fullName: "Jorge Hernandez",
      enrollmentNumber: "200029578",
      institute: "UTC DISTANCIA",
      academicLevel: "LICENCIATURA 334",
      program: "ADMINISTRACIÓN DE EMPRESAS",
    },
    optionsCampusDelivery: [
      {
        active: false,
        text: "ATIZAPÁN",
        value: "1",
      },
      {
        active: false,
        text: "CHALCO",
        value: "2",
      },
      {
        active: false,
        text: "COACALCO",
        value: "3",
      },
      {
        active: false,
        text: "CUAUTITLÁN",
        value: "4",
      },
      {
        active: false,
        text: "ECATEPEC",
        value: "5",
      },
      {
        active: false,
        text: "HAVRE",
        value: "6",
      },
      {
        active: false,
        text: "IXTAPALUCA",
        value: "7",
      },
      {
        active: false,
        text: "IZTAPALAPA",
        value: "8",
      },
      {
        active: false,
        text: "LOS REYEZ",
        value: "9",
      },
      {
        active: false,
        text: "NEZA",
        value: "10",
      },
      {
        active: false,
        text: "TOLUCA",
        value: "11",
      },
      {
        active: false,
        text: "TOREO",
        value: "12",
      },
      {
        active: false,
        text: "ZONA ROSA",
        value: "13",
      },
    ],
    optionsTypeDelivery: [
      {
        active: false,
        text: "Entrega en Campus",
        value: "1",
      },
      {
        active: false,
        text: "Únicamente en Formato Digital",
        value: "2",
      },
    ],
  },
  data: {
    selectCampusDelivery: null,
    selectTypeDelivery: "2",
    comments: null,
    phone: "5512345678",
  },
};

export const fileSuccessMock = {
  name: "user.png",
  size: "2.8KB",
  sizeInBytes: 2877,
  type: "png",
  isError: false,
  file: new Blob([""], { type: 'image/png' }),
};
