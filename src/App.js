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
      evaluationSubmited: [],
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

   handleSubmitClick = (email, rating, evaluation, product) => {
     const evaluationObj = {
       email,
       rating,
       evaluation,
       productID: product.id,
     };
     this.setState((prevState) => ({
       evaluationSubmited: [...prevState.evaluationSubmited, evaluationObj],
     }), () => {
       const { evaluationSubmited } = this.state;
       localStorage.setItem('submited-rate', JSON.stringify(evaluationSubmited));
     });
   }

  receiveEvaluationFromStorage = () => {
    const evaluationSubmited = localStorage.getItem('submited-rate');
    if (evaluationSubmited) {
      const ratingElements = JSON.parse(evaluationSubmited);
      this.setState({
        evaluationSubmited: ratingElements,
      });
    }
  }

  render() {
    const { productList, renderState, evaluationSubmited } = this.state;
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
          <Route exact path="/Checkout" component={ Checkout } />
          <Route
            path="/details/:id"
            render={ (props) => (<Details
              { ...props }
              handleClick={ this.handleClick }
              handleSubmitClick={ this.handleSubmitClick }
              evaluationSubmited={ evaluationSubmited }
              receiveEvaluationFromStorage={ this.receiveEvaluationFromStorage }

            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
