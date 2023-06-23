
export const filterEmpty = (data) => {
  let newData = {};
  Object.entries(data).forEach((value) => {
    if(value[1] !== null) {
      newData[value[0]] = value[1];
    }
  })
  return newData;
} 