const validationName = (input) => {
    // Remove special characters using regular expression
    const sanitizedInput = input.replace(/[^A-Za-z\s]/g, '');
    return sanitizedInput;
};

const validateAddress = (input) => {
    // Remove special characters using regular expression
    const sanitizedInput = input.replace(/[^a-zA-Z0-9,\/\s]/g, '');
    return sanitizedInput;
};


const validateDriverId = (input) => {
    // Remove non-numeric characters using regular expression
    const sanitizedInput = input.replace(/[^0-9]/g, '');
    return sanitizedInput;
};

const validateVehicleNumber = (input) => {
    // Remove non-matching characters using regular expression
    const sanitizedInput = input.replace(/[^A-Z0-9]{3}\d+/g, '');
    return sanitizedInput;
};


export { 
    validationName,
    validateDriverId,
    validateVehicleNumber,
    validateAddress
};
