import React, { useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Head from 'next/head'
import EmailValidator from 'email-validator';

export default function Login({ data }) {

  let ver = false;
  // Change the background color of the body
  useEffect(() => {
    document.body.classList.add('loginbg');
  });

  function submit(e) {
    e.preventDefault();
    let pass = true;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let emailError = document.getElementById("emailError");
    let usernameLengthError = document.getElementById("usernameLengthError");
    let usernameMaxLengthError = document.getElementById("usernameMaxLengthError");
    let passwordLengthError = document.getElementById("passwordLengthError");
    let passwordMaxLengthError = document.getElementById("passwordMaxLengthError");
    let passwordCapitalError = document.getElementById("passwordCapitalError");
    let repeatPassword = document.getElementById("repeatpassword").value;

    document.getElementById("unexpectedError").classList.add("hidden");

    if (!EmailValidator.validate(email)) {
      pass = false;
      emailError.classList.remove("hidden");
      document.getElementById("email").classList.add("is-invalid");
    } else {
      emailError.classList.add("hidden");
    }

    if (username.length < 3) {
      pass = false;
      document.getElementById("username").classList.add("is-invalid");
      usernameLengthError.classList.remove("hidden");
    } else {
      usernameLengthError.classList.add("hidden");
    }

    if (username.length > 20) {
      pass = false;
      document.getElementById("username").classList.add("is-invalid");
      usernameMaxLengthError.classList.remove("hidden");
    } else {
      usernameMaxLengthError.classList.add("hidden");
    }

    if (!/^[a-z0-9_]*$/.test(username)) {
      pass = false;
      document.getElementById("username").classList.add("is-invalid");
      document.getElementById("invalidUsername").classList.remove("hidden");
    } else {
      document.getElementById("invalidUsername").classList.add("hidden");
    }

    if (password.length < 8) {
      pass = false;
      document.getElementById("password").classList.add("is-invalid");
      passwordLengthError.classList.remove("hidden");
    } else {
      passwordLengthError.classList.add("hidden");
    }

    if (password.length > 100) {
      pass = false;
      document.getElementById("password").classList.add("is-invalid");
      passwordMaxLengthError.classList.remove("hidden");
    } else {
      passwordMaxLengthError.classList.add("hidden");
    }

    if (!/[A-Z]/.test(password)) {
      pass = false;
      document.getElementById("password").classList.add("is-invalid");
      passwordCapitalError.classList.remove("hidden");
    } else {
      passwordCapitalError.classList.add("hidden");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      pass = false;
      document.getElementById("password").classList.add("is-invalid");
      document.getElementById("passwordCharacterError").classList.remove("hidden");
    } else {
      document.getElementById("passwordCharacterError").classList.add("hidden");
    }

    if (password !== repeatPassword) {
      pass = false;
      document.getElementById("repeatpassword").classList.add("is-invalid");
    } else {
      document.getElementById("repeatpassword").classList.remove("is-invalid");
    }

    if (!ver) {
      pass = false;
      document.getElementById("completecaptcha").classList.remove("hidden");
    }



    if (pass) {
      fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password, username: username })
      }).then(res => {
        if (res.ok) {
          window.location.href = "/";
        } else {
          res.text().then(text => {
            if (text === 'Account with this username already exists.') {
              document.getElementById("username").classList.add("is-invalid");
              document.getElementById("takenUsername").classList.remove("hidden");
            }
            else if (text === 'Account with this email already exists.') {
              document.getElementById("email").classList.add("is-invalid");
              document.getElementById("takenEmail").classList.remove("hidden");
            } else {
              document.getElementById("unexpectedError").classList.remove("hidden");
            }
          });
        }
      })
    }
  }

  function emailInput(e) {
    let email = e.target.value;
    let emailError = document.getElementById("emailError");
    document.getElementById("email").classList.remove("is-invalid");
    document.getElementById("takenEmail").classList.add("hidden");
    if (!EmailValidator.validate(email)) {
      emailError.classList.remove("hidden");
    } else {
      emailError.classList.add("hidden");
    }
  }

  function passwordInput(e) {
    let password = e.target.value;
    let repeatPassword = document.getElementById("repeatpassword").value;
    let passwordLengthError = document.getElementById("passwordLengthError");
    let passwordMaxLengthError = document.getElementById("passwordMaxLengthError");
    let passwordCapitalError = document.getElementById("passwordCapitalError");
    document.getElementById("password").classList.remove("is-invalid");
    document.getElementById("repeatpassword").classList.remove("is-invalid");
    if (password.length < 8) {
      passwordLengthError.classList.remove("hidden");
    } else {
      passwordLengthError.classList.add("hidden");
    }

    if (password.length > 100) {
      passwordMaxLengthError.classList.remove("hidden");
    } else {
      passwordMaxLengthError.classList.add("hidden");
    }

    if (!/[A-Z]/.test(password)) {
      passwordCapitalError.classList.remove("hidden");
    } else {
      passwordCapitalError.classList.add("hidden");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      document.getElementById("passwordCharacterError").classList.remove("hidden");
    } else {
      document.getElementById("passwordCharacterError").classList.add("hidden");
    }

    if (password !== repeatPassword) {
      document.getElementById("passwordUnmatch").classList.remove("hidden");
    } else {
      document.getElementById("passwordUnmatch").classList.add("hidden");
    }
  }

  function repeatPasswordInput(e) {
    const password = document.getElementById("password").value;
    document.getElementById("repeatpassword").classList.remove("is-invalid");
    const repeatPassword = e.target.value;
    if (password !== repeatPassword) {
      document.getElementById("passwordUnmatch").classList.remove("hidden");
    } else {
      document.getElementById("passwordUnmatch").classList.add("hidden");
    }
  }

  function usernameInput(e) {
    let username = e.target.value;
    let invalidUsername = document.getElementById("invalidUsername");
    document.getElementById("username").classList.remove("is-invalid");
    if (!/^[a-z0-9_]*$/.test(username)) {
      invalidUsername.classList.remove("hidden");
    } else {
      invalidUsername.classList.add("hidden");
    }

    if (username.length > 20) {
      document.getElementById("usernameMaxLengthError").classList.remove("hidden");
    } else {
      document.getElementById("usernameMaxLengthError").classList.add("hidden");
    }
  }

  function onVerifyCaptcha(token) {
    ver = true;
    document.getElementById("completecaptcha").classList.add("hidden");
  }

  return (
    <>
      <Head>
        <title>{`6Anime - Register`}</title>
      </Head>
      <div className="loginmain">
        <form>
          <h1 id="login_h"><span className='minW'><b>Register</b></span></h1>
          <div className="form-group username">
            <label for="username">Username</label>
            <input type="text" id="username" className="form-control" onInput={usernameInput} placeholder="Enter a username" required />
            <div id="invalidUsername" className='text-danger hidden'>The username can only contain lowercase letters, numbers, and underscores.</div>
            <div id="usernameLengthError" className='text-danger hidden'>The username must be at least 3 characters long.</div>
            <div id="usernameMaxLengthError" className='text-danger hidden'>The username must be at most 20 characters long.</div>
            <div id="takenUsername" className='text-danger hidden'>The username is already in use.</div>
          </div>
          <div className="form-group">
            <label for="email">Email address</label>
            <input type="email" id="email" className="form-control" onInput={emailInput} placeholder="Enter email" required />
            <div id="emailError" className='text-danger hidden'>Please enter a valid email address.</div>
            <div id="takenEmail" className='text-danger hidden'>The email is already in use.</div>
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" className="form-control" onInput={passwordInput} placeholder="Enter password" required />
            <div id="passwordLengthError" className='text-danger hidden'>The password must be at least 8 characters long.</div>
            <div id="passwordMaxLengthError" className='text-danger hidden'>The password must be at most 100 characters long.</div>
            <div id="passwordCapitalError" className='text-danger hidden'>The password must have at least one capital letter.</div>
            <div id="passwordCharacterError" className='text-danger hidden'>The password must have at least one special character.</div>
          </div>
          <div className="form-group repeatPassword">
            <label for="repeatpassword">Repeat Password</label>
            <input type="password" id="repeatpassword" className="form-control" onInput={repeatPasswordInput} placeholder="Repeat password" required />
            <div id="passwordUnmatch" className='text-danger hidden'>The passwords do not match.</div>
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="rememberme" />
              <label className="custom-control-label" htmlFor="rememberme" id="remembermebutton">Remember me</label>
            </div>
          </div>
          <HCaptcha sitekey="956fe9d4-8e58-4abb-aacf-ed674089796e" onVerify={onVerifyCaptcha} />
          <div id="completecaptcha" className='text-danger hidden'>Please complete the captcha.</div>
          <div id="invalidCredentials" className='text-danger hidden'>The email or password is incorrect.</div>
          <div id="unexpectedError" className='text-danger hidden'>An unexpected error occurred. Please try again later.</div>
          <button onClick={submit} type="submit" id="submitbutton" className="btn btn-primary btn-block h-captcha">Register</button>
          <p className="login text-right">
            <a href="/login">Already have an account?</a>
          </p>
        </form>
      </div>
    </>
  );
}