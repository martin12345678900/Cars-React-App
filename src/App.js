import './App.css';

import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Main/Home/Home';
import Create from './components/Main/Create/Create';
import Listings from './components/Main/Listings/Listings';
import Register from './components/Main/Register/Register';
import Login from './components/Main/Login/Login';
import CarDetails from './components/Main/CarDetails/CarDetails';
import EditCar from './components/Main/EditCar/EditCar';
import myCarListings from './components/Main/MyCarListings/MyCarListings';
import ByYear from './components/Main/ByYear/ByYear';
import SearchResultByYear from './components/Main/SearchResultByYear/SearchResultByYear';
import Footer from './components/Footer/Footer';

import { UserCtx } from './Context/UserContext';

function App() {
    const [userInfo, setUserInfo] = useState(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        const userId = sessionStorage.getItem('_id');
        const username = sessionStorage.getItem('username');

        if (!accessToken) {
            return { };
        }

        return {
            accessToken,
            userId,
            username
        }
    });
    return (
        <>
            <UserCtx.Provider value={{ userInfo, setUserInfo }}>
                <Header />

                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create" exact component={Create} />
                    <Route path="/listings" exact component={Listings} />
                    <Route path="/auth/register" exact component={Register} />
                    <Route path="/auth/login" exact component={Login} />
                    <Route path="/cars/details/:carId" exact component={CarDetails} />
                    <Route path="/cars/edit/:carId" exact component={EditCar} />
                    <Route path="/cars/my-listings" exact component={myCarListings} />
                    <Route path="/filtered-by-year" exact component={ByYear} />
                    <Route path="/cars/:year" exact component={SearchResultByYear} />
                </Switch>
            </UserCtx.Provider>

            <Footer />
        </>
    );
}

export default App;
