import { SystemState } from "../storeType";

export const getUserStock = (state: SystemState) => {
  return state.userData.userData;
};
