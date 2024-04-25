import PropTypes from 'prop-types';
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function RHFTextField({ name, label, helperText, type = 'text', validation, required = false, ...other }) {
    const { control } = useFormContext();

    const rules = {};
    if (required) {
        rules.required = true;
    }

    Object.assign(rules, validation);

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    fullWidth
                    label={label}
                    type={type}
                    value={type === 'number' && (value === '' || value === null) ? '' : value}
                    onChange={(event) => {
                        if (type === 'number') {
                            onChange(Number(event.target.value) || null);
                        } else {
                            onChange(event.target.value);
                        }
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
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
    type: PropTypes.oneOf(['text', 'number']),
    validation: PropTypes.object,
    required: PropTypes.bool,
};