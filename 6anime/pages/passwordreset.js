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
    let emailError = document.getElementById("emailError");

    document.getElementById("unexpectedError").classList.add("hidden");

    if (!EmailValidator.validate(email)) {
      pass = false;
      emailError.classList.remove("hidden");
      document.getElementById("email").classList.add("is-invalid");
    } else {
      emailError.classList.add("hidden");
    }

    if (!ver) {
      pass = false;
      document.getElementById("completecaptcha").classList.remove("hidden");
    }

    if (pass) {
      fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/passwordreset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      }).then(res => {
        if (res.ok) {
          window.location.href = "/login";
        } else {
          document.getElementById("unexpectedError").classList.remove("hidden");
        }
      })
    }
  }

  function emailInput(e) {
    let email = e.target.value;
    let emailError = document.getElementById("emailError");
    document.getElementById("email").classList.remove("is-invalid");
    if (!EmailValidator.validate(email)) {
      emailError.classList.remove("hidden");
    } else {
      emailError.classList.add("hidden");
    }
  }

  function onVerifyCaptcha(token) {
    ver = true;
    document.getElementById("completecaptcha").classList.add("hidden");
  }

  return (
    <>
      <Head>
        <title>{`6Anime - Reset Password`}</title>
      </Head>
      <div className="loginmain">
        <form>
          <h1 id="login_h"><span className='minW'><b>Reset Your Password</b></span></h1>
          <div className="form-group">
            <label for="email">Email address</label>
            <input type="email" id="email" className="form-control" onInput={emailInput} placeholder="Enter email" required />
            <div id="emailError" className='text-danger hidden'>Please enter a valid email address.</div>
          </div>
          <HCaptcha sitekey="956fe9d4-8e58-4abb-aacf-ed674089796e" onVerify={onVerifyCaptcha} />
          <div id="completecaptcha" className='text-danger hidden'>Please complete the captcha.</div>
          <div id="unexpectedError" className='text-danger hidden'>An unexpected error occurred. Please try again later.</div>
          <button onClick={submit} type="submit" id="submitbutton" className="btn btn-primary btn-block h-captcha">Reset Password</button>
        </form>
      </div>
    </>
  );
}