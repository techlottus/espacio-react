export const formatDate = (startDate, endDate) => {
  let startArr = startDate.split("-");
  let endArr = endDate.split("-");

  let months = {
    "01": "Ene",
    "02": "Feb",
    "03": "Mar",
    "04": "Abr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Ago",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dic",
  };

  return (
    startArr[2] +
    " " +
    months[startArr[1]] +
    " - " +
    endArr[2] +
    " " +
    months[endArr[1]] +
    " / " +
    [endArr[0]]
  );
};

export const formatDateComplete = (date) => {
  let dateArr = date.split("-");

  let months = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  };

  return dateArr[2] + " " + months[dateArr[1]] + " " + dateArr[0];
};

export const getFormatDateHelpCenter = (date) => {
  try {
    return `${date[0]}${date[1]}/${date[2]}${date[3]}/${date[4]}${date[5]}${date[6]}${date[7]}`;
  } catch (e) {
    return null;
  }
};
