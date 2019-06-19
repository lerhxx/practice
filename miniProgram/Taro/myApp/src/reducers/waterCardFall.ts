import {
    INIT_CARD_WATERFALL,
    ADD_CARD_WATERFALL,
    UPDATE_CARD_WATERFALL,
    UPDATE_CARD_ITEM_WATERFALL
} from '@store/actionType/waterCardFall'
import { calcImageLocationInfo, initColumns } from '@utils/waterFallCard'

const INITIAL_STATE = {
    items: [],
    columns: initColumns()
}

export default function waterFall(state=INITIAL_STATE, action) {
    switch(action.type) {
        case INIT_CARD_WATERFALL:
            return {
                ...state,
                items: action.items
            }
        case ADD_CARD_WATERFALL:
            const newAddItems = [ ...state.items, ...action.items ]
            const calcAddItems = calcImageLocationInfo(newAddItems, {
                columns: [0,0]
            })
            return {
                ...state,
                ...calcAddItems
            }
        case UPDATE_CARD_WATERFALL:
                const calcInfo = calcImageLocationInfo([ ...action.items ], {
                    columns: [0,0]
                })
            return {
                ...state,
                ...calcInfo
            }
        case UPDATE_CARD_ITEM_WATERFALL:
            const newItems = state.items.map(item => (action.item.id === item.id ? action.item : item))
            const calcItems = calcImageLocationInfo(newItems, {
                columns: [0,0]
            })
            return {
                ...state,
                ...calcItems
            }
        default:
            return state
    }
}