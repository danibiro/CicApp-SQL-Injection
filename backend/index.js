import express from 'express';
import cors from 'cors';
import { connection } from './db.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/user', async (req, res) => {
  const { username } = req.query;
  const user = await connection.query(
    `SELECT * FROM users WHERE username='${username}' LIMIT 1`
  );
  if (user[0].length > 0) {
    res.send({ exists: true });
    return;
  }
  res.send({ exists: false });
});

app.get('/users', async (req, res) => {
  const users = await connection.query(
    `SELECT * FROM users`
  );
  console.log(`Fetched all users. Total count: ${users[0].length}`);
  res.send({ users: users[0] });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt: ${username} with password: ${password}`);

  // unsafe sql injection vulnerable check
  // query: dani'; UPDATE users SET likes=0 WHERE username='dani'; -- 
  const check = await connection.query(
    `SELECT * FROM users WHERE username='${username}' AND password='${password}' LIMIT 1`
  );

  // sql injection safe check
  // const check = await connection.query(
  //   `SELECT * FROM users WHERE username=? AND password=? LIMIT 1`,
  //   [username, password]
  // );

  if (check[0].length > 0) {
    console.log(`Login successful: ${username}`);
    res.send({ success: true, userData: check[0][0] });
    return;
  }
  console.error(`Login failed: Invalid credentials for ${username}`);
  res.send({ success: false });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const check = await connection.query(
    `SELECT * FROM users WHERE username='${username}' LIMIT 1`
  );
  if (check[0].length > 0) {
    console.error(`Registration failed: ${username} already exists`);
    res.send({ success: false });
    return;
  }
  await connection.query(
    `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`
  );
  console.log(`Registration successful: ${username} with password: ${password}`);
  res.send({ success: true, userData: { username, password, url: "" } });
});

app.post('/update-url', async (req, res) => {
  const { username, newUrl } = req.body;
  await connection.query(
    `UPDATE users SET url='${newUrl}' WHERE username='${username}'`
  );
  console.log(`URL updated for ${username} to ${newUrl}`);
  res.send({ success: true });
});

app.post('/increase-likes', async (req, res) => {
  const { username } = req.body;
  await connection.query(
    `UPDATE users SET likes = likes + 1 WHERE username='${username}'`
  );
  console.log(`Increased likes for ${username}`);
  res.send({ success: true });
});