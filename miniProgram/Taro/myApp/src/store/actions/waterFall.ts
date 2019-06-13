import {
    INIT_WATERFALL,
    UPDATE_WATERFALL
} from '../actionType/waterFall'

export const initWaterFall = (items=[]) => {
    return {
        type: INIT_WATERFALL,
        items
    }
}

export const updateWaterFall = (items=[]) => {
    return {
        type: UPDATE_WATERFALL,
        items
    }
}
