import style from './Home.module.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <section className={style.main}>
            <div className={style.container}>
                <h1 className={style.header}>Welcome To Car Tube</h1>
                <img className={style.hero} src="car-png.png" alt="carIntro" />
                <h2 className={style.see}>To see all the listings click the link below:</h2>
                <div>
                    <Link to="/listings" className={style.button}>Listings</Link>
                </div>
            </div>
        </section>
    )
}

export default Home;