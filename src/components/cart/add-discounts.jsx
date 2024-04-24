import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem, Dialog, DialogActions } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import { useDispatch } from "react-redux";
import { addDiscountApi } from "src/api/cartApi";
import dayjs from "dayjs";


const AddDiscounts = () => {
    const [discountDetails, setDiscountDetails] = useState({
        discountCode:"",
        description: "",
        percentage: "",
        startDate: "",
        endDate: ""
    });
    
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null); // State variable for submission status
    const [openDialog, setOpenDialog] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiscountDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
    
        // Reset submission status when any field is changed
        setSubmissionStatus(null);
    
        // Validation for Percentage
        if (name === "percentage") {
          if (!value || isNaN(value) || value <= 0 || value >= 100) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              percentage: "Percentage must be a positive number greater than zero and lower than 100",
            }));
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, percentage: "" }));
          }
        }

        if (name === "discountCode") {
          const pattern = /^[a-z]{2}\d{3}$/i; // Pattern for "ac123" format
          if (!pattern.test(value)) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              discountCode: "Discount code must have two alphabetic characters followed by three numeric characters (ex: ds123)",
            }));
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, discountCode: "" }));
          }
        }

        if (name === 'endDate') {
          const startDate = new Date(discountDetails.startDate);
          const endDate = new Date(value);
          const getTwoWeeks = new Date(startDate.getTime() + (2 * 7 * 24 * 60 * 60 * 1000)); // 2 weeks in milliseconds

          if (endDate > getTwoWeeks) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              endDate: "End Date should be within 2 weeks from Start Date",
            }));
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, endDate: "" }));
          }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation check before submission
        if (!validateForm()) {
          return;
        }
    
        try {
    
            addDiscountApi(discountDetails).then((response) => {
            // Dispatch action to add product to Redux store
            console.log(response.data)
            setSubmissionStatus("success"); // Set submission status to success
            setOpenDialog(true); // Open the dialog
            setDiscountDetails({
              discountCode:"",
              description: "",
              percentage: "",
              startDate: "",
              endDate: ""
            });
          });
        } catch (error) {
          console.error("Error submitting product details:", error);
          setSubmissionStatus("error"); // Set submission status to error
          setOpenDialog(true); // Open the dialog
        }
    };
    
    const handleClear = () => {
        setDiscountDetails({
          discountCode:"",
          description: "",
          percentage: "",
          startDate: "",
          endDate: ""
        });

        setSubmissionStatus(null); // Reset submission status when clearing the form
    };
    
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
    
        // Discount code validation
        if (!discountDetails.discountCode) {
          newErrors.discountCode = "Discount code is required";
          valid = false;
        }
    
        // Description validation
        if (!discountDetails.description) {
          newErrors.description = "Description is required";
          valid = false;
        }
    
        // Percentage validation
        if (!discountDetails.percentage) {
          newErrors.percentage = "Discount percentage is required";
          valid = false;
        }

        if (!discountDetails.startDate) {
          newErrors.startDate = "Start Date is required";
          valid = false;
        }

        if (!discountDetails.endDate) {
          newErrors.endDate = "End Date is required";
          valid = false;
        }
    
        setErrors(newErrors);
          return valid;
    };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    
    const currentDate = new Date().toISOString().slice(0, 10);
    console.log(currentDate)

    return (
          <>
            <div>
                <h1>Add New Discount</h1>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Discount Code"
                            name="discountCode"
                            type="text"
                            placeholder="Ex : Ds123"
                            value={discountDetails.discountCode}
                            onChange={handleChange}
                            error={!!errors.discountCode}
                            helperText={errors.discountCode}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={discountDetails.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Discount Percentage"
                            name="percentage"
                            type="number"
                            value={discountDetails.percentage}
                            onChange={handleChange}
                            error={!!errors.percentage}
                            helperText={errors.percentage}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            
                            label="Start Date"
                            name="startDate"
                            type="date"
                            value={discountDetails.startDate}
                            onChange={handleChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={!!errors.startDate}
                            helperText={errors.startDate}
                            inputProps={{
                              min: currentDate // Set minimum date to current date
                            }}
                          />
                        </Grid>    
                        
                        <Grid item xs={12}>
                            <TextField
                            
                            label="End Date"
                            name="endDate"
                            type="date"
                            value={discountDetails.endDate}
                            onChange={handleChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={!!errors.endDate}
                            helperText={errors.endDate}
                            inputProps={{
                              min: currentDate // Set minimum date to current date
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="success">
                            Submit
                            </Button>
                            <Button
                            variant="contained"
                            color="error"
                            onClick={handleClear}
                            sx={{ marginLeft: 1 }}
                            >
                            Clear
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {/* Dialog for displaying submission status */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <div>
                        {submissionStatus === "success" && (
                            <div style={{ color: "green", padding: "20px" }}>
                            Discount added successfully!
                            </div>
                        )}
                        {submissionStatus === "error" && (
                            <div style={{ color: "red", padding: "20px" }}>
                            Failed to add Discount. Please try again.
                            </div>
                        )}
                    </div>
                        <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                        OK
                        </Button>
                        </DialogActions>
                </Dialog>
            </div>
        </>
    );
}


export default AddDiscounts