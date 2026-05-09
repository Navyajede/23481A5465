import axios from "axios";

export const fetchNotifications = async () => {

  try {

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications"
    );

    return response.data;

  } catch (error) {

    console.log(
      "Failed to fetch notifications",
      error
    );

    return [];
  }
};