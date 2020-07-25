import axios from "axios";

const URL = "https://5f1b8c20254cec001608229a.mockapi.io/todo";

export function ambilDataDariServer() {
  return axios.get(URL);
}

export function tambahDataKeServer(newTodo) {
  return axios.post(URL, newTodo);
}

export function updateDataDiServer(id, newTodo) {
  return axios.put(URL + `/${id}`, newTodo);
}

export function deleteDataDiServer(id) {
  return axios.delete(URL + `/${id}`);
}
