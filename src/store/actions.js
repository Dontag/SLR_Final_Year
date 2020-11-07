import * as actionTypes from './actionTypes';

export const setClassifierData = (setSnapData) => {
    return {
        type: actionTypes.SET_SNAPDATA,
        setSnapData: setSnapData
    };
}

export const setClassifierEnable = (setEnableClassifier) => {
    return {
        type: actionTypes.ENABLE_CLASSIFIER,
        setEnableClassifier: setEnableClassifier
    };
}