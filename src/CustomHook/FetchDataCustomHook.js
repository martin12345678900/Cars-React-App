import { useState, useEffect } from 'react';


function useFetch(requestHandler, initialValue, param = undefined) {
    const [state, setState] = useState(initialValue);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        return requestHandler(param)
            .then(response => {
                setState(response)
                setIsEmpty(true);
            });
    }, [param, requestHandler]);

    return [
        state,
        isEmpty
    ]
}

export default useFetch;