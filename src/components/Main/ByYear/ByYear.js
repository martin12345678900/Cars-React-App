import style from './ByYear.module.css';

function ByYear({
    history
}) {
    const onSearchSubmitHandler = (ev) => {
        ev.preventDefault();
        const searchInput = ev.target.search.value;
        
        return history.push(`/cars/${searchInput}`);
    }

    return (
        <section className={style.searchCars}>
            <h1>Filter by year</h1>

            <form onSubmit={onSearchSubmitHandler} className={style.container}>
                <input className={style.searchInput} id="search-input" type="text" name="search" placeholder="Enter desired production year" />
                <button className={style.buttonList}>Search</button>
            </form>
        </section>
    );
}

export default ByYear;