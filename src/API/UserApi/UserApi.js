export const registerUserAPI = async (user) => {
  const res = await fetch("http://localhost:4001/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user
    })
  });
  const data = await res.json();
  return data;
};

export const loginUserAPI = async (user) => {
  const res = await fetch("http://localhost:4001/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user
    })
  });
  const data = await res.json();
  return data;
};

export const deleteUserAPI = async (user) => {
  const res = await fetch("http://localhost:4001/user/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user
    })
  });
  const data = await res.json();
  return data;
};