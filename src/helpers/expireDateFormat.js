export const expireDateFormat = (expireDate) => {
  let formattedExpireDate = expireDate.split(/(..)/g).filter((s) => s);
  const exp_month = parseInt(formattedExpireDate[0]) 
  const exp_year = parseInt(`20${formattedExpireDate[1]}`);
  return {
      exp_month,
      exp_year
  }
};
