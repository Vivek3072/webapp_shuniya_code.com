import axios from 'axios';
import store from '../store.js'

import {
    FILE_UPLOADING,
    CODE_SUBMIT_SUCCESS
} from './types'

export const editing = (code_file_name,code_input_b64,code_text_b64,input_flag) => {
    return (dispatch) => {
        dispatch({ type: FILE_UPLOADING});
    //     const formData = new FormData();
    
    // formData.append( "code_file_name", code_file_name)
    // formData.append( "code_input_b64", code_input_b64)
    // formData.append( "code_text_b64", code_text_b64)
    // formData.append( "input_flag", input_flag)

    const postBody = 
    {
    "code_file_name":code_file_name,
    "code_input":code_input_b64,
    "code_text_b64":code_text_b64,
    "input_flag":input_flag
    }
    var postContent = JSON.stringify(postBody)
  const headers = {
      'Content-Type': "application/json"
  }
    const res = axios.post("http://ec2-13-232-16-70.ap-south-1.compute.amazonaws.com:8000/api/v1/web_ide/", postContent, headers)
    .then( res => {
        dispatch({
            type: CODE_SUBMIT_SUCCESS,
            payload: res.data,
            
        })
    })
}
}

// export const editing = (input_file_name, code_file_name, mobile_number,input_flag ) => {
//     return (dispatch) => {
//         dispatch({ type: FILE_UPLOADING});
//         const formData = new FormData();
    
//     formData.append('input_file_name', input_file_name)
//     formData.append('code_file_name', code_file_name)
//     formData.append('mobile_number', mobile_number)
//     formData.append('input_flag', input_flag)

//     const res = axios.post("http://ec2-13-232-16-70.ap-south-1.compute.amazonaws.com:8000/api/v1/expp/", formData)
//     .then( res => {
//         dispatch({
//             type: CODE_SUBMIT_SUCCESS,
//             payload: res.data,
            
//         })
//     })
// }
// }