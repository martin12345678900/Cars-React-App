import { Link } from 'react-router-dom';

import Error from '../Common/Error/Error';
import { register } from '../../../services/requests';

import style from './Register.module.css';

import useAuthentication from '../../../CustomHook/AuthenticationHook';


function Register({
    history,
}) {
    const [registerSubmitHandler, validateInput, validation] = useAuthentication(register);
    
    return (
        <div className={style.container}>
            <form onSubmit={registerSubmitHandler}>
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>

                <p>Email</p>
                {validation.invalidEmailMsg && validation.invalidEmailMsg !== '' ? <Error message={validation.invalidEmailMsg} /> : null}
                <input className={style.text} type="email" placeholder="Enter Email" name="email" onBlur={validateInput} required />

                <p>Password</p>
                {validation.invalidPasswordMsg && validation.invalidPasswordMsg !== '' ? <Error message={validation.invalidPasswordMsg} /> : null}
                <input className={style.password} type="password" placeholder="Enter Password" name="password" onBlur={validateInput} required />

                <p>Repeat Password</p>
                <input className={style.password} type="password" placeholder="Repeat Password" name="repeatPass" required />


                <input type="submit" className={style.registerbtn} value="Register" />
            </form>
            <div className={style.signin}>
                <p>Already have an account?
                    <Link className={style.sign} to="/auth/login">Sign in</Link>.
                </p>
            </div>
        </div>
    )
}
    

export default Register;
