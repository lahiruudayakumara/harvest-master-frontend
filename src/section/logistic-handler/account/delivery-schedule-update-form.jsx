import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react'

const deliveryScheduleUpdateForm = () => {
    return (
        <Dialog
            open={openUpdateDialog}
            onClose={() => setOpenUpdateDialog(false)}
            maxWidth="sm" // Set max width to small
            fullWidth // Expand dialog to full width
        >
            <DialogTitle>Update Details</DialogTitle>
            <StyledDialogContent>
                {selectedProduct && (
                    <>
                        <StyledInputField
                            margin="dense"
                            label="Product Name"
                            value={selectedProduct.product_Name}
                            disabled
                        />
                        <StyledInputField
                            label="Product Type"
                            value={selectedProduct.product_type}
                            disabled
                        />
                        <StyledInputField
                            label="Description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setDescriptionError(false);
                            }}
                            error={descriptionError}
                            helperText={descriptionError ? "Description is required" : ""}
                        />
                        <StyledInputField
                            label="Price"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                setPriceError(false);
                            }}
                            error={priceError}
                            helperText={
                                priceError
                                    ? "Price must be a valid number greater than 0"
                                    : ""
                            }
                        />
                        <StyledInputField
                            label="Package Type"
                            value={selectedProduct.packege_Type}
                            disabled
                        />
                    </>
                )}
            </StyledDialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenUpdateDialog(false)}
                    color="primary"
                    style={{ backgroundColor: "#D32F2F", color: "white" }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSaveUpdates}
                    color="secondary"
                    autoFocus
                    style={{ backgroundColor: "#2CA019", color: "white" }}
                >
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default deliveryScheduleUpdateForm;
