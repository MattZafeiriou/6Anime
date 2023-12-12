import React from 'react';
import './Donate.css'

class Donate extends React.Component {

  paymentMethod(props) 
  {
    return (
      <div className="paymentMethod">
        <a href={props.href}>
          <img src={props.src} alt={props.text} />
        </a>
        <a href={props.href}><button>{props.text}</button></a>
      </div>
    );
  }

  render() {
    return (
      <>
          <div className="donatemain">
              <h1>Thank You For Preferring Us!</h1>
              <h4>We accept the following payment methods</h4>
              <this.paymentMethod href="../donate_paypal" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" text="Donate with PayPal" />
              <this.paymentMethod href="../donate_bitcoin" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bitcoin_logo.svg/1200px-Bitcoin_logo.svg.png" text="Donate with Bitcoin" />
              <this.paymentMethod href="../donate_ethereum" src="https://altcoinsbox.com/wp-content/uploads/2023/01/full-ethereum-logo-grey.png" text="Donate with Ethereum" />
          </div>
      </>
    );
  };
}
export default Donate;