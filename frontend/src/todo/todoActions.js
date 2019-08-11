import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGE',
    payload: event.target.value  
})

export const search = () => {
    const request = axios.get(`${URL}?sort=-createAt`)
    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

export const add = (description) => {
    const request = axios.post(URL, { description })
    console.log({ description })
    return {
        type: 'TODO_ADDED',
        payload: request
    }
}