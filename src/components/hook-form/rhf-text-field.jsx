import React, { useState, useEffect } from 'react'; // Import useEffect
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export default function RHFTextField({ name, label, helperText, type = 'text', validation, required = false, ...other }) {
    const { control, formState: { errors }, trigger } = useFormContext();
    const [isValidationPending, setIsValidationPending] = useState(false); // State to track validation status
    const [inputValue, setInputValue] = useState(''); // State to track input value

    const rules = {};
    if (required) {
        rules.required = true;
    }

    Object.assign(rules, validation);

    useEffect(() => {
        if (isValidationPending) {
            const timer = setTimeout(async () => {
                await trigger(name); // Trigger validation for the specific field after a delay
                setIsValidationPending(false); // Reset validation status
            }, 300); // Set the delay (in milliseconds) as per your preference
            return () => clearTimeout(timer);
        }
    }, [isValidationPending]);

    const handleChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
        setIsValidationPending(true); // Start validation after a delay
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur } }) => (
                <TextField
                    fullWidth
                    label={label}
                    type={type}
                    value={inputValue}
                    onChange={(event) => {
                        onChange(event);
                        handleChange(event); // Trigger validation after a delay
                    }}
                    onBlur={onBlur}
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name]?.message : helperText}
                    {...other}
                />
            )}
        />
    );
}

RHFTextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number']),
    validation: PropTypes.object,
    required: PropTypes.bool,
};
