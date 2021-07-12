import style from './Listings.module.css';

import CarList from '../Common/CarList/CarList';
import Loader from '../Common/Loader/Loader';
import { getAllListings } from '../../../services/requests';

import useFetch from '../../../CustomHook/FetchDataCustomHook';

function Listings() {
    const [cars, isCars] = useFetch(getAllListings, []);

    return (
        <section id="car-listings">
            <h1 className={style.title}>Car Listings</h1>
            <div className={style.listings}>
                {
                    !isCars
                        ? <Loader />
                        : cars.length === 0 ? <p className={style.empty}> You haven't listed any cars yet.</p> : cars.map(car => <CarList
                            key={car._id}
                            {...car}
                        />)
                }
            </div>
        </section>
    )
}

export default Listings;