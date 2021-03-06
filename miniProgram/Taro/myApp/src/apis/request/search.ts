import Request from '@utils/request'
import { NOTE_LIST } from '../waterFall'

function searchNote(params) {
    return Request({
            ...NOTE_LIST,
            data: params
        })
}

export { 
    searchNote
}
