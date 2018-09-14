import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import ErrorBoundary from './ErrorBoundary';


const Loading = () => {
  return <div>Loading...</div>;
};

const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
});

export const App = () => (
    <Router>
      <Switch>
        <ErrorBoundary><Route exact path="/" component={Home} /></ErrorBoundary>
      </Switch>
    </Router>
);
