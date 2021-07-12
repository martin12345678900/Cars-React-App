import style from './Login.module.css';
import { Link } from 'react-router-dom';
import { login } from '../../../services/requests';
import  Error  from '../Common/Error/Error';

import useAuthentication from '../../../CustomHook/AuthenticationHook';

function Login({
    history
}) {
    const [loginSubmitHandler, validateInput, username, password] = useAuthentication(login);
    
    return (
        <div className={style.container}>
            <form onSubmit={loginSubmitHandler}>
                <h1>Login</h1>
                <p>Please enter your credentials.</p>

                <p>Username</p>
                { username.errorMessage && username.errorMessage !== '' ? <Error message={username.errorMessage} /> : null }
                <input className={style.text} placeholder="Enter Username" name="username" type="text" onBlur={validateInput} />

                <p>Password</p>
                { password.errorMessage && password.errorMessage !== '' ? <Error message={password.errorMessage} /> : null }
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