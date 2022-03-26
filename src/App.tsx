import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { ROUTER_URL_CONSTANT } from "./constants/routerUrlConstant";
import StockComponent from "./pages/StockComponent";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to={ROUTER_URL_CONSTANT.STOCK_PAGE} />}
        />
        <Route
          path={ROUTER_URL_CONSTANT.STOCK_PAGE}
          component={StockComponent}
        />
      </Switch>
    </Router>
  );
}
