export const formatString = (str) => {
  try {
    let textLowerCase = str.toLowerCase();
    return textLowerCase.charAt(0).toUpperCase() + textLowerCase.slice(1);
  } catch (error) {
    return str;
  }
};

export const capitalize = (input) => {
  try {
    var words = input.split(' ');  
    var capitalizedWords = [];  
    words.forEach(element => {  
        capitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
    });  
    return capitalizedWords.join(' ');  
  } catch(e) {
    return input;
  }
  
} 
