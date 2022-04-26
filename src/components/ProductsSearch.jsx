import React, { Component } from 'react';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import SideBarCategorias from './SideBarCategorias';

class ProductsSearch extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      searchItens: [],
    };
  }

  searchApi = ({ target }) => {
    const { value } = target;
    this.setState({
      inputValue: value,
    });
  }

  searchButton = async () => {
    const { inputValue } = this.state;
    const data = await getProductsFromCategoryAndQuery(inputValue);
    this.setState({
      searchItens: data.results,
    });
  }

  render() {
    const { inputValue, searchItens } = this.state;

    return (
      <div className="search page">
        <h2
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <label htmlFor="product-input">
          <input
            type="text"
            value={ inputValue }
            id="product-input"
            onChange={ this.searchApi }
            data-testid="query-input"
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.searchButton }
        >
          Pesquisar
        </button>
        <Link
          to="/ShoppingCart"
          data-testid="shopping-cart-button"
        >
          <BsCart />
        </Link>
        { searchItens.length === 0 && <p>Nenhum produto foi encontrado</p>}
        <div>
          {searchItens.map((item, index) => (
            <div key={ index } data-testid="product">
              <p>{ item.title }</p>
              <img src={ item.thumbnail } alt="Imagem" />
              <p>{ item.price }</p>
            </div>
          ))}
        </div>
        <h2>
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <SideBarCategorias />
      </div>
    );
  }
}

export default ProductsSearch;
