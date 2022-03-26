import { ADD_STOCK, DELETE_STOCK,UPDATE_STOCK } from "./actionTypes";
import { UserDataReducerActionTypes } from "./types";

export const userDataState = {
  userData: {
    data: [],
    error: null,
    loader: null,
  },
};

export default (state = userDataState, action: UserDataReducerActionTypes) => {
  switch (action.type) {
    case ADD_STOCK:
      return {
        ...state,
        userData: {
          ...state.userData,
          data: [...state.userData.data, action.payload.data],
          loader: action.payload.loader,
          error: action.payload.error,
        },
      };
    case DELETE_STOCK:
      return {
        ...state,
        userData: {
          ...state.userData,
          data: state.userData?.data.filter(
            (item: any) => item.id !== action.payload?.data?.id
          ),
          loader: action.payload.loader,
          error: action.payload.error,
        },
      };
      case UPDATE_STOCK:
      return {
        ...state,
        userData: {
          ...state.userData,
          data: action.payload.data,
          loader: action.payload.loader,
          error: action.payload.error,
        },
      };

    default:
      return state;
  }
};
