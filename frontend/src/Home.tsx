import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useUser } from "./contexts/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import type User from "./entities/User";
import { useNavigate } from "react-router";
import catPetGif from "./img/cat-pet.gif";

const Home = () => {
  const { user, setUser } = useUser();
  const [newUrl, setNewUrl] = useState("");
  const [users, setUsers] = useState<
    Array<User>
  >([]);
  const navigate = useNavigate();

  const handleChangeURL = () => {
    axios
      .post("http://localhost:3001/update-url", {
        username: user?.username,
        newUrl: newUrl,
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          alert("URL updated successfully!");
          setUser((prevUser) =>
            prevUser ? { ...prevUser, url: newUrl } : prevUser,
          );
        }
      });
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return false;
    }
  };

  const increasePetNr = (username: string) => {
    axios.post("http://localhost:3001/increase-likes", {
      username: username,
    }).then((response) => {
      const data = response.data;
      if (data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.username === username
              ? { ...user, likes: (user.likes || 0) + 1 }
              : user,
          ),
        );
      }
    });
  }

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchUsers();

    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3001/users");
        console.log("All users:", response.data);
        const fetchedUsers = response.data.users;
        setUsers(
          fetchedUsers.filter(
            (fetchedUser: User) =>
              fetchedUser && fetchedUser.username !== user?.username,
          ),
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  }, [user?.username]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#14cf91",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ display: "flex", marginBottom: "20px", paddingTop: "10px" }}>
          <Typography
            variant="h1"
            sx={{ flexGrow: 1, alignContent: "center", textAlign: "center" }}
          >
            Welcome, {user?.username}
          </Typography>
          <Button
            variant="contained"
            sx={{ marginRight: "20px" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#3da58e",
            display: "flex",
            justifyContent: "space-around",
            borderRadius: "10px",
            paddingBottom: "20px",
          }}
        >
          <Box>
            {user?.url && (
              <Card
                sx={{
                  alignContent: "center",
                  textAlign: "center",
                  margin: "auto",
                  mt: 2,
                  p: 2,
                  width: "300px",
                }}
              >
                <Typography variant="h2">Your cat</Typography>
                <Box
                  component={"img"}
                  src={user?.url}
                  alt={`${user?.username}'s image`}
                  width={"200px"}
                />
              </Card>
            )}
            <Card
              sx={{
                alignContent: "center",
                textAlign: "center",
                margin: "auto",
                mt: 2,
                p: 2,
                width: "300px",
              }}
            >
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangeURL();
                }}
              >
                <TextField
                  label="Enter new URL"
                  variant="outlined"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  disabled={!isValidUrl(newUrl)}
                >
                  Update cat
                </Button>
              </Box>
            </Card>
          </Box>
          <Box>
            <Typography variant="h2">Other users' cats</Typography>
            {users.map((user) => {
              return (
                <Card
                  key={user.username}
                  sx={{
                    alignContent: "center",
                    textAlign: "center",
                    margin: "auto",
                    mt: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="h4">{user.username}</Typography>
                  {user.url ? (
                    <>
                      <Box display={"grid"}>
                        <Box
                          component={"img"}
                          src={user.url}
                          alt={`${user.username}'s image`}
                          width={"200px"}
                        />
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          textAlign={"center"}
                          marginTop={"20px"}
                        >
                          <Button variant="outlined" onClick={() => increasePetNr(user.username)}>
                            <Box
                              component={"img"}
                              src={catPetGif}
                              sx={{
                                width: "20px",
                                gap: "10px",
                                marginRight: "10px",
                              }}
                            ></Box>
                            <Typography color="black">{user.likes || 0}</Typography>
                          </Button>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <Typography>No cat yet</Typography>
                  )}
                </Card>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
