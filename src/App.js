import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProductsSearch from './components/ProductsSearch';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ ProductsSearch } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
