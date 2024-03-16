import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled from @mui/material
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch } from "react-redux";

import { login } from "../../../api/authApi";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Define styles for the form container
const FormContainer = styled("div")({
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    try {
      console.log("passed");
        e.preventDefault();
         
        const response = await login(email, password);
    
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        localStorage.setItem("token", data.token);
        toast.error("Login fail! try again.");
        // dispatch(login({ user: data.user, token: data.token }));
      } else {
        console.log("Error logging in");
      }
    } catch (error) {
      console.log({ error: error });
      toast.error("Something went wrong");
      // Handle network error
    }
  };

  return (
    <FormContainer>
      <Container component="main" maxWidth="xs">
        <div>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              color: "#F6C034",
              paddingY: "5px",
              fontWeight: "bold",
            }}
          >
            System Login
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* {error && <Typography variant="body2" color="error">{error}</Typography>} */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{
                backgroundColor: "#2CA019",
                "&:hover": {
                  backgroundColor: "rgba(44, 160, 25, 0.75)", // Adjust opacity as needed
                },
              }}
              // disabled={loading}
            >
              {/* {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'} */}
              Login
              <ArrowForwardIosIcon />
            </Button>
          </form>
        </div>
        <ToastContainer position="bottom-center" style={{ bottom: "0" }} />
      </Container>
    </FormContainer>
  );
};

export default AdminLoginForm;
