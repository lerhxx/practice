import {
    INIT_CARD_WATERFALL,
    ADD_CARD_WATERFALL,
    UPDATE_CARD_WATERFALL
} from '@store/actionType/waterCardFall'
import { calcImageLocationInfo } from '@utils/waterFall'
import { INIT_COLUMNS } from '@constants/waterFall'

const INITIAL_STATE = {
    items: [],
    columns: [...INIT_COLUMNS]
}

export default function waterFall(state=INITIAL_STATE, action) {
    switch(action.type) {
        case INIT_CARD_WATERFALL:
            return {
                ...state,
                items: action.items
            }
        case ADD_CARD_WATERFALL:
            return {
                ...state,
                items: [ ...state.items, ...action.items ]
            }
        case UPDATE_CARD_WATERFALL:
                const calcInfo = calcImageLocationInfo([ ...action.items ], {
                    columns: [0,0]
                })
            return {
                ...state,
                ...calcInfo
            }
        default:
            return state
    }
}