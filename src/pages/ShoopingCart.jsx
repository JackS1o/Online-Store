import React, { Component } from 'react';
import { BsCart, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Teste from '../components/Teste';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { productList, cardUpdate } = this.props;
    const a = productList.filter((este, i) => productList.indexOf(este) === i);
    // https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-array-em-javascript#:~:text=O%20que%20este%20c%C3%B3digo%20faz,indice%20que%20a%20fun%C3%A7%C3%A3o%20passa.
    return (
      <div>
        <Link
          to="/"
        >
          <BsFillArrowLeftCircleFill />
          <BsCart />
        </Link>
        {productList.length === 0
        && <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</h1>}
        <div className="div-mae-card-carrinho">
          {productList.map((elem, index) => (
            <Teste
              elem={ elem }
              key={ index }
              productList={ productList }
              cardUpdate={ cardUpdate }
            />
          ))}
        </div>
        <div>
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  productList: PropTypes.arrayOf(Object).isRequired,
};

export default ShoppingCart;
