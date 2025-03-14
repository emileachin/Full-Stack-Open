import axios from "axios"

const url = "http://localhost:3001/persons"

const get = () => {
    return axios.get(url).then(response => response.data)
}

const create = (object) => {
    return axios.post(url, object).then(response => response.data)
}

const update = (id, object) => {
    return axios.put(`${url}/${id}`, object).then(response => response.data)
}

const destroy = (id) => {
    return axios.delete(`${url}/${id}`).then(response => response.data)
}

export default { get, create, update, destroy }  