import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
import {Routes,Route} from 'react-router-dom';
import Signup from "./components/Signup/Signup";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";



function createData(name, address, age) {
  return { name, address, age };
}

function App() {
 
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState("");
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    
  }, []);

  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/user/:id" element={<User/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
