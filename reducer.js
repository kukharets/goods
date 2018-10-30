import {
    FETCH_GOODS,
    FETCH_GOODS_SUCCESS,
    FETCH_GOODS_ERROR,
    FETCH_GOOD,
    FETCH_GOOD_SUCCESS,
    FETCH_GOOD_ERROR,
    CREATE_GOOD_SUCCESS,
    EDIT_GOOD_SUCCESS,
    DELETE_GOOD_SUCCESS,
    FETCH_TYPES,
    FETCH_TYPES_SUCCESS,
    FETCH_TYPES_ERROR,
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_ERROR,
    CREATE_CATEGORY_SUCCESS,
    CREATE_TYPE_SUCCESS,
    SHOW_ERROR_MESSAGE_EDIT_CREATE_DELETE,
    HIDE_ERROR_MESSAGE_EDIT_CREATE_DELETE,
    OPEN_DIALOG_CREATE_CATEGORY,
    OPEN_DIALOG_CREATE_TYPE,
    CLOSE_DIALOG_CREATE_CATEGORY,
    CLOSE_DIALOG_CREATE_TYPE,
    DELETE_TYPE_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
    openedDialogCreateType: false,
    openedDialogCreateCategory: false,
    showErrorMessage: false,
    errorObject: null,
    storeListGoods: {
        fetchError: false,
        fetchErrorMessage: '',
        fetchTime: 0,
        fetch: false,
        list: [],
        emptyMessage: 'List empty',
    },
    storeItemGood: {
        fetchError: false,
        fetchErrorMessage: '',
        fetchTime: 0,
        fetch: false,
        data: {},
    },
    storeListTypes: {
        fetchError: false,
        fetchErrorMessage: '',
        fetchTime: 0,
        fetch: false,
        list: [],
        emptyMessage: 'List empty',
    },
    storeListCategories: {
        fetchError: false,
        fetchErrorMessage: '',
        fetchTime: 0,
        fetch: false,
        list: [],
        emptyMessage: 'List empty',
    },
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
    case FETCH_GOODS:
        return {
            ...state,
            storeListGoods: {
                ...state.storeListGoods,
                fetch: true,
                fetchError: false,
                errorObject: null,
            },
        };
    case FETCH_GOODS_SUCCESS: {
        const { list, time, count } = action.payload;
        const prevCount = state.storeListGoods.count;
        return {
            ...state,
            storeListGoods: {
                ...state.storeListGoods,
                list,
                fetch: false,
                fetchTime: time,
                count: count || prevCount,
            },
        };
    }
    case FETCH_GOODS_ERROR: {
        return {
            ...state,
            storeListGoods: {
                ...state.storeListGoods,
                fetch: false,
                fetchError: true,
                fetchErrorMessage: action.payload,
            },
        };
    }
    case FETCH_GOOD: {
        return {
            ...state,
            storeItemGood: {
                ...state.storeItemGood,
                fetch: true,
                fetchError: false,
                fetchErrorMessage: '',
                data: {},
            },
        };
    }
    case FETCH_GOOD_ERROR:
        return {
            ...state,
            storeItemGood: {
                ...state.storeItemGood,
                fetch: false,
                fetchError: true,
                fetchErrorMessage: action.payload,
            },
        };
    case FETCH_GOOD_SUCCESS: {
        const { data, time } = action.payload;
        return {
            ...state,
            storeItemGood: {
                ...state.storeItemGood,
                data,
                fetch: false,
                fetchTime: time,
            },
        };
    }
    case EDIT_GOOD_SUCCESS: {
        const { id } = action.payload;
        const newList = [];
        const oldList = state.storeListGoods.list;
        let newItemData = state.storeItemGood.data;
        if (id === newItemData.id) {
            newItemData = action.payload;
        }

        oldList.forEach((item) => {
            if (item.id !== id) {
                newList.push(item);
            } else {
                newList.push(action.payload);
            }
        });

        return {
            ...state,
            storeItemGood: {
                ...state.storeItemGood,
                data: newItemData,
            },
            storeListGoods: {
                ...state.storeListGoods,
                list: newList,
            },
        };
    }
    case CREATE_GOOD_SUCCESS:
        return {
            ...state,
            createEditShopStatus: false,
            storeListGoods: {
                ...state.storeListGoods,
                list: [
                    ...state.storeListGoods.list,
                    action.payload,
                ],
            },
        };
    case DELETE_GOOD_SUCCESS: {
        return {
            ...state,
            storeListGoods: {
                ...state.storeListGoods,
                list: state.storeListGoods.list.filter(good => good.id !== action.payload),
            },
        };
    }
    case FETCH_TYPES:
        return {
            ...state,
            storeListTypes: {
                ...state.storeListTypes,
                fetch: true,
                fetchError: false,
                fetchErrorMessage: '',
            },
        };
    case FETCH_TYPES_SUCCESS: {
        const { list, time } = action.payload;
        return {
            ...state,
            storeListTypes: {
                ...state.storeListTypes,
                list,
                fetch: false,
                fetchTime: time,
            },
        };
    }
    case FETCH_TYPES_ERROR: {
        return {
            ...state,
            storeListTypes: {
                ...state.storeListTypes,
                fetch: false,
                fetchError: true,
                fetchErrorMessage: action.payload,
            },
        };
    }
    case FETCH_CATEGORIES:
        return {
            ...state,
            storeListCategories: {
                ...state.storeListCategories,
                fetch: true,
                fetchError: false,
                fetchErrorMessage: '',
            },
        };
    case FETCH_CATEGORIES_SUCCESS: {
        const { list, time } = action.payload;
        return {
            ...state,
            storeListCategories: {
                ...state.storeListCategories,
                list,
                fetch: false,
                fetchTime: time,
            },
        };
    }
    case FETCH_CATEGORIES_ERROR: {
        return {
            ...state,
            storeListCategories: {
                ...state.storeListCategories,
                fetch: false,
                fetchError: true,
                fetchErrorMessage: action.payload,
            },
        };
    }
    case SHOW_ERROR_MESSAGE_EDIT_CREATE_DELETE: {
        return {
            ...state,
            errorObject: action.payload,
            showErrorMessage: true,
        };
    }
    case HIDE_ERROR_MESSAGE_EDIT_CREATE_DELETE: {
        return {
            ...state,
            errorObject: null,
            showErrorMessage: false,
        };
    }
    case CREATE_CATEGORY_SUCCESS: {
        return {
            ...state,
            openDialogCreateCategory: false,
            storeListCategories: {
                ...state.storeListCategories,
                list: [
                    ...state.storeListCategories.list,
                    action.payload,
                ],
            },
        };
    }
    case CREATE_TYPE_SUCCESS: {
        return {
            ...state,
            openDialogCreateType: false,
            storeListTypes: {
                ...state.storeListTypes,
                list: [
                    ...state.storeListTypes.list,
                    action.payload,
                ],
            },
        };
    }
    case OPEN_DIALOG_CREATE_CATEGORY: {
        return {
            ...state,
            openedDialogCreateCategory: true,
        };
    }
    case OPEN_DIALOG_CREATE_TYPE: {
        return {
            ...state,
            openedDialogCreateType: true,
        };
    }
    case CLOSE_DIALOG_CREATE_CATEGORY: {
        return {
            ...state,
            openedDialogCreateCategory: false,
        };
    }
    case CLOSE_DIALOG_CREATE_TYPE: {
        return {
            ...state,
            openedDialogCreateType: false,
        };
    }

    case DELETE_TYPE_SUCCESS: {
        return {
            ...state,
            storeListTypes: {
                ...state.storeListTypes,
                list: state.storeListTypes.list.filter(type => type.id !== action.payload),
            },
        };
    }
    case DELETE_CATEGORY_SUCCESS: {
        return {
            ...state,
            storeListCategories: {
                ...state.storeListCategories,
                list: state.storeListCategories
                    .list.filter(category => category.id !== action.payload),
            },
        };
    }
    default:
        return state;
    }
};
