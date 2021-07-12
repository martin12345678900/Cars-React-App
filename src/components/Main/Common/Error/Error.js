import style from './Error.module.css';

function Error({
    message
}) {
    return (
        <>
            <p className={style.error}>{message}</p>
        </>
    )
}

export default Error;