import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function RHFTextField({ name, label, helperText, validation, required = false, onChange, ...other }) {
    const { control } = useFormContext();

    const rules = {};
    if (required) {
        rules.required = 'This field is required';
    }

    Object.assign(rules, validation);

    const handleChange = (event) => {
        const input = event.target.value;
        let sanitizedInput = input;
        if (onChange) {
            sanitizedInput = onChange(input); // Call the custom onChange function provided by the parent
        }
        return sanitizedInput;
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange: handleChangeField, value }, fieldState: { error } }) => (
                <TextField
                    fullWidth
                    label={label}
                    value={value}
                    onChange={(event) => handleChangeField(handleChange(event))}
                    error={!!error}
                    helperText={error ? error.message : helperText}
                    {...other}
                />
            )}
        />
    )
}

RHFTextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    validation: PropTypes.object, // Object containing additional validation rules
    required: PropTypes.bool,
    onChange: PropTypes.func, // Custom onChange function provided by the parent component
};