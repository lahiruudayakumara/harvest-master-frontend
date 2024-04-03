import PropTypes from 'prop-types';
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form"

export default function RHFTextField ({ name, helperText, type, ...other }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    type={type}
                    value={type === 'number' && field.value === 0 ? '' : field.value}
                    onChange={(event) => {
                        if (type === 'number') {
                            field.onChange(Number(event.target.value));
                        } else {
                            field.onChange(event.target.value);
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

RHFTextField.PropTypes = {
    helperText: PropTypes.object,
    name: PropTypes.string,
    type: PropTypes.string,
  };



