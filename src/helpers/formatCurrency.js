import { FormatMoney } from 'format-money-js';


export const convertMoney = (unit) => {

  const fm = new FormatMoney({
    decimals: 2
  });

  return fm.from(unit,{symbol: '$'});

}