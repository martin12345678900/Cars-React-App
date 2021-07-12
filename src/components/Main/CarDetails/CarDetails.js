import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { getCarById, carListingDelete } from '../../../services/requests';
import Loader from '../Common/Loader/Loader';
import style from './CarDetails.module.css';

import { UserCtx } from '../../../Context/UserContext';

import useFetch from '../../../CustomHook/FetchDataCustomHook';


function CarDetails({
    match,
    history,
}) {
    const { userInfo } = useContext(UserCtx);
    const carId = match.params.carId;

    const [carDetails, isCar] = useFetch(getCarById, {} , carId);

    const deleteCurrentCar = () => {
        if (window.confirm('Are u sure u want to delete this recored ?!')) {
            try {
                if (userInfo.userId !== carDetails._ownerId) {
                    throw new Error('You are not able to delete records!');
                }
                return carListingDelete(carId)
                    .then(history.push('/listings'));
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <>
            {
                !isCar
                    ? <Loader />
                    : <section id="listing-details">
                        <h1 style={{ textAlign: 'center', fontSize: 45, marginTop: 10 }}>Details</h1>
                        <div className={style.detailsinfo}>
                            <img className={style.detailsinfoimg} src={carDetails.imageUrl} alt="carDetailsImg" />

                            <ul className={style.listingprops}>
                                <li className={style.listingprop}><span className={style.listingspan}>Brand:</span>{carDetails.brand}</li>
                                <li className={style.listingprop}><span className={style.listingspan}>Model:</span>{carDetails.model}</li>
                                <li className={style.listingprop}><span className={style.listingspan}>Year:</span>{carDetails.year}</li>
                                <li className={style.listingprop}><span className={style.listingspan}>Price:</span>{carDetails.price}$</li>
                            </ul>

                            <p className={style.descriptionpara}>
                                {carDetails.description}
                            </p>

                            <div className={style.listingsbuttons}>
                                <Link to={`/cars/edit/${carId}`} className={style.buttonlist}>Edit</Link>
                                <button onClick={deleteCurrentCar} className={style.buttonlist}>Delete</button>
                            </div>
                        </div>
                    </section>
            }
        </>
    );
}

export default CarDetails;