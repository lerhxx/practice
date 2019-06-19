import {
    INIT_CARD_WATERFALL,
    ADD_CARD_WATERFALL,
    UPDATE_CARD_WATERFALL,
    UPDATE_CARD_ITEM_WATERFALL
} from '../actionType/waterCardFall'

export const initCardWaterFall = (items=[]) => {
    return {
        type: INIT_CARD_WATERFALL,
        items
    }
}

export const addCardWaterFall = (items=[]) => {
    return {
        type: ADD_CARD_WATERFALL,
        items
    }
}

export const updateCardWaterFall = (items=[]) => {
    return {
        type: UPDATE_CARD_WATERFALL,
        items
    }
}

export const updateCardItemWaterFall = (item={}) => {
    return {
        type: UPDATE_CARD_ITEM_WATERFALL,
        item
    }
}

export const asyncUpdateCardItemWaterFall = (item={}, cb) => {
    return dispatch =>{
        dispatch({
            type: UPDATE_CARD_ITEM_WATERFALL,
            item
        })
        cb()
    }
}
