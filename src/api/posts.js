import axios from "axios";

export const obtenerDatos = () =>
  axios.get("https://jsonplaceholder.typicode.com/posts");
