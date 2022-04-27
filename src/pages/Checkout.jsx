import React, { Component } from 'react';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      address: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email, cpf, telefone, cep, address } = this.state;
    return (
      <div className="checkout-container">
        <form>
          {/* <button
            data-testid="checkout-products"
            type="submit"
          >
            Finalizar Compra
          </button> */}
          <label htmlFor="nome-completo">
            Nome Completo
            <input
              type="text"
              id="nome-completo"
              data-testid="checkout-fullname"
              value={ name }
              name="name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              data-testid="checkout-email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf">
            CPF
            <input
              type="text"
              id="cpf"
              data-testid="checkout-cpf"
              value={ cpf }
              name="cpf"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="telefone">
            telefone
            <input
              type="tel"
              id="telefone"
              data-testid="checkout-phone"
              value={ telefone }
              name="telefone"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cep">
            CEP
            <input
              type="text"
              id="cep"
              data-testid="checkout-cep"
              value={ cep }
              name="cep"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              id="address"
              data-testid="checkout-cep"
              value={ address }
              name="address"
              onChange={ this.handleChange }
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Checkout;
