import { Alert, Box, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';




export const NewPaymentForm = () => {
    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={true}
            PaperProps={{
                sx: { maxWidth: 720 },
            }}
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <DialogTitle>Add New Tenant</DialogTitle>
                <DialogContent>
                    <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
                        Add New Payment
                    </Alert>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField name="fname" label="First Name" />
                    </Box>
                </DialogContent>
            </FormProvider>
        </Dialog>
    )
}

// NewPaymentForm.propTypes = {
//     open: PropTypes.bool,
//     onClose: PropTypes.func,
// };
