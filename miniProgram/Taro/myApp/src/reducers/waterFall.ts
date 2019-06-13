import {
    INIT_WATERFALL,
    UPDATE_WATERFALL
} from '@store/actionType/waterFall'
import { calcImageLocationInfo } from '@utils/waterFall'
import { INIT_COLUMNS } from '@constants/waterFall'

const INITIAL_STATE = {
    items: [],
    columns: [...INIT_COLUMNS]
}

export default function waterFall(state=INITIAL_STATE, action) {
    switch(action.type) {
        case INIT_WATERFALL:
            const initCalcInfo = calcImageLocationInfo(action.items)
            return {
                ...state,
                ...initCalcInfo
            }
        case UPDATE_WATERFALL:
            const calcInfo = calcImageLocationInfo([ ...action.items ], {
                columns: state.columns
            })
            return {
                ...state,
                items: [ ...state.items, ...calcInfo.items ],
                columns: calcInfo.columns
            }
        default:
            return state
    }
}