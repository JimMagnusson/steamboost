import axios from 'axios'
const baseUrl = 'http://localhost:3001/generate-short-description'

const getNewShortDescription = keywordsObject => {
    const request = axios.post(baseUrl, keywordsObject)
    return request.then(response => response.data)
}

export default { 
    getNewShortDescription: getNewShortDescription, 
}