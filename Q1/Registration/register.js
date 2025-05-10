const axios = require("axios");
const fs = require("fs");

const register = async () => {
  const payload = {
    email: "mascarenhasgladlin@gmail.com",       
    name: "Gladlin Shiny Mascarenhas",                
    mobileNo: "9036776239",                
    githubUsername: "Gladlin1412",  
    rollNo: "4SO22CS047",                  
    collegeName: "St Joseph Engineering College",      
    accessCode: "KjJAxP"           
  };

  try {
    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/register",
      payload
    );
    console.log("Registration successful:");
    console.log(res.data);

    fs.writeFileSync("credentials.json", JSON.stringify(res.data, null, 2));
    console.log("Credentials saved to credentials.json");
  } 
  catch (err) {
    console.error("Registration failed:");
    if (err.response) {
      console.error(err.res.data);
    } else {
      console.error(err.message);
    }
  }
};

register();
