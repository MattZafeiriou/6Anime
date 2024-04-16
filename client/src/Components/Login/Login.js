import React from 'react';
import './Login.css'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "Login"
    }

    // Change the title of the page
    document.title = '6Anime - ' + this.state.type + ' Page';

    // Change the background color of the body
    document.body.classList.add('loginbg');
  }

  changeType(type) {
    this.setState({ type: type });
    document.title = '6Anime - ' + type + ' Page';
    if (type === "Login")
    {
      document.getElementById("register_h").classList.add("hidden");
      document.getElementById("login_h").classList.remove("hidden");
    } else if (type === "Register")
    {
      document.getElementById("login_h").classList.add("hidden");
      document.getElementById("register_h").classList.remove("hidden");
    }
  }


  render() {
    return (
      <>
        <div className="loginmain">
          <form>
            <h1 className='hidden' id="register_h"><span id="clickable" onClick={() => {this.changeType("Login")}}><span className='minW'>Log In</span></span> / <span className='minW'><b>Register</b></span></h1>
            <h1 id="login_h"><span className='minW'><b>Log In</b></span> / <span id="clickable" onClick={() => {this.changeType("Register")}}><span className='minW'>Register</span></span></h1>
            <div className="form-group">
              <label>Username or Email address</label>
              <input type="email" className="form-control" placeholder="Enter username / email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="rememberme" />
                <label className="custom-control-label" htmlFor="rememberme" id="remembermebutton">Remember me</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">{this.state.type == "Login" ? "Log In" : "Register"}</button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </>
    );
  };
}
export default Login;