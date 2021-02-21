import {
    FILE_UPLOADING,
    CODE_SUBMIT_SUCCESS
} from '../actions/types'

const initialState = {
    output: null,
    json_data: {},
    isUploading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FILE_UPLOADING:
            return {
                ...state,
                json_data: undefined,
                isUploading: true
            };
        case CODE_SUBMIT_SUCCESS:
            return {
                ...state,
                output: action.payload
            }
        default:
            return state;
    }
}