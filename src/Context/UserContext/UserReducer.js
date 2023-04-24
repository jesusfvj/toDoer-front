import userTypes from "../Types/userTypes";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case userTypes.register:
      return {
        ...state,
        user: { ...action.payload },
      };
    case userTypes.login:
      return {
        ...state,
        user: {...action.payload},
      };
    case userTypes.logout:
      return {
        ...state,
        user: null,
      };
    case userTypes.delete:
      return {
        ...state,
        user: null,
      };

    default:
      state;
  }
};

export default userReducer;
