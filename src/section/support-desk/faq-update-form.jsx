import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box, Grid } from "@mui/material";
import { updateSupportFaq } from "src/api/supportApi";

const PopupDialogFaqUpdate = (props) => {
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  console.log(props.data.topic);


  const [formData, setFormData] = useState(
   props.data
  );


  useEffect(() => {
    setFormData(props.data);
  }, [props.data]); // Dependency array ensures this runs when props.data changes
  
  console.log(formData.topic);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(formData);
    const response = await updateSupportFaq(props.data.faq_id,formData)


    if(response.status===200){
      alert("successfully updated")
      console.log(response.data);
    }
else{
  alert("update unsucessfull")
}

    // Do something with formData, like submit to backend
    
     handleClose();
  };

  return (
    <Box >
      <Button variant="contained" onClick={handleOpen}>Update Faq</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">


        <DialogTitle m={3}><Typography variant="h5">Update Solution</Typography></DialogTitle>
        <DialogContent sx={{  display:"flex", flexDirection:"column", gap:2,pb:5 ,mt:5}} >
        <form  >
   <Box display={"flex"} flexDirection={"column"} gap={5} width={700} m={2}>
          <TextField
            
            label="Topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            inputProps={{ pattern: "[a-zA-Z\\s]+" }}
            error={!/^[a-zA-Z\s]+$/.test(formData.topic)}
            helperText={!/^[a-zA-Z\s]+$/.test(formData.topic) ? "Invalid input" : ""}
          />
       
          <TextField
            
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            inputProps={{ pattern: "[a-zA-Z\\s]+" }}
            error={!/^[a-zA-Z\s]+$/.test(formData.description)}
            helperText={!/^[a-zA-Z\s]+$/.test(formData.description) ? "Invalid input" : ""}
          />
       
          <TextField
           
            label="Solution"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            inputProps={{ pattern: "[a-zA-Z\\s]+" }}
            error={!/^[a-zA-Z\s]+$/.test(formData.solution)}
            helperText={!/^[a-zA-Z\s]+$/.test(formData.solution) ? "Invalid input" : ""}
          />
        </Box>
        
     
    </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
      </Box>
  );
};

export default PopupDialogFaqUpdate;
