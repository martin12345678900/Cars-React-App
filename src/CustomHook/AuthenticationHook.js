import { useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { UserCtx } from '../Context/UserContext';

const INCORRECT_TYPES = {
    'INVALID-EMAIL': 'invalid-email',
    'VALID-EMAIL': 'valid-email',
    'INVALID-PASSWORD': 'invalid-password',
    'VALID-PASSWORD': 'valid-password'
}

function reducerFunc(previousState, action) {
    switch (action.type) {
        case INCORRECT_TYPES['INVALID-EMAIL']:
            return { ...previousState, invalidEmailMsg: 'Incorrect email!' };
        case INCORRECT_TYPES['VALID-EMAIL']:
            return { ...previousState, email: action.value, invalidEmailMsg: '' };
        case INCORRECT_TYPES['INVALID-PASSWORD']:
            return { ...previousState, invalidPasswordMsg: 'Incorrect password!' };
        case INCORRECT_TYPES['VALID-PASSWORD']:
            return { ...previousState, password: action.value, invalidPasswordMsg: '' };
        default:
            return previousState;
    }
}

function useAuthentication(authenticationHandler) {
    const { setUserInfo } = useContext(UserCtx);
    const [validationState, dispach] = useReducer(reducerFunc, {});

    const history = useHistory();

    const authenticationSubmitHandler = (ev) => {
        ev.preventDefault();
        if (validationState.email && validationState.password) {
            return authenticationHandler(validationState.email, validationState.password)
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

    const validate = (event, regex, prop) => {
        if (regex.test(event.target.value) === false) {
            dispach({ type: INCORRECT_TYPES[`INVALID-${prop}`]});
        } else {
            dispach({ type: INCORRECT_TYPES[`VALID-${prop}`], value: event.target.value });
        }
    }

    const validateInput = (event) => {
        const validationByName = {
            email: () => validate(event, /\S+@\S+\.\S+/, 'EMAIL'),
            password: () => validate(event, /[A-Za-z0-9]/, 'PASSWORD')
        }

        validationByName[event.target.name]();
    };
    return [
        authenticationSubmitHandler,
        validateInput,
        validationState
    ]
}

export default useAuthentication;
