import { useState } from "react";
import { TextField, Button, Container, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled from @mui/material
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch } from "react-redux";

import { loginApi } from "../../../api/authApi";
import { ToastContainer, toast } from 'react-toastify'
import { login } from "src/stores/slices/authSlice";

import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled("div")({
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(email === "" || password === "") {
      toast.error("All fields are required");
      return;
    }
    
    try {
      setLoading(true);

      const response = await loginApi(email, password);

      if (response.data.status === true) {
        const data = response.data;
        dispatch(login({ user: JSON.stringify(data.userDetails), token: data.token, userRole: data.userRole }));
        toast.success("Login Sucessusfuly");
      } else {
        toast.error("Error logging in");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
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

            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{
                backgroundColor: "#2CA019",
                "&:hover": {
                  backgroundColor: "rgba(44, 160, 25, 0.75)",
                },
              }}
              disabled={loading} endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <ArrowForwardIosIcon />}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
        <ToastContainer position="bottom-center" style={{ bottom: "0" }} />
      </Container>
    </FormContainer>
  );
};

export default AdminLoginForm;
