import { Link, NavLink, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserCtx } from '../../Context/UserContext';

import style from './Header.module.css'

function Header() {
    const { userInfo, setUserInfo } = useContext(UserCtx);
    const history = useHistory();

    const logoutUser = () => {
        setUserInfo({ });
        sessionStorage.clear();

        if (window.location.pathname !== '/') history.push('/');
    }
    return (
        <header>
            <nav className={style.nav}>
                <Link className={[style.active, style.links].join(' ')} to="/">Home</Link>
                <NavLink activeStyle={{ backgroundColor: 'lightgreen' }} className={style.links} to="/listings">All Listings</NavLink>
                <NavLink activeStyle={{ backgroundColor: 'lightgreen' }} className={style.links} to="/filtered-by-year">By Year</NavLink>
                {
                    !userInfo.accessToken
                        ? <div className={style.guest}>
                            <NavLink activeStyle={{ backgroundColor: 'lightgreen' }} className={style.links} to="/auth/login">Login</NavLink>
                            <NavLink activeStyle={{ backgroundColor: 'lightgreen' }} className={style.links} to="/auth/register">Register</NavLink>
                        </div>
                        : <div className={style.profile}>
                            <strong className={style.links}><span id="welcome-message">{`Welcome, ${userInfo.username}`}</span></strong>
                            <NavLink activeStyle={{ backgroundColor: 'lightgreen' }} className={style.links} to="/cars/my-listings">My Listings</NavLink>
                            <Link className={style.links} to="/create">Create Listing</Link>
                            <Link className={style.links} onClick={logoutUser} id="logoutButton">Logout</Link>
                        </div>
                }
            </nav>
        </header>
    );
}

export default Header;