import {
    INIT_CARD_WATERFALL,
    ADD_CARD_WATERFALL,
    UPDATE_CARD_WATERFALL
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
    console.log('items', items)
    return {
        type: UPDATE_CARD_WATERFALL,
        items
    }
}
