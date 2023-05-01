import {
  checkTokenExpired
} from "../utils/tokenExpiredValidator";

export const registerColumnAPI = async (titleNewColumn, userId) => {
  const res = await fetch(`http://localhost:4001/todocolumn/register/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": window.localStorage.getItem("token")
    },
    body: JSON.stringify({
      titleNewColumn
    })
  });
  const data = await res.json();
  const okData = checkTokenExpired(data);
  return okData && data;
};

export const getTodoColumnsAPI = async (userId) => {
  const res = await fetch(`http://localhost:4001/todocolumn/get/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": window.localStorage.getItem("token")
    }
  });
  const data = await res.json();
  const okData = checkTokenExpired(data);
  return okData && data;
};

export const deleteTodoColumnsAPI = async (todoColumnId) => {
  const res = await fetch(`http://localhost:4001/todocolumn/delete/${todoColumnId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": window.localStorage.getItem("token")
    }
  });
  const data = await res.json();
  const okData = checkTokenExpired(data);
  return okData && data;
};

export const editTodoColumnsAPI = async (todoColumnId, newTitleColumn) => {
  const res = await fetch(`http://localhost:4001/todocolumn/delete/${todoColumnId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-token": window.localStorage.getItem("token")
    },
    body: JSON.stringify({
      newTitleColumn
    })
  });
  const data = await res.json();
  const okData = checkTokenExpired(data);
  return okData && data;
};