

//SI standard date format  YYYY-MM-DD
function convertToStandardDate(plantedDate) {
 
  const date = new Date(plantedDate[0], plantedDate[1] - 1, plantedDate[2]);
  
  return date.toISOString().split("T")[0];
}


export default convertToStandardDate;