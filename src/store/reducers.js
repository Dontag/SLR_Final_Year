import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const initialState = {
    setSnapData: null,
    setEnableClassifier: null
}

const setClassifierData = (state, action) => {
    return updateObject(state, {
        setSnapData: action.setSnapData
    })
}

const setClassifierEnable = (state, action) => {
    return updateObject(state, {
        setEnableClassifier: action.setEnableClassifier
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SNAPDATA: return setClassifierData(state, action);
        case actionTypes.ENABLE_CLASSIFIER: return setClassifierEnable(state, action);
        default: return state;
    }
};

export default reducer;