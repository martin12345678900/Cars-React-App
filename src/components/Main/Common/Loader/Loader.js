import style from './Loader.module.css';

function Loader() {
    return (
        <div className={style.loaderContainer}>
            <h2 className={style.loaderHeading}>Please wait<span>.</span><span>.</span><span>.</span></h2>
            <div className={style.loaderAnimation}></div>
        </div>
    )
}

export default Loader;