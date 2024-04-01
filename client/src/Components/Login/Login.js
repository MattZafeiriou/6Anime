import React from 'react';
import './Login.css'

class Login extends React.Component {

  constructor(props) {
    super(props);

    // Change the title of the page
    document.title = '6Anime - Login or Register';

    // Change the background color of the body
    document.body.classList.add('loginbg');
  }


  render() {
    return (
      <>
        <div className="loginmain">
          <form>
            <h1><b>Log In</b> / Register</h1>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" />
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
            <button type="submit" className="btn btn-primary btn-block">Log In</button>
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