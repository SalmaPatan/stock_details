import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  StoreEnhancer,
} from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userDataReducer } from "./userData";

/* Create root reducer, containing all features of the application */
const appReducer = combineReducers({
  userData: userDataReducer,
});

const allStoreEhancers: StoreEnhancer = compose(
  applyMiddleware(thunk),
  devToolsEnhancer({})
);

const store = createStore(appReducer, allStoreEhancers);

// /* preloadedState, */ devToolsEnhancer({})
export default store;
