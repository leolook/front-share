import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import Main from "./components/main";
import List from "./components/db/list";
import Util from "./components/db/util";

import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

function RouterConfig({ history }) {
  const Inbox = ({ match }) => (
    <Main>
      <Route path={`${match.url}/list`} component={List} />
      <Route path={`${match.url}/db`} component={Util} />
    </Main>
  );

  return (
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/main/list" />} />
          <Route path="/main" component={Inbox} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
