import * as React from 'react';
import { useState } from 'react';
import { ReactComponent as OpenIcon } from '../../../images/svg/password-open-eye.svg';
import { ReactComponent as CloseIcon } from '../../../images/svg/password-close-eye.svg';

const PasswordField = ({
  name,
  className,
  placeholder,
  elementId,
}) => {

  const [visible, setVisible] = useState(false);

  return (
    <div className='form__password'>
      <input
        id={elementId}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        className={className}
      />
      <button
        className='form__password-icon'
        aria-label='Toggle Password Visibility'
        onClick={() => setVisible((prevState) => !prevState)}
        onKeyDown={(e) => {
          if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            setVisible((prevState) => !prevState);
          }
        }}
      >
        {visible ? 
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.852"
                height="13.383"
                viewBox="0 0 19.852 13.383"
            >
                <path
                id="Icon_ionic-md-eye"
                data-name="Icon ionic-md-eye"
                d="M12.176,7.383A10.674,10.674,0,0,0,2.25,14.074a10.708,10.708,0,0,0,19.852,0A10.674,10.674,0,0,0,12.176,7.383Zm0,11.154a4.463,4.463,0,1,1,4.511-4.462A4.5,4.5,0,0,1,12.176,18.536Zm0-7.139a2.677,2.677,0,1,0,2.708,2.677A2.7,2.7,0,0,0,12.176,11.4Z"
                transform="translate(-2.25 -7.383)"
                fill="#DDE4E5"
                />
          </svg>
        : 
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="17.139"
                viewBox="0 0 20 17.139"
            >
                <path
                id="Icon_ionic-md-eye-off"
                data-name="Icon ionic-md-eye-off"
                d="M12.252,8.106A4.534,4.534,0,0,1,16.8,12.619a4.341,4.341,0,0,1-.326,1.651L19.13,16.9a10.67,10.67,0,0,0,3.12-4.285A10.771,10.771,0,0,0,8.624,6.482l1.964,1.95A4.5,4.5,0,0,1,12.252,8.106ZM3.161,5.647,5.236,7.7l.42.415a10.619,10.619,0,0,0-3.405,4.5,10.787,10.787,0,0,0,13.983,6.008l.384.379,2.665,2.633,1.156-1.147L4.312,4.5Zm5.026,4.985,1.41,1.4a2.557,2.557,0,0,0-.071.585,2.714,2.714,0,0,0,2.727,2.7,2.565,2.565,0,0,0,.589-.071l1.41,1.4A4.524,4.524,0,0,1,7.7,12.61,4.458,4.458,0,0,1,8.186,10.633Zm3.919-.7,2.865,2.843.018-.143a2.714,2.714,0,0,0-2.727-2.7Z"
                transform="translate(-2.25 -4.5)"
                fill="#DDE4E5"
                />
            </svg>
        }
      </button>
    </div>
  );
};

export default PasswordField;
