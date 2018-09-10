import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => {
  console.log("loading")
  return <div>Loading...</div>;
}

const Wind = Loadable({
  loader: () => import('./Wind'),
  loading: Loading,
});

export const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Wind}/>
    </Switch>
  </Router>
);
