import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProductsSearch from './pages/ProductsSearch';
import ShoppingCart from './pages/ShoopingCart';
import Checkout from './pages/Checkout';
import Details from './pages/Details';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      productList: [],
    };
  }

  handleClick = (elem) => {
    this.setState((prev) => ({ productList: [...prev.productList, elem] }));
  }

  render() {
    const { productList } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<ProductsSearch
              { ...props }
              handleClick={ this.handleClick }
            />) }
          />
          <Route
            exact
            path="/ShoppingCart"
            render={ (props) => (<ShoppingCart
              { ...props }
              productList={ productList }
            />) }
          />
          <Route exact path="/Checkout" component={ Checkout } />
          <Route path="/details/:id" component={ Details } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
