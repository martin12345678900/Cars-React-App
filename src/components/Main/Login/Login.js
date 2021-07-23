import style from './Login.module.css';
import { Link } from 'react-router-dom';
import { login } from '../../../services/requests';
import  Error  from '../Common/Error/Error';

import useAuthentication from '../../../CustomHook/AuthenticationHook';

function Login({
    history
}) {
    const [loginSubmitHandler, validateInput, validation] = useAuthentication(login);
    
    return (
        <div className={style.container}>
            <form onSubmit={loginSubmitHandler}>
                <h1>Login</h1>
                <p>Please enter your credentials.</p>

                <p>Email</p>
                { validation.invalidEmailMsg && validation.invalidEmailMsg !== '' ? <Error message={validation.invalidEmailMsg} /> : null }
                <input className={style.text} placeholder="Enter Email" name="email" type="email" onBlur={validateInput} />

                <p>Password</p>
                { validation.invalidPasswordMsg && validation.invalidPasswordMsg !== '' ? <Error message={validation.invalidPasswordMsg} /> : null }
                <input className={style.password} type="password" placeholder="Enter Password" name="password" onBlur={validateInput} />
                <input type="submit" className={style.loginbtn} value="Login" />
            </form>
            <div className={style.signin}>
                <p>Dont have an account?
                    <Link className={style.sign} to="/auth/register">Sign up</Link>.
                </p>
            </div>
        </div>
    )
}

export default Login;
