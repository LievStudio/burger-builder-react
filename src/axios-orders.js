import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-c72d3-default-rtdb.firebaseio.com/",
});

export default instance;
