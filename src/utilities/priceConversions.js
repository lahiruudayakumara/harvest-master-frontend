

function splitNumbers(number) {
  var numberString = number.toString();
  var sets = [];
  for (var i = numberString.length; i > 0; i -= 3) {
    var subset = numberString.substring(Math.max(0, i - 3), i);
    sets.unshift(subset);
  }
  return sets.join(" ");
}


export default splitNumbers;