import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
// import logo from './logo.svg';
import './App.css';
import CheckoutForm from './CheckoutForm';

class App extends Component {
  render() {
    return (
      <div className="App-header">
        <StripeProvider apiKey="pk_test_daG2ZClOFUnFKJ5m6Rs6eZdD00I7ooIOF4">
            <Elements>
              <CheckoutForm />
            </Elements>
        </StripeProvider>
      </div>

    );
  }
}
export default App

// <img src={logo} className="App-logo" alt="logo" />