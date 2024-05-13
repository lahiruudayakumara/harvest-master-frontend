import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { addSupportFaq } from "src/api/supportApi";
import { Controller } from "react-hook-form";

const AddFaq = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    solution: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the input value contains any special characters
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      // If it contains special characters, do not update the state
      return;
    }
    // Update the state if the input is valid
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addSupportFaq(formData)



    // Do something with formData, like submit to backend
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={5} margin={6}>
        <Grid item xs={12}>

          <TextField
            fullWidth
            label="Topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            inputProps={{ pattern: "[a-zA-Z\\s]+" }}
            error={!/^[a-zA-Z\s]+$/.test(formData.topic) && formData.topic.length > 0}
            helperText={!/^[a-zA-Z\s]+$/.test(formData.topic) && formData.topic.length > 0 ? "Invalid input" : ""}

           
            
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            inputProps={{ pattern: "[a-zA-Z\\s]+" }}
            error={!/^[a-zA-Z\s]+$/.test(formData.description)}
            helperText={!/^[a-zA-Z\s]+$/.test(formData.description) ? "Invalid input" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Solution"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            inputProps={{ pattern: "[a-zA-Z\\s]+" }}
            error={!/^[a-zA-Z\s]+$/.test(formData.solution)}
            helperText={!/^[a-zA-Z\s]+$/.test(formData.solution) ? "Invalid input" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddFaq;
