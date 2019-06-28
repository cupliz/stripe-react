import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import M from 'materialize-css';
const ORIGIN = 'http://localhost:3000'
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { charges: [], name: '', amount: '' };
    this.submit = this.submit.bind(this);
  }
  createOptions = () => {
    return {
      iconStyle: 'solid',
      style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#fff',
          fontWeight: 500,
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',

          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: '#87BBFD',
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },
    };
  };
  componentDidMount() {
    this.getCharges()
  }
  async getCharges() {
    let { data } = await axios.get(`${ORIGIN}/api/trans`);
    await this.setState({ charges: data })
  }
  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value})
  }
  async submit(ev) {
    const {name, amount} = this.state
    let success = false;
    let { token } = await this.props.stripe.createToken({ name });
    if (token) {
      let {data} = await axios.post(`${ORIGIN}/api/charge`, {
        source: token.id,
        amount
      });
      if (data.status==='succeeded') {
        success = true;
        this.getCharges()
      }
    }
    success
      ? M.toast({ html: 'Purchase Complete!', classes: 'green' })
      : M.toast({ html: 'Purchase Failed!', classes: 'red' })
  }
  renderCharges() {
    const { charges } = this.state
    if (charges.length) {
      return (
        <ul className="collection">
          {charges.map((charge, i) => (
            <li key={i} className="collection-item">
              {charge.id} - {charge.billing_details.name} (${charge.amount})
            </li>
          ))}
        </ul>
      )
    }
  }
  render() {
    return (
      <div className="example1">
        <h1 className="white-text">React Stripe Example</h1>
        <div className="center-align" >
          <input name="name" type="text"
            className="input-field"
            placeholder="Who will pay this bill ?"
            style={{ width: "50%", textAlign: 'center'}}
            value={this.state.name}
            onChange={this.onChange}
            required />
            <br/>
          <input name="amount" type="number"
            className="input-field"
            placeholder="How much ?"
            style={{ width: "50%", textAlign: 'center'}}
            value={this.state.amount}
            onChange={this.onChange}
            required />
        </div>
        <CardElement
          {...this.createOptions(this.props.fontSize)} />

          <small className="white-text">Example Card number: 4242424242424242</small>
        
        <button className="waves-effect waves-light btn" onClick={this.submit}>
          Send <i className="material-icons right">send</i>
        </button>
        <br />
        <br />
        <h6 className="white-text">Transaction List:</h6>
        {this.renderCharges()}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);