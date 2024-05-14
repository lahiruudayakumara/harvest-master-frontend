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
    const sanitizedInput = input.replace(/\D/g, '');
    // Limit to 10 digits
    return sanitizedInput.slice(0, 10);
};

const validateVehicleNo = (input) => {
    // Remove characters other than A-Z, 0-9, and hyphen
    const sanitizedInput = input.replace(/[^A-Z0-9-\s]/g, '');

    // Remove leading hyphens
    const inputWithoutLeadingHyphens = sanitizedInput.replace(/^(-{1,3})/, '');

    // Remove leading numbers
    const inputWithoutLeadingNumbers = inputWithoutLeadingHyphens.replace(/^(\d{1,3})/, '');

    // Limit the input to a maximum of 3 consecutive capital letters
    const truncatedInput = inputWithoutLeadingNumbers.replace(/([A-Z]{3})[A-Z]*/g, '$1');

    // Format the input with a hyphen after every four digits
    // Ensure that there are at most four consecutive digits in the input
    const formattedInput = truncatedInput.replace(/(\d{4})\d*/g, '$1');

    // Ensure that only numbers can be input after a hyphen
    const finalInput = formattedInput.replace(/-(?=[^\d]*\d)/g, '-');

    // Block characters after the hyphen
    const blockedCharacters = finalInput.replace(/-(\D+)/g, '-');

    return blockedCharacters;
}


export {
    validationName,
    validateDriverId,
    validateVehicleNo,
    validateAddress
};
