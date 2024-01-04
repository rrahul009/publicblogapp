import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../globalContext/UserContext";
 

const Register = () => {
  const { setUserName } = useUser();
  const [register, setRegister] = useState(true);
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (register) {
      setUserdata({ ...userData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (register) {
        // Registration
        const response = await axios.post(
          "http://localhost:8080/api/user/register",
          userData
        );

        if (response.status === 201) {
          setUserName(response.data.data.name); // Use the name from the response
          alert(response.data.message);
        
          setUserdata({
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
          });
        }
        
      } else {
        // Login
        const response = await axios.post(
          "http://localhost:8080/api/user/login",
          loginData
        );

        if (response.status === 200) {
          console.log("print====1",response)
          alert(response.data.message);
          setUserName(response.data.data.name); // Use the name from the response
        
          Navigate("/home");
        }
        
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={2} sx={{ width: "450px", padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" textAlign="center">
            {register ? "Register here" : "Login here"}
          </Typography>
          <Grid container>
            {register ? (
              <>
                {/* Registration form */}
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    margin="normal"
                    required
                    type="text"
                    fullWidth
                    value={userData.name}
                    name="name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    margin="normal"
                    required
                    type="email"
                    fullWidth
                    value={userData.email}
                    name="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    margin="normal"
                    required
                    type="password"
                    fullWidth
                    value={userData.password}
                    name="password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    margin="normal"
                    required
                    type="password"
                    fullWidth
                    value={userData.confirmpassword}
                    name="confirmpassword"
                    onChange={handleChange}
                  />
                </Grid>
              </>
            ) : (
              <>
                {/* Login form */}
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    margin="normal"
                    required
                    type="email"
                    fullWidth
                    value={loginData.email}
                    name="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    margin="normal"
                    required
                    type="password"
                    fullWidth
                    value={loginData.password}
                    name="password"
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit">
                {register ? "Register" : "Login"}
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: "5px" }}>
              <Typography textAlign="center">
                {register
                  ? "Already have an account "
                  : "Don't have an account "}
                <Button onClick={() => setRegister(!register)}>
                  {register ? "Login" : "Register"}
                </Button>{" "}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
