import React, { useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Head from 'next/head'
import EmailValidator from 'email-validator';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Login({ token, validate }) {

  let ver = false;
  // Change the background color of the body
  useEffect(() => {
    document.body.classList.add('loginbg');
    const urlParams = new URLSearchParams(window.location.search);

    if (token) {
      if (validate) {
        document.getElementById("invalidtoken").classList.add("hidden");
        document.getElementsByClassName("loginmain")[0].classList.add("hidden");
        document.getElementsByClassName("loginmain")[1].classList.remove("hidden");
      } else {
        document.getElementById("invalidtoken").classList.remove("hidden");
        document.getElementsByClassName("loginmain")[0].classList.add("hidden");
      }
    }
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
          document.getElementById("confirmed").classList.remove("hidden");
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

  function resetPassword(e) {
    e.preventDefault();
    let pass = true;
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeatpassword").value;

    document.getElementById("unexpectedError").classList.add("hidden");

    if (password.length < 8) {
      pass = false;
      document.getElementById("passwordLengthError").classList.remove("hidden");
    }

    if (password.length > 100) {
      pass = false;
      document.getElementById("passwordMaxLengthError").classList.remove("hidden");
    }

    if (!/[A-Z]/.test(password)) {
      pass = false;
      document.getElementById("passwordCapitalError").classList.remove("hidden");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      pass = false;
      document.getElementById("passwordCharacterError").classList.remove("hidden");
    }

    if (password !== repeatPassword) {
      pass = false;
      document.getElementById("passwordUnmatch").classList.remove("hidden");
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
        body: JSON.stringify({ token: token, password: password })
      }).then(res => {
        if (res.ok) {
          document.getElementById("passwordresetsuccess").classList.remove("hidden");
          document.getElementsByClassName("loginmain")[1].classList.add("hidden");
        } else {
          document.getElementById("unexpectedError").classList.remove("hidden");
        }
      });
    }
  }
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{`6Anime - Reset Password`}</title>
      </Head>
      <div className="loginmain">
        <form>
          <h1 id="login_h"><span className='minW'><b>{t('reset_password')}</b></span></h1>
          <div className="form-group">
            <label for="email">{t('email')}</label>
            <input type="email" id="email" className="form-control" onInput={emailInput} placeholder="name@example.com" required />
            <div id="emailError" className='text-danger hidden'>{t('valid_email')}</div>
          </div>
          <br />
          <HCaptcha sitekey="956fe9d4-8e58-4abb-aacf-ed674089796e" onVerify={onVerifyCaptcha} />
          <div id="completecaptcha" className='text-danger hidden'>{t('captcha')}</div>
          <div id="unexpectedError" className='text-danger hidden'>{t('unexpected_error')}</div>
          <div id="confirmed" className='text-danger hidden'>{t('reset_password_email')}</div>
          <button onClick={submit} type="submit" id="submitbutton" className="btn btn-primary btn-block h-captcha">{t('reset_password')}</button>
          <p className="login text-right">
            <a href="/login">{t('login')}</a> {t('or')} <a href="/register">{t('register')}</a>
          </p>
        </form>
      </div>
      <div className="loginmain hidden">
        <form>
          <h1 id="login_h"><span className='minW'><b>{t('reset_password')}</b></span></h1>
          <div className="form-group">
            <label for="password">{t('password')}</label>
            <input type="password" id="password" className="form-control" onInput={passwordInput} placeholder={t('enter_password')} required />
            <div id="passwordLengthError" className='text-danger hidden'>{t('password_8_chars')}</div>
            <div id="passwordMaxLengthError" className='text-danger hidden'>{t('password_100_chars')}</div>
            <div id="passwordCapitalError" className='text-danger hidden'>{t('password_uppercase')}</div>
            <div id="passwordCharacterError" className='text-danger hidden'>{t('password_special')}</div>
          </div>
          <div className="form-group repeatPassword">
            <label for="repeatpassword">{t('repeat_password')}</label>
            <input type="password" id="repeatpassword" className="form-control" onInput={repeatPasswordInput} placeholder={t('repeat_password')} required />
            <div id="passwordUnmatch" className='text-danger hidden'>{t('password_mismatch')}</div>
          </div>
          <br />
          <HCaptcha sitekey="956fe9d4-8e58-4abb-aacf-ed674089796e" onVerify={onVerifyCaptcha} />
          <div id="completecaptcha" className='text-danger hidden'>{t('captcha')}</div>
          <div id="unexpectedError" className='text-danger hidden'>{t('unexpected_error')}</div>
          <button onClick={resetPassword} type="submit" id="submitbutton" className="btn btn-primary btn-block h-captcha">{t('reset_password')}</button>
          <p className="login text-right">
            <a href="/login">{t('login')}</a> {t('or')} <a href="/register">{t('register')}</a>
          </p>
        </form>
      </div>
      <h1 className='text-center hidden' id='invalidtoken'><a href="/passwordreset">{t('invalid_token')}</a></h1>
      <h1 className='text-center hidden' id='passwordresetsuccess'>{t('reset_password_success')}</h1>
    </>
  );
}

import { validateToken } from './../lib/passwordResetLib';

export async function getServerSideProps(context) {
  const languageHandler = require('../lib/languageHandler');

  if (context.query && context.query.token) {
    let token = context.query.token;

    if (token) {
      const validate = validateToken(token);
      return {
        props: {
          token: token,
          validate: validate,
          ...(await serverSideTranslations(languageHandler.getLanguage(context), ['common'])),
        }
      }
    }
  }

  return {
    props: {
      token: null,
      ...(await serverSideTranslations(languageHandler.getLanguage(context), ['common'])),
    }
  }
}