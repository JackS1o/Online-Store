import React, { Component } from 'react'

 class ProductsSearch extends Component {
  render() {
    return (
      <div className="search page">
        <label htmlFor="">
          <input type="text"></input>
        </label>
        <h2 data-testid="home-initial-message">Digite algum termo de pesquisa ou escolha uma categoria.</h2>
      </div>
    )
  }
}

export default ProductsSearch;
