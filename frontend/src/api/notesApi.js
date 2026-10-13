import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export const getNotes = (search = "") =>
  api.get("/notes", { params: search ? { search } : {} }).then((r) => r.data);

export const createNote = (note) => api.post("/notes", note).then((r) => r.data);

export const updateNote = (id, note) =>
  api.put(`/notes/${id}`, note).then((r) => r.data);

export const deleteNote = (id) => api.delete(`/notes/${id}`);

// Turn any axios error into a readable message
export const errorMessage = (err) => {
  if (err.response?.data?.errors) {
    return Object.values(err.response.data.errors).join(", ");
  }
  if (err.response?.data?.message) return err.response.data.message;
  if (err.code === "ERR_NETWORK") {
    return "Cannot reach the server. Is the backend running and is VITE_API_URL correct?";
  }
  return "Something went wrong. Please try again.";
};
