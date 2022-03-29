import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const validateAndLogin = async() => {
    try{
      const res = await fetch('https://notification-checker-app.herokuapp.com/api/login',{
        method:"POST",
        body:JSON.stringify({email,password}),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if(data.data){
        if(data.data.email.includes('admin')){
          navigate('/admin');
        }else{
          navigate(`/user/${data.data._id}`);
        }
      }
      
      console.log(data);
    }catch(error){
      console.log(error.message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6BCB77",
      }}
    >
      <div
        style={{
          width: "700px",
          height: "400px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            width: "600px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
         
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="email"
            variant="outlined"
          />
          
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="password"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="success"
            onClick={validateAndLogin}
          >
            LOGIN
          </Button>

          <Button variant="contained" color="error" onClick={validateAndLogin}>
            <Link to="/signup" style={{textDecoration:"none",color:'white'}}>CREATE AN ACCOUNT</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
