export const registerTodoAPI = async (todo, user) => {
  const res = await fetch("http://localhost:4001/todo/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo,
      user
    })
  });
  const data = await res.json();
  return data;
};

export const getTodosAPI = async (userId) => {
  const res = await fetch(`http://localhost:4001/todo/get/${userId}`, {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  const data = await res.json();
  return data;
};

export const deleteTodoAPI = async (todoId) => {
  const res = await fetch(`http://localhost:4001/todo/delete/${todoId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await res.json();
  return data;
};

export const updateTodosAPI = async (todoEditContent, todoId) => {
  const res = await fetch(`http://localhost:4001/todo/update/${todoId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      todoEditContent
    })
  })
  const data = await res.json();
  return data;
};

export const changeTodoStateAPI = async (stateTodo, directionOfChange, todoId, userId) => {
  const res = await fetch(`http://localhost:4001/todo/changestate/${todoId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stateTodo,
      directionOfChange,
      userId
    })
  })
  const data = await res.json();
  return data;
};