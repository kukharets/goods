import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { goBack, push } from 'react-router-redux';
import axios from 'axios/index';

import {
    FETCH_GOODS,
    CREATE_GOOD,
    EDIT_GOOD,
    DELETE_GOOD,
    FETCH_CATEGORIES,
    FETCH_TYPES,
    CREATE_CATEGORY,
    CREATE_TYPE,
    FETCH_GOOD,
    DELETE_TYPE,
    DELETE_CATEGORY,
} from './actionTypes';

import {
    fetchGoodSuccess,
    fetchGoodError,
    fetchGoodsSuccess,
    fetchGoodsError,
    createGoodSuccess,
    editGoodSuccess,
    deleteGoodSuccess,
    fetchCategoriesSuccess,
    fetchCategoriesError,
    fetchTypesSuccess,
    fetchTypesError,
    createCategorySuccess,
    createTypeSuccess,
    showErrorMessageEditCreateDelete,
    closeDialogCreateCategory,
    closeDialogCreateType,
    deleteCategorySuccess,
    deleteTypeSuccess,
} from './actions';
import cookiesController from "../../common/util/cookiesController";

const requestFetchGoods = () =>
    axios.get('/api/goods/')
        .then(goods => goods.data);

const requestFetchGoodsWithPagination = limit =>
    axios.get(`/api/goods/?limit=${limit}`)
        .then(goods => goods.data);

const requestCreateGood = goodData =>
    axios.post('/api/goods/', goodData)
        .then(good => good.data);

const requestEditGood = (id, goodData) =>
    axios.patch(`/api/goods/${id}/`, goodData)
        .then(good => good.data);

const requestDeleteGood = id =>
    axios.delete(`/api/goods/${id}/`)
        .then(() => id);

const requestFetchTypes = () =>
    axios.get('/api/types/')
        .then(types => types.data);

const requestFetchCategories = () =>
    axios.get('/api/categories/')
        .then(categories => categories.data);

const requestCreateType = typeData =>
    axios.post('/api/types/', typeData)
        .then(type => type.data);

const requestCreateCategory = categoryData =>
    axios.post('/api/categories/', categoryData)
        .then(category => category.data);

const requestFetchGood = id =>
    axios.get(`/api/goods/${id}/`)
        .then(good => good.data);

const requestDeleteType = id =>
    axios.delete(`/api/types/${id}/`)
        .then(() => id);


const requestDeleteCategory = id =>
    axios.delete(`/api/categories/${id}/`)
        .then(() => id);


function* fetchGoods({ payload }) {
    console.log(payload)
    try {
        if (payload) {
            const fetchedShops = yield call(requestFetchGoodsWithPagination, payload);
            yield put(fetchGoodsSuccess({
                list: fetchedShops.results,
                time: new Date().getTime(),
                count: fetchedShops.count,
            }));
        } else {
            const fetchedShops = yield call(requestFetchGoods);
            yield put(fetchGoodsSuccess({
                list: fetchedShops,
                time: new Date().getTime(),
            }));
        }
    } catch (error) {
        yield put(fetchGoodsError(error.message));
        cookiesController(error);
    }
}

function* createGood({ payload }) {
    try {
        const fetchedCreateShop = yield call(requestCreateGood, payload);
        yield put(createGoodSuccess(fetchedCreateShop));
        yield put(push('/app/goods/list'));
    } catch (error) {
        yield put(showErrorMessageEditCreateDelete(error));
    }
}

function* editGood({ payload }) {
    try {
        const { id, good } = payload;
        const fetchedEditShop = yield call(requestEditGood, id, good);
        yield put(editGoodSuccess(fetchedEditShop));
        yield put(goBack());
    } catch (error) {
        yield put(showErrorMessageEditCreateDelete(error));
    }
}

function* deleteGood({ payload }) {
    try {
        const { redirectToList, id } = payload;
        const fetchedDeleteGood = yield call(requestDeleteGood, id);
        yield put(deleteGoodSuccess(fetchedDeleteGood));
        if (redirectToList) {
            yield put(push('/app/goods/list'));
        }
    } catch (error) {
        yield put(showErrorMessageEditCreateDelete(error));
    }
}

function* fetchTypes() {
    try {
        const fetchedTypes = yield call(requestFetchTypes);
        yield put(fetchTypesSuccess({
            list: fetchedTypes,
            time: new Date().getTime(),
        }));
    } catch (error) {
        yield put(fetchCategoriesError(error.message));
    }
}

function* fetchCategories() {
    try {
        const fetchedCategories = yield call(requestFetchCategories);
        yield put(fetchCategoriesSuccess({
            list: fetchedCategories,
            time: new Date().getTime(),
        }));
    } catch (error) {
        yield put(fetchTypesError(error.message));
    }
}

function* createType({ payload }) {
    try {
        const fetchedCreateShop = yield call(requestCreateType, payload);
        yield put(createTypeSuccess(fetchedCreateShop));
        yield put(closeDialogCreateType());
    } catch (error) {
        yield put(showErrorMessageEditCreateDelete(error));
    }
}

function* createCategory({ payload }) {
    try {
        const fetchedCreateCategory = yield call(requestCreateCategory, payload);
        yield put(createCategorySuccess(fetchedCreateCategory));
        yield put(closeDialogCreateCategory());
    } catch (error) {
        yield put(showErrorMessageEditCreateDelete(error));
    }
}

function* fetchGood({ payload }) {
    try {
        const fetchedGood = yield call(requestFetchGood, payload);
        yield put(fetchGoodSuccess({
            data: fetchedGood,
            time: new Date().getTime(),
        }));
    } catch (error) {
        yield put(fetchGoodError(error.message));
    }
}

function* deleteType({ payload }) {
    try {
        const fetchedDeleteType = yield call(requestDeleteType, payload);
        yield put(deleteTypeSuccess(fetchedDeleteType));
    } catch (error) {
        yield put(showErrorMessageEditCreateDelete(error));
    }
}

function* deleteCategory({ payload }) {
    try {
        const fetchedDeleteCategory = yield call(requestDeleteCategory, payload);
        yield put(deleteCategorySuccess(fetchedDeleteCategory));
    } catch (error) {
        yield put(showErrorMessageEditCreateDelete(error));
    }
}

export function* sageCreateGood() {
    yield takeEvery(CREATE_GOOD, createGood);
}

export function* sageEditGood() {
    yield takeEvery(EDIT_GOOD, editGood);
}

export function* sageDeleteGood() {
    yield takeEvery(DELETE_GOOD, deleteGood);
}

export function* sageFetchGoods() {
    yield takeEvery(FETCH_GOODS, fetchGoods);
}

export function* sageFetchTypes() {
    yield takeEvery(FETCH_TYPES, fetchTypes);
}

export function* sageFetchCategories() {
    yield takeEvery(FETCH_CATEGORIES, fetchCategories);
}

export function* sageCreateType() {
    yield takeEvery(CREATE_TYPE, createType);
}

export function* sageCreateCategory() {
    yield takeEvery(CREATE_CATEGORY, createCategory);
}

export function* sageFetchGood() {
    yield takeEvery(FETCH_GOOD, fetchGood);
}

export function* sageDeleteType() {
    yield takeEvery(DELETE_TYPE, deleteType);
}

export function* sageDeleteCategory() {
    yield takeEvery(DELETE_CATEGORY, deleteCategory);
}

export default function* rootSaga() {
    yield all([
        fork(sageFetchGoods),
        fork(sageCreateGood),
        fork(sageEditGood),
        fork(sageDeleteGood),
        fork(sageFetchTypes),
        fork(sageFetchCategories),
        fork(sageCreateType),
        fork(sageCreateCategory),
        fork(sageFetchGood),
        fork(sageDeleteType),
        fork(sageDeleteCategory),
    ]);
}
