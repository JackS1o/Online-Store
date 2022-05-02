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
    console.log(d);
    this.setState({ productList: d });
  }

   handleSubmitClick = (email, rating, evaluation, evaluationSubmited, product) => {
    // event.preventDefault();
    // const { email, rating, evaluation, product } = this.state;
    const evaluationObj = {
      email,
      rating,
      evaluation,
      productID: product.id,
    }
    this.setState((prevState) => ({
      evaluationSubmited: [...prevState.evaluationSubmited, evaluationObj],
    }), () => {
      const { evaluationSubmited } = this.state;
      console.log(evaluationSubmited);
      localStorage.setItem('submited-rate', JSON.stringify(evaluationSubmited));
      // this.setState({
      //   email: '',
      //   rating: '',
      //   evaluation: '',
      // });
    });
  }

  receiveEvaluationFromStorage = () => {
    const evaluationSubmited = localStorage.getItem('submited-rate');
    if (evaluationSubmited) {
      const ratingElements = JSON.parse(evaluationSubmited);
      console.log(ratingElements);
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
              // evaluationSubmited={ evaluationSubmited }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
