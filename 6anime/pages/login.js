import React, { useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Head from 'next/head'
import EmailValidator from 'email-validator';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

export default function Login({ data }) {
  const {t} = useTranslation();

  let ver = false;
  // Change the background color of the body
  useEffect(() => {
    if (document.cookie.includes('token=')) {
      window.location.href = '/profile';
      return;
    }
    document.body.classList.add('loginbg');
  });

  function submit(e) {
    e.preventDefault();
    let pass = true;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let emailError = document.getElementById("emailError");
    let rememberme = document.getElementById("rememberme").checked;

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
      fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      }).then(res => {
        if (res.ok) {
          res.text().then(token => {
            document.cookie = `token=${token}; path=/; ` + (rememberme ? `max-age=604800;` : ``) + ` SameSite=None; Secure; Domain=6anime.tv`;
            window.location.href = "/";
          });
        } else {
          document.getElementById("invalidCredentials").classList.remove("hidden");
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

  function passwordInput(e) {
    document.getElementById("password").classList.remove("is-invalid");
  }

  function onVerifyCaptcha(token) {
    ver = true;
    document.getElementById("completecaptcha").classList.add("hidden");
  }

  return (
    <>
      <Head>
        <title>{`6Anime - Login`}</title>
      </Head>
      <div className="loginmain">
        <form>
          <h1 id="login_h"><span className='minW'><b>{t('login')}</b></span></h1>
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input type="email" id="email" className="form-control" onInput={emailInput} placeholder="name@example.com" required />
            <div id="emailError" className='text-danger hidden'>{t('valid_email')}</div>
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input type="password" id="password" className="form-control" onInput={passwordInput} placeholder={t('password')} required />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="rememberme" />
              <label className="custom-control-label" htmlFor="rememberme" id="remembermebutton">{t('remember_me')}</label>
            </div>
          </div>
          <HCaptcha sitekey="956fe9d4-8e58-4abb-aacf-ed674089796e" onVerify={onVerifyCaptcha} />
          <div id="completecaptcha" className='text-danger hidden'>{t('captcha')}</div>
          <div id="invalidCredentials" className='text-danger hidden'>{t('invalid_email_pass')}</div>
          <div id="unexpectedError" className='text-danger hidden'>{t('unexpected_error')}</div>
          <button onClick={submit} type="submit" id="submitbutton" className="btn btn-primary btn-block h-captcha">{t('login')}</button>
          <p className="forgot-password text-right">
            <a href="/passwordreset">{t('forgot_password')}</a>
          </p>
          <p className="register text-right">
          {t('dont_have_account')} <a href="/register">{t('register')}</a>
          </p>
        </form>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const languageHandler = require('../lib/languageHandler');

  return {
      props: {
          ...(await serverSideTranslations(languageHandler.getLanguage(context), ['common'])),
      }
  }
}