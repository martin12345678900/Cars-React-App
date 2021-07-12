async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok === false) {
            const errorMessage = await response.json().message;
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch(error) {
        alert(error.message);
        throw error;
    }
}

function setOptions(method, data = undefined) {
    const options = {
        method,
        headers: {}
    }

    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    if (data) {
        options.body = JSON.stringify(data);
        options.headers['Content-Type'] = 'application/json';
    }

    return options;
}

const host = 'http://localhost:3030';

async function get(url) {
    return await request(host + url, setOptions('get'));
}

async function post(url, data) {
    return await request(host + url, setOptions('post', data));
}

async function put(url, data) {
    await request(host + url, setOptions('put', data));
}

async function del(url) {
    await request(host + url, setOptions('delete'));
}

export {
    get,
    post,
    put,
    del
}