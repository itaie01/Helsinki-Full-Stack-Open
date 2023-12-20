import axios from 'axios'

const baseUrl = '/api/phonebook'

const getPeople = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const modifyNumber = (modifiedPerson) => {
    const request = axios.put(`${baseUrl}/${modifiedPerson.id}`, modifiedPerson)
    return request.then(response => response.data)
}

export default { getPeople, createPerson, deletePerson, modifyNumber }