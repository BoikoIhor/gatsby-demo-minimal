import React from "react";
import axios from 'axios';
import IndexProvider from "context";

import TextField from '../components/UI/Inputs/TextField';
import EmailField from '../components/UI/Inputs/EmailField';
import Checkbox from '../components/UI/Inputs/Checkbox';
import PasswordField from '../components/UI/Inputs/PasswordField';
import Button from "../components/UI/button";
import Main from "components/Layout/main";

import "styles/registration-page.scss";


const Registration = (props) => {
  const createCustomer = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      mode: "cors",
      url: '/createCustomer',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Auth-Token": "5boiq0lbj38dhcx414qcijf1s0v1uvt"
      },
      data: [{
        first_name: "Andrew",
        last_name: "Boyko",
        email: "andrii.boiko@elogic.co",
        password: "string"
      }],
    };

    try {
      const response = await axios(options);
      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      console.error(error); // Handle any errors that occurred during the request
    }
  };

  const gtmData = {
    page: {
      title: "Registration",
      type: "Registration",
    },
  };

  return (
    <IndexProvider>
      <Main className="registration-page" gtmData={gtmData}>
        <div className="registration-page__content">
          <form onSubmit={createCustomer} className='form__input-wrap'>
            <h1 className="typography__h1">Create new account</h1>
            <TextField
              elementId={'user-name'}
              name={'User name'}
              placeholder={'First name'}
              required={true}
              className={'form__input typography__p--inter'}
            />
            <TextField
              elementId={'last-name'}
              name={'Last name'}
              placeholder={'Last name'}
              required={true}
              className={'form__input typography__p--inter'}
            />
            <EmailField
              elementId={'email'}
              name={'email'}
              required={true}
              placeholder={'Email'}
              className={'form__input typography__p--inter'}
            />
            <PasswordField
              elementId={'password'}
              name={'password-field'}
              required={true}
              placeholder={'Password'}
              className={'form__input typography__p--inter'}
            />
            <Checkbox
              elementId={'privacy-policy'}
              className={'form__checkbox'}
              name={'Email Newsletter'}
              required={false}
              value={
                'I agree with privacy policy and terms'
              }
            />
            <Button
              value="Register"
              type="dark"
              isArrowShow
              isSubmit
            />
          </form>
        </div>
      </Main>
    </IndexProvider>
  );
};

export default Registration;
