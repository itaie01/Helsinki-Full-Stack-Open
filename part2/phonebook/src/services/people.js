import axios from 'axios'

const serverURL = 'http://localhost:3001/api/phonebook'

const getPeople = () => {
    const request = axios.get(serverURL)
    return request.then(response => response.data)
}

const createPerson = personObject => {
    const request = axios.post(serverURL, personObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${serverURL}/${id}`)
    return request.then(response => response.data)
}

const modifyNumber = (modifiedPerson) => {
    const request = axios.put(`${serverURL}/${modifiedPerson.id}`, modifiedPerson)
    return request.then(response => response.data)
}

export default { getPeople, createPerson, deletePerson, modifyNumber }