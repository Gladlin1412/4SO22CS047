const express = require("express");
const axios = require("axios");

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2ODc0OTEyLCJpYXQiOjE3NDY4NzQ2MTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjFhYWUzNmI0LWU1ZWYtNDZhZi04OTFhLTA5Y2Q2NjEzOTljZSIsInN1YiI6Im1hc2NhcmVuaGFzZ2xhZGxpbkBnbWFpbC5jb20ifSwiZW1haWwiOiJtYXNjYXJlbmhhc2dsYWRsaW5AZ21haWwuY29tIiwibmFtZSI6ImdsYWRsaW4gc2hpbnkgbWFzY2FyZW5oYXMiLCJyb2xsTm8iOiI0c28yMmNzMDQ3IiwiYWNjZXNzQ29kZSI6IktqSkF4UCIsImNsaWVudElEIjoiMWFhZTM2YjQtZTVlZi00NmFmLTg5MWEtMDljZDY2MTM5OWNlIiwiY2xpZW50U2VjcmV0IjoiUndmSlVEV3pVVkRWblpaQSJ9.cpRxreS-MermaVa0zDVJZHziKsJfpb1WQfStvblkw5w';

axios.get('http://20.244.56.144/evaluation-service/fibo', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.log(error));


const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let window = [];

const nums = {
  p: "primes",
  f: "fibo",
  e: "even",
  r: "rand",
};

const API_BASE = "http://20.244.56.144/evaluation-service";

app.get("/numbers/:numberid", async (req, res) => {
  const type = req.params.numberid;
  const endpoint = nums[type];

  if (!endpoint) 
  {
    return res.status(400).json({ error: "Invalid numberid" });
  }

  const prevWindow = [...window];
  let numbersFromAPI = [];

  try 
  {
    const response = await axios.get(`${API_BASE}/${endpoint}`, {
      timeout: 500
    });
    numbersFromAPI = response.data.numbers || [];
  } 
  catch (error) 
  {
    numbersFromAPI = [];
  }

  const unique = numbersFromAPI.filter(n => !window.includes(n));
  window = [...window, ...unique];

  if (window.length > WINDOW_SIZE) {
    window = window.slice(window.length - WINDOW_SIZE);
  }

  const avg =
    window.length === 0
      ? 0
      : parseFloat(
          (window.reduce((sum, n) => sum + n, 0) / window.length).toFixed(2)
        );

  return res.json({
    windowPrevState: prevWindow,
    windowCurrState: window,
    numbers: numbersFromAPI,
    avg
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
