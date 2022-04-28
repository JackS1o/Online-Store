import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Details extends Component {
  constructor() {
    super();

    this.state = {
      product: {},
      atributo: [],
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const promisse = await getProductById(id);
    const atributo = promisse.attributes;
    this.setState({
      product: promisse,
      atributo,
    });
  }

  cardConstructor = () => {
    const { handleClick } = this.props;
    const { product, atributo } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{ product.title }</p>
        <img src={ product.thumbnail } alt="Imagem" className="img-card-details" />
        <p>{ product.price }</p>
        <Link to="/ShoppingCart">
          <button
            type="button"
            onClick={ () => handleClick(product) }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho

          </button>
        </Link>
        <hr />
        {atributo.map((atribut, index) => (
          <div key={ index }>
            <span>{`${atribut.name}: ${atribut.value_name}`}</span>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.cardConstructor()}
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Details;
