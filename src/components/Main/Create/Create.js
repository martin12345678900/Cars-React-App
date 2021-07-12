import { createCarListing } from '../../../services/requests';

import style from './Create.module.css';

function Create({
    history,
}) {
    const onCreateSubmitHandler = (ev) => {
        ev.preventDefault();
        const { brand, model, description, year, imageUrl, price } = ev.target;

        return createCarListing(
            brand.value,
            model.value,
            description.value,
            year.value,
            imageUrl.value,
            price.value
        )
            .then(history.push('/listings'));
    };
    return (
        <div className={style.container}>
            <form onSubmit={onCreateSubmitHandler}>
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>

                <p>Car Brand</p>
                <input className={style.text} type="text" placeholder="Enter Car Brand" name="brand" />

                <p>Car Model</p>
                <input className={style.text} type="text" placeholder="Enter Car Model" name="model" />

                <p>Description</p>
                <input className={style.text} type="text" placeholder="Enter Description" name="description" />

                <p>Car Year</p>
                <input className={style.number} type="number" placeholder="Enter Car Year" name="year" />

                <p>Car Image</p>
                <input className={style.text} type="text" placeholder="Enter Car Image" name="imageUrl" />

                <p>Car Price</p>
                <input className={style.number} type="number" placeholder="Enter Car Price" name="price" />

                <input type="submit" className={style.createbtn} value="Create Listing" />
            </form>
        </div>
    )
}


export default Create;