import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { LoggedContext } from "./contexts/LoggedContext";
import { UserContext } from "./contexts/UserContext";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(LoggedContext);
  const { setUser } = useContext(UserContext);

  const handleSubmit = () => {
    axios.post("http://localhost:3001/login", {
      username: username,
      password: password
    }).then((response) => {
      const data = response.data;
      if (data.success) {
        setLoggedIn(true);
        console.log(data.userData);
        setUser(data.userData);
        navigate("/home");
      } else {
        alert("Login failed, invalid credentials");
      }
    });
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    axios.post("http://localhost:3001/register", {
      username: username,
      password: password
    }).then((response) => {
      const data = response.data;
      console.log(response.data);
      if (data.success) {
        setRegistering(false);
        setLoggedIn(true);
        setUser(data.userData);
        navigate("/home");
      } else {
        alert("Registration failed, the username is taken");
      }
    });
  };

  return (
    <>
      <Box sx= {{ alignContent: 'center', textAlign: 'center', marginTop: '30px', width: '600px' , marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#dfb9b9', borderRadius: '10px' }}>
        <Typography variant="h1" margin="20px">SQL injection example</Typography>
        {registering ? (
          <Box>
            <Typography variant="h4">Register</Typography>
            <Box component={"form"} sx={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', borderRadius: '10px', backgroundColor: '#f7e1e1', margin: '20px' }}>
              <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Enter your username" variant="outlined"/>
              <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Enter your password" variant="outlined" type="password" />
              <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} label="Confirm your password" variant="outlined" type="password" />
              <Button variant="contained" onClick={handleRegister} disabled={username == "" || password == ""}>Submit</Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="h4">Login</Typography>
            <Box component={"form"} sx={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', borderRadius: '10px', backgroundColor: '#f7e1e1', margin: '20px' }}>
              <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Enter your username" variant="outlined"/>
              <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Enter your password" variant="outlined" type="password" />
              <Button variant="contained" onClick={handleSubmit} disabled={username == "" || password == ""}>Submit</Button>
            </Box>
          </Box>
        )}
        <Divider />
        <Divider />
        <Button variant="text" sx={{marginBlock: '20px'}} onClick={() => setRegistering(!registering)}>{registering ? "Already a member?" : "Not a member yet?"}</Button>
        
      </Box>
    </>
  );
}

export default App;
