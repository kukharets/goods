import {
    FETCH_GOODS,
    FETCH_GOODS_SUCCESS,
    FETCH_GOODS_ERROR,
    FETCH_GOOD,
    FETCH_GOOD_SUCCESS,
    FETCH_GOOD_ERROR,
    CREATE_GOOD,
    CREATE_GOOD_SUCCESS,
    EDIT_GOOD,
    EDIT_GOOD_SUCCESS,
    DELETE_GOOD,
    DELETE_GOOD_SUCCESS,
    FETCH_TYPES,
    FETCH_TYPES_SUCCESS,
    FETCH_TYPES_ERROR,
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_ERROR,
    CREATE_TYPE,
    CREATE_TYPE_SUCCESS,
    CREATE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    SHOW_ERROR_MESSAGE_EDIT_CREATE_DELETE,
    HIDE_ERROR_MESSAGE_EDIT_CREATE_DELETE,
    OPEN_DIALOG_CREATE_TYPE,
    OPEN_DIALOG_CREATE_CATEGORY,
    CLOSE_DIALOG_CREATE_TYPE,
    CLOSE_DIALOG_CREATE_CATEGORY,
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_TYPE,
    DELETE_TYPE_SUCCESS,
} from './actionTypes';

export const fetchGoods = params => ({
    type: FETCH_GOODS,
    payload: params,
});

export const fetchGoodsSuccess = goods => ({
    type: FETCH_GOODS_SUCCESS,
    payload: goods,
});

export const fetchGoodsError = error => ({
    type: FETCH_GOODS_ERROR,
    payload: error,
});

export const fetchGood = id => ({
    type: FETCH_GOOD,
    payload: id,
});

export const fetchGoodError = error => ({
    type: FETCH_GOOD_ERROR,
    payload: error,
});

export const fetchGoodSuccess = good => ({
    type: FETCH_GOOD_SUCCESS,
    payload: good,
});

export const createGood = good => ({
    type: CREATE_GOOD,
    payload: good,
});

export const createGoodSuccess = good => ({
    type: CREATE_GOOD_SUCCESS,
    payload: good,
});

export const editGood = (id, good) => ({
    type: EDIT_GOOD,
    payload: {
        id,
        good,
    },
});

export const editGoodSuccess = good => ({
    type: EDIT_GOOD_SUCCESS,
    payload: good,
});

export const deleteGood = (id, redirectToList) => ({
    type: DELETE_GOOD,
    payload: {
        id,
        redirectToList,
    },
});

export const deleteGoodSuccess = id => ({
    type: DELETE_GOOD_SUCCESS,
    payload: id,
});

export const fetchTypes = () => ({
    type: FETCH_TYPES,
});

export const fetchTypesSuccess = types => ({
    type: FETCH_TYPES_SUCCESS,
    payload: types,
});

export const fetchTypesError = error => ({
    type: FETCH_TYPES_ERROR,
    payload: error,
});

export const fetchCategories = () => ({
    type: FETCH_CATEGORIES,
});

export const fetchCategoriesSuccess = goods => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: goods,
});

export const fetchCategoriesError = error => ({
    type: FETCH_CATEGORIES_ERROR,
    payload: error,
});

export const createType = type => ({
    type: CREATE_TYPE,
    payload: type,
});

export const createTypeSuccess = type => ({
    type: CREATE_TYPE_SUCCESS,
    payload: type,
});


export const createCategory = category => ({
    type: CREATE_CATEGORY,
    payload: category,
});

export const createCategorySuccess = category => ({
    type: CREATE_CATEGORY_SUCCESS,
    payload: category,
});

export const showErrorMessageEditCreateDelete = message => ({
    type: SHOW_ERROR_MESSAGE_EDIT_CREATE_DELETE,
    payload: message,
});

export const hideErrorMessageEditCreateDelete = () => ({
    type: HIDE_ERROR_MESSAGE_EDIT_CREATE_DELETE,
});

export const openDialogCreateType = () => ({
    type: OPEN_DIALOG_CREATE_TYPE,
});

export const openDialogCreateCategory = () => ({
    type: OPEN_DIALOG_CREATE_CATEGORY,
});

export const closeDialogCreateType = () => ({
    type: CLOSE_DIALOG_CREATE_TYPE,
});

export const closeDialogCreateCategory = () => ({
    type: CLOSE_DIALOG_CREATE_CATEGORY,
});


export const deleteCategory = id => ({
    type: DELETE_CATEGORY,
    payload: id,
});

export const deleteCategorySuccess = id => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: id,
});

export const deleteType = id => ({
    type: DELETE_TYPE,
    payload: id,
});

export const deleteTypeSuccess = id => ({
    type: DELETE_TYPE_SUCCESS,
    payload: id,
});
