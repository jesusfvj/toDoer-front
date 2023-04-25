import { useEffect, createContext, useReducer } from "react";
import { useContext } from "react";
import { loginUserAPI, registerUserAPI } from "../../API/UserApi/UserApi";
import userTypes from "../Types/userTypes";

import { userReducer } from "./UserReducer";

export const UserContext = createContext();

export const useUser = () => {
  const state = useContext(UserContext);
  return state;
};

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    user
  };
};

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userState.user));
  }, [userState.user]);

  const loginUser = async (user) => {
    const response = await loginUserAPI(user);
    if (response.ok) {
      const { _doc: { name, email, _id }, token } = response.user;
      localStorage.setItem("token", token);
      dispatch({ type: userTypes.login, payload: { email, name, _id, token } });
    }
    return response;
  };

  const registerUser = async (user) => {
    const response = await registerUserAPI(user);
    if (response.ok) {
      const { name, lastName, email, _id, token } = response.user;
      localStorage.setItem("token", token);
      dispatch({ type: userTypes.register, payload: { name, lastName, email, _id, token } });
    }
    return response;
  };

  const logoutUser = () => {
    dispatch({ type: userTypes.logout });
  };

  const deleteUser = async (user) => {
    dispatch({ type: userTypes.delete });
  };

  return (
    <UserContext.Provider
      value={{
        ...userState,
        loginUser,
        logoutUser,
        registerUser,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
