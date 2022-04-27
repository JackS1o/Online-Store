import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProductsSearch from './pages/ProductsSearch';
import ShoppingCart from './pages/ShoopingCart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ ProductsSearch } />
        <Route exact path="/ShoppingCart" component={ ShoppingCart } />
        <Route exact path="/Checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
