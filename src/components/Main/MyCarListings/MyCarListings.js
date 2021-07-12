import { useContext } from 'react';

import { getMyCars } from '../../../services/requests';
import { UserCtx } from '../../../Context/UserContext';
import CarList from '../Common/CarList/CarList';
import Loader from '../Common/Loader/Loader';

import useFetch from '../../../CustomHook/FetchDataCustomHook';

import style from './MyCarListings.module.css';


function MyCarListings({
    history
}) {
    const { userInfo } = useContext(UserCtx);

    const [myCars, isCars] = useFetch(getMyCars, [], userInfo.userId);

    return (
        <section id="my-listings">
            <h1 className={style.mytitle}>My car listings</h1>
            <div className={style.mylistings}>
                {
                    !isCars
                        ? <Loader />
                        : myCars.length === 0 ? <p className={style.empty}> You haven't listed any cars yet.</p> : myCars.map(car =>
                            <CarList key={car._id} {...car}
                        />)
                }
            </div>
        </section>
    )
}

export default MyCarListings;