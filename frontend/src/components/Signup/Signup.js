import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {Link,useNavigate} from 'react-router-dom';

const publicVapidKey =
  "BErT8yw_oZTyNwR1ZlmTcgURTCnfVyOWMw0YvQBOGc8WsH1Cc6bBM3GRCUbLjExUaGBSXnntzz6RLlaBdcWyS8s";

const privateKey = "sFo79ntrv2XrB-UVDVdDhHl-CfPAyNj0FbhKyfhP4Ms";

const Signup = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const validateAndSignup = async() => {
      
        let subscription =await send();
        console.log('sub');
        console.log(subscription);
        const res = await fetch('https://notification-checker-app.herokuapp.com/api/signup',{
            method:"POST",
            body:JSON.stringify({name,email,password,subscription}),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        });
        navigate('/');
  };

  async function send() {
    // Register Service Worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("../worker.js", {
      scope: "/signup",
    });
    console.log("Service Worker Registered...");
  
    // Register Push
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log(subscription);
    console.log("Push Registered...");
  
    // Send Push Notification
    console.log("Sending Push...");
    // await fetch("/subscribe", {
    //   method: "POST",
    //   body: JSON.stringify(subscription),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // }).then((res)=>{
    //   console.log(res);
    // });
    // console.log("Push Sent...");
   return subscription;
  }
  
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    console.log(outputArray);
    return outputArray;
  }
  

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
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="name"
            variant="outlined"
          />
          
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
            onClick={validateAndSignup}
          >
            SIGNUP
          </Button>
          <Button
            variant="contained"
            color="error"
          ><Link to="/" style={{textDecoration:"none",color:'white'}}>HAVE AN ACCOUNT?</Link>
            
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
