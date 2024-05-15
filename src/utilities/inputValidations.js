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
const validateVehicleNumber = (input) => {
    // Sanitize the input to allow Block letters, numbers, and hyphens only
    const sanitizedInput = input.replace(/^[A-Z]{3}-\d{4}$/, '');
    return sanitizedInput;
};


const validateBankAccountNumber = (accountNumber) => {
    const sanitizedAccountNumber = accountNumber.replace(/\D/g, '');
    const limitedAccountNumber = sanitizedAccountNumber.slice(0, 12);
    return limitedAccountNumber;
}

const validatePrice = (input) => {
    // Regular expression to match a valid price format
    const sanitizedAmmount = input.replace(/[^0-9.\s]/g, '');
    const inputWithoutLeadingDots = sanitizedAmmount.replace(/^\.+/, '');

    const truncatedInput = inputWithoutLeadingDots.replace(/([0-9]{7})[0-9-Z]*/g, '$1');

    const formattedInput = truncatedInput.replace(/(\.{2})\d*/g, '$1');

    const finalInput = formattedInput.replace(/\.(?![0-9]{0,2})/g, '');

    return finalInput;
};



export {
    validationName,
    validateDriverId,
    validateVehicleNo,
    validateAddress
    validateVehicleNumber,
    validateAddress,
    validateBankAccountNumber,
    validatePrice
};
