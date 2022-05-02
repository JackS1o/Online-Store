import React, { Component } from 'react';
import { BsCart4, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import ProductCart from '../components/ProductsCart';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  finishClick = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { productList, cardUpdate } = this.props;
    const { redirect } = this.state;
    const newArray = productList.filter((este, i) => productList.indexOf(este) === i);
    // https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-array-em-javascript#:~:text=O%20que%20este%20c%C3%B3digo%20faz,indice%20que%20a%20fun%C3%A7%C3%A3o%20passa.
    return (
      <div>
        <Link
          to="/"
          className="link-back-card"
        >
          <BsFillArrowLeftCircleFill />
          <BsCart4 />
        </Link>
        {productList.length === 0
        && <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</h1>}
        <div className="div-mae-card-carrinho">
          {newArray.map((elem, index) => (
            <ProductCart
              elem={ elem }
              key={ index }
              productList={ productList }
              cardUpdate={ cardUpdate }
            />
          ))}
        </div>
        <div>
          <button
            onClick={ this.finishClick }
            data-testid="checkout-products"
            type="button"
            className="finalizar"
          >
            Finalizar Compra
          </button>
          { redirect && <Redirect to="/Checkout" /> }
          <button
            className="ghost-btn"
            type="button"
            data-testid="shopping-cart-button"
          >
            a
          </button>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  productList: PropTypes.arrayOf(Object).isRequired,
  cardUpdate: PropTypes.func.isRequired,
};

export default ShoppingCart;
