import { get, post, put, del } from './my-api.js';

async function register(username, password) {
    return await post('/users/register', { username, password });
}

async function login(username, password) {
    return await post('/users/login', { username, password });
}

async function getAllListings() {
    return await get('/data/cars?sortBy=_createdOn%20desc');
}

async function createCarListing(brand, model, description, year, imageUrl, price) {
    return await post('/data/cars', { brand, model, description, year, imageUrl, price });
}

async function carListingEdit(id, brand, model, description, year, imageUrl, price) {
    return await put('/data/cars/' + id, { brand, model, description, year, imageUrl, price });
}

async function carListingDelete(id) {
    return await del('/data/cars/'+ id);
}

async function getCarById(id) {
    return await get('/data/cars/' + id);
}

async function getMyCars(userId) {
    return await get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

async function carListingsSearch(searchQuery) {
    return await get(`/data/cars?where=year%3D${searchQuery}`);
}

export {
    carListingsSearch,
    carListingDelete,
    carListingEdit,
    createCarListing,
    getCarById,
    getAllListings,
    getMyCars,
    login,
    register
}