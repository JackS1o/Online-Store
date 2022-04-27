import React, { Component } from 'react';
import { getCategories } from '../services/api';

class SideBarCategorias extends Component {
  constructor() {
    super();

    this.state = {
      categorias: [],
    };
  }

  async componentDidMount() {
    const promisse = await getCategories();
    this.setState({
      categorias: promisse,
    });
  }

  criarSideBar = () => {
    const { categorias } = this.state;

    return categorias.map((categoria, index) => (
      <label htmlFor="categoria" key={ index } data-testid="category">
        { categoria.name }
        <input
          type="radio"
          name="categorias"
          id="categoria"
        />
      </label>
    ));
  }

  render() {
    return (
      <aside>
        {this.criarSideBar()}
      </aside>
    );
  }
}

export default SideBarCategorias;
