import axios from "axios";

const TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export const Log = async (
  level,
  packageName,
  message
) => {

  console.log("Log function started");

  console.log("TOKEN:", TOKEN);

  try {

    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack: "frontend",
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SUCCESS:", response.data);

  } catch (error) {

    console.log(
      "ERROR:",
      error.response?.data || error.message
    );

  }
};