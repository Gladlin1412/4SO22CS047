const axios = require("axios");
const fs = require("fs");

const getAuthToken = async () => {
  try {
    const credentials = JSON.parse(fs.readFileSync("credentials.json", "utf-8"));

    const authPayload = {
      email: credentials.email,
      name: credentials.name,
      rollNo: credentials.rollNo,
      accessCode: credentials.accessCode,
      clientID: credentials.clientID,
      clientSecret: credentials.clientSecret
    };

    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      authPayload
    );

    console.log("Token Received:");
    console.log(res.data);

    fs.writeFileSync("token.json", JSON.stringify(res.data, null, 2));
    console.log("Access token saved to token.json");
  }
   catch (err) {
    console.error("Failed to get auth token!");
    if (err.response) {
      console.error(err.res.data);
    } else {
      console.error(err.message);
    }
  }
};

getAuthToken();
