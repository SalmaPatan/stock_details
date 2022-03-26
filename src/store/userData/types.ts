import {
  ADD_STOCK,
  DELETE_STOCK,
  UPDATE_STOCK,
} from "./actionTypes";

interface AddStock {
  type: typeof ADD_STOCK;
  payload: any;
}
interface DeleteStock {
  type: typeof DELETE_STOCK;
  payload: any;
}
interface UpdateStock {
  type: typeof UPDATE_STOCK;
  payload: any;
}

export type UserDataReducerActionTypes = AddStock | DeleteStock|UpdateStock;
