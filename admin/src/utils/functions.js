const replacePolishLetters = (str) => {
    const polishLetters = {
      'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
      'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
    };
  
    return str.replace(' ','-').replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, match => polishLetters[match]);
  };
  
  // Example usage:
  const originalString = "Chrząszcz brzmi w trzcinie w Szczebrzeszynie";
  const replacedString = replacePolishLetters(originalString);
 // console.log(replacedString); 

  export {replacePolishLetters}