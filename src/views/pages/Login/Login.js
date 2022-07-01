import React, { useState, useRef, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { authRequest } from '../../../helpers/createRequest';
import AuthContext from '../../../store/auth-context';
import classes from './Login.module.css';
import { FaUserAlt } from "react-icons/fa";
import './LoginNewCss.css'
const Login = props => {
  //   const history = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = e => {
    e.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (isLogin) {
      authRequest
        .post('auth/', {
          username: enteredUsername,
          password: enteredPassword,
        })
        .then(res => {
          const { data } = res;
          console.log(res);
          authCtx.login(data.token);
        })
        .catch(e => {
          console.log(e.response.status);
          alert('Бундай фойдаланувчи мавжуд емас!');
        });
    }
  };

  return (
    <div className="head">

      <div className="head-left">
        <img src="/static/media/study.svg" alt="" />
      </div>

      <div className="head-rigth">
         {/* className={classes.auth} */}
         <section className='box-auth'>
            <h1>{isLogin ? 'Тизимга кириш' : "Рўйхатдан ўтиш"}</h1>
            <form onSubmit={submitHandler}>
            {/* className={classes.control} */}
              <div className='box-login'>
                <label htmlFor="email">Логин</label>
                <input type="text" id="username" placeholder="Enter your login..." ref={usernameRef} required />
              </div>
              {/* className={classes.control} */}
              <div className='box-login'>
                <label htmlFor="password">Парол</label>
                <input type="password" id="password" placeholder="Enter your password" ref={passwordRef} required />
              </div>
              {/* className={classes.actions} */}
              <div className='button_block'>
                  <button className='btn-login'>{isLogin ? 'Кириш' : 'Яратиш'}</button>
                  <button type="button"  className='btn-login' onClick={switchAuthModeHandler}>
                    {isLogin ? "Рўйхатдан ўтиш" : 'Мавжуд фойдаланувчи сифатида кириш'}
                  </button>
              </div>
            </form>
         </section>
      </div>
    
    </div>
   
  );
};

export default Login;
