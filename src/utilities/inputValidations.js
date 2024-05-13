const validationName = (input) => {
    // Remove special characters using regular expression
    const sanitizedInput = input.replace(/[^A-Za-z\s]/g, '');
    return sanitizedInput;
};

const validateAddress = (input) => {
    // Remove special characters using regular expression
    const sanitizedInput = input.replace(/[^a-zA-Z0-9,.\/\s]/g, '');
    return sanitizedInput;
};


const validateDriverId = (input) => {
    // Remove non-numeric characters using regular expression
    const sanitizedInput = input.replace(/[^0-9]|^.{11,}$/, '');
    return sanitizedInput;
};

const validateVehicleNumber = (input) => {
    // Sanitize the input to allow Block letters, numbers, and hyphens only
    const sanitizedInput = input.replace(/^[A-Z]{3}-\d{4}$/, '');
    return sanitizedInput;
};


export {
    validationName,
    validateDriverId,
    validateVehicleNumber,
    validateAddress
};
