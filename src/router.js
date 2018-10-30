import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import DbUtil from './components/DbUtil';
import Products from './routes/Products'
import Test from './components/Test'

import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <Switch>
          <Route path="/main" component={Products} />
          <Route path="/db" component={DbUtil} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
