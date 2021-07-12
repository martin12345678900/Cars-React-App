import { useContext } from 'react';

import { carListingEdit, getCarById } from '../../../services/requests';

import { UserCtx } from '../../../Context/UserContext';
import useFetch from '../../../CustomHook/FetchDataCustomHook';

import style from './EditCar.module.css';

function EditCar({
    match,
    history,
}) {
    const { userInfo } = useContext(UserCtx);
    const carId = match.params.carId;

   const [car] = useFetch(getCarById, {}, carId);

    const onEditSubmitHandler = (ev) => {
        ev.preventDefault();
        const { brand, model, description, year, imageUrl, price } = ev.target;

        try {
            if (userInfo.userId !== car._ownerId) {
                throw new Error('You are not able to edit this record!');
            }
            return carListingEdit(
                carId,
                brand.value,
                model.value,
                description.value,
                year.value,
                imageUrl.value,
                price.value
            )
                .then(history.push(`/cars/details/${carId}`));
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className={style.container}>
            <form onSubmit={onEditSubmitHandler}>
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>

                <p>Car Brand</p>
                <input className={style.input} type="text" placeholder="Enter Car Brand" name="brand" defaultValue={car.brand} />

                <p>Car Model</p>
                <input className={style.input} type="text" placeholder="Enter Car Model" name="model" defaultValue={car.model} />

                <p>Description</p>
                <input className={style.input} type="text" placeholder="Enter Description" name="description" defaultValue={car.description} />

                <p>Car Year</p>
                <input className={style.input} type="number" placeholder="Enter Car Year" name="year" defaultValue={car.year} />

                <p>Car Image</p>
                <input className={style.input} type="text" placeholder="Enter Car Image" name="imageUrl" defaultValue={car.imageUrl} />

                <p>Car Price</p>
                <input className={style.input} type="number" placeholder="Enter Car Price" name="price" defaultValue={car.price} />

                <input type="submit" className={style.editbtn} value="Edit Listing" />
            </form>
        </div>
    );
}

export default EditCar;