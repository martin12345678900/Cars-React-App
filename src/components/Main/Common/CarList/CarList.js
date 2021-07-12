import { Link } from 'react-router-dom';

import style from './CarList.module.css'

function carList({
    _id,
    model,
    brand,
    price,
    imageUrl,
    year
}) {
    return (
        <div className={style.listing}>
            <div className={style.preview}>
                <img className={style.img} src={imageUrl} alt="carImage"/>
            </div>
            <h2 className={style.brand}>{brand} {model}</h2>
            <div className="info">
                <div className={style.data}>
                    <h3 className={style.charackteristics}>Year: {year}</h3>
                    <h3 className={style.charackteristics}>Price: {price} $</h3>
                </div>
                <div className="data-buttons">
                    <Link to={`/cars/details/${_id}`} className={style.details}>Details</Link>
                </div>
            </div>
        </div>
    );
}

export default carList;