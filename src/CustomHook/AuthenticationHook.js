import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserCtx } from '../Context/UserContext';

function useAuthentication(authenticationHandler) {
    const { setUserInfo } = useContext(UserCtx);
    const [username, setUsername] = useState({ });
    const [password, setPassword] = useState({ });
    
    const history = useHistory();

    const authenticationSubmitHandler = (ev) => {
        ev.preventDefault();
        if (username.inputValue && password.inputValue) {
            return authenticationHandler(username.inputValue, password.inputValue)
                .then(user => {
                    Object.entries(user).forEach(([key, value]) => sessionStorage.setItem(key, value));
                    setUserInfo({
                        accessToken: user.accessToken,
                        userId: user._id,
                        username: user.username
                    })
                    history.push('/listings');
                })
        }
    }

    const validate = (event, setState, errorMsg) => {
        if (/^[A-Za-z0-9]{5,15}$/.test(event.target.value) === false) {
            setState({ errorMessage: errorMsg})
        } else {
            setState({ errorMessage: '', inputValue: event.target.value });
        }
    }

    const validateInput = (ev) => {
        let validateInputs = {
            username: () => {
                validate(ev, setUsername, 'Username must include only letters and must be between 5 and 15 symbols!');
            },
            password: () => {
                validate(ev, setPassword, 'Password must include letters and numbers and must be between 5 and 15 symbols!')
            },
        }

        return validateInputs[ev.target.name]();
    }

    return [
        authenticationSubmitHandler,
        validateInput,
        username,
        password
    ]
}

export default useAuthentication;