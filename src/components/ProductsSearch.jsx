import React, { Component } from 'react';
import SideBarCategorias from './SideBarCategorias';

class ProductsSearch extends Component {
  render() {
    return (
      <div className="search page">
        <label htmlFor="product-input">
          <input
            type="text"
            id="product-input"
          />
        </label>
        <h2
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <SideBarCategorias />
      </div>
    );
  }
}

export default ProductsSearch;
