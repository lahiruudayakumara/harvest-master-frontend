function getDistrictFromPostalCode(postalCode) {
  // Extract the first two digits of the postal code
  const districtCode = postalCode.substring(0, 2);

  switch (districtCode) {
    case "00":
      return "Colombo";
    case "11":
      return "Gampaha";
    case "12":
      return "Kalutara";
    case "20":
      return "Kandy";
    case "21":
      return "Matale";
    case "22":
      return "Nuwaraeliya";
    case "30":
      return "Batticaloa";
    case "31":
      return "Trincomalee";
    case "32":
      return "Ampara";
    case "40":
      return "Jaffna";
    case "41":
      return "Mannar";
    case "42":
      return "Mullaitivu";
    case "43":
      return "Vavuniya";
    case "50":
      return "Anuradhapura";
    case "51":
      return "Polonnaruwa";
    case "60":
      return "Kurunegala";
    case "61":
      return "Puttalam";
    case "70":
      return "Ratnapura";
    case "71":
      return "Kegalle";
    case "80":
      return "Galle";
    case "81":
      return "Matara";
    case "82":
      return "Hambantota";
    case "90":
      return "Badulla";
    case "91":
      return "Monaragala";
    default:
      return "District not found";
  }
}


export default getDistrictFromPostalCode;