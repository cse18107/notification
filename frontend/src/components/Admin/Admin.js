import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom'
const Admin = () => {
    const [isLogout, setIsLogOut] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [age, setAge] = React.useState("");
    const navigate = useNavigate();

    const sendData = async () => {
        const data = { name, address, age,email };
        console.log(data);
    
        const res = await fetch("https://notification-checker-app.herokuapp.com/api", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
    
        setEmail("");
        setName("");
        setAddress("");
        setAge("");
    
        const resData = await res.json();
        console.log(resData);
      };


      const logout = () => {
        navigate('/');
        };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4D96FF",
      }}
    >
      <Button color="error" variant="contained" onClick={logout}>
        LOGOUT
      </Button>
      <div
        style={{
          width: "800px",
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: "600px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
        
          <TextField
            id="outlined-basic"
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
          />
          
          <TextField
            id="outlined-basic"
            onChange={(e) => setName(e.target.value)}
            label="Name"
            variant="outlined"
          />
          
          <TextField
            id="outlined-basic"
            onChange={(e) => setAddress(e.target.value)}
            label="Address"
            variant="outlined"
          />
          
          <TextField
            id="outlined-basic"
            onChange={(e) => setAge(e.target.value)}
            label="Age"
            variant="outlined"
          />
          <Button variant="contained" color="success" onClick={sendData}>
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Admin;