import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProductsSearch from './pages/ProductsSearch';
import ShoppingCart from './pages/ShoopingCart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ ProductsSearch } />
        <Route path="/ShoppingCart" component={ ShoppingCart } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
