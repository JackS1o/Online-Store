import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';
import { getProductById } from '../services/api';

class Details extends Component {
  constructor() {
    super();

    this.state = {
      product: {},
      atributo: [],
      disabled: true,
      email: '',
      rating: '',
      evaluation: '',
      evaluationSubmited: [],
    };
  }

  componentDidMount() {
    const evaluationSubmited = localStorage.getItem('submited-rate');
    if (evaluationSubmited) {
      const ratingElements = evaluationSubmited.split(',');
      this.setState({
        evaluationSubmited: ratingElements,
      });
    }
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

  handleEmailChange = ({ target }) => {
    const valueInput = target.value;
    this.setState({
      email: valueInput,
    }, () => {
      this.CheckDisabledBtn();
    });
  }

  handleEvaluationChange = ({ target }) => {
    const valueInput = target.value;
    this.setState({
      evaluation: valueInput,
    });
  }

  handleRateChange = ({ target }) => {
    const valueInput = target.value;
    this.setState({
      rating: valueInput,
    }, () => {
      this.CheckDisabledBtn();
    });
  }

  CheckDisabledBtn = () => {
    const { email, rating } = this.state;
    if (email.length > 0 && rating) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleSubmitClick = (event) => {
    event.preventDefault();
    const { email, rating, evaluation } = this.state;
    this.setState({
      evaluationSubmited: [email, rating, evaluation],
    }, () => {
      const { evaluationSubmited } = this.state;
      localStorage.setItem('submited-rate', evaluationSubmited);
      this.setState({
        email: '',
        rating: '',
        evaluation: '',
      });
    });
  }

  cardConstructor = () => {
    const { handleClick } = this.props;
    const { product,
      atributo,
      disabled,
      email,
      evaluation,
      evaluationSubmited,
    } = this.state;
    const ratingStars = ['1', '2', '3', '4', '5'];
    return (
      <div>
        <header>
          <h1>Detalhes do Produto</h1>
        </header>
        <div className="div-mae-details">
          <div className="card-details">
            <p data-testid="product-detail-name">
              { product.title }
            </p>
            <img src={ product.thumbnail } alt="Imagem" className="img-card-details" />
            <p>{ product.price }</p>
            <Link to="/ShoppingCart">
              <button
                className="add-Carrinho"
                type="button"
                onClick={ () => handleClick(product) }
                data-testid="product-detail-add-to-cart"
              >
                Adicionar ao carrinho

              </button>
            </Link>
          </div>
          <div className="details">
            {atributo.map((atribut, index) => (
              <div key={ index }>
                <span>{`${atribut.name}: ${atribut.value_name}`}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rating-form-container">
          <form className="rating-form">
            <h2 className="h2-avaliacao">Avalie este produto!</h2>
            <label htmlFor="email" className="label-email">
              E-mail
              <input
                type="email"
                id="email"
                name="email"
                placeholder="insira um email"
                data-testid="product-detail-email"
                onChange={ this.handleEmailChange }
                value={ email }
              />
            </label>
            <div className="label-rate">
              {ratingStars.map((rate, index) => (
                <label
                  htmlFor={ rate }
                  key={ index }
                >
                  <BsFillStarFill />
                  <input
                    id={ rate }
                    type="radio"
                    data-testid={ `${index + 1}-rating` }
                    name="rate"
                    value={ rate }
                    onChange={ this.handleRateChange }
                  />
                </label>
              ))}
            </div>
            <label htmlFor="evaluation" className="label-text-area">
              Adicione um comentário:
              <textarea
                id="evaluation"
                placeholder="Deixe sua avaliação"
                data-testid="product-detail-evaluation"
                name="evaluation"
                rows="5"
                cols="30"
                onChange={ this.handleEvaluationChange }
                value={ evaluation }
              />
            </label>
            <button
              className="evaluation-btn"
              type="submit"
              data-testid="submit-review-btn"
              disabled={ disabled }
              onClick={ this.handleSubmitClick }
            >
              Enviar Avaliação!
            </button>
          </form>
          <div>
            <div className="feedback">
              { evaluationSubmited ? (
                <div>
                  <h3>Email:</h3>
                  <p>{ evaluationSubmited[0] }</p>
                  <h3>Nota:</h3>
                  <p>{ evaluationSubmited[1] }</p>
                  <h3>Avaliação:</h3>
                  <p>{ evaluationSubmited[2] }</p>
                </div>
              )
                : (
                  <span>
                    Produto sem avaliações!
                  </span>
                )}
            </div>
          </div>
        </div>
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
