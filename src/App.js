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
      renderState: [],
    };
  }

  handleClick = (elem) => {
    this.setState((prev) => ({ productList: [...prev.productList, elem] }));
  }

  cardUpdate = (x) => {
    const { productList } = this.state;
    const d = productList.filter((i) => i.id !== x.id);
    this.setState({ productList: d });
  }

  render() {
    const { productList, renderState } = this.state;
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
              cardUpdate={ this.cardUpdate }
              renderState={ renderState }
            />) }
          />
          <Route
            exact
            path="/Checkout"
            render={ (props) => (<Checkout
              { ...props }
              productList={ productList }
              renderState={ renderState }
            />) }
          />
          <Route
            path="/details/:id"
            render={ (props) => (<Details
              { ...props }
              handleClick={ this.handleClick }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
