import axios from 'axios'
const baseUrl = 'http://localhost:3001/store-page-comparison'

const getStorePageDetails = () => {
    const request = axios.post(baseUrl)
    return request.then(response => response.data)
}

export default { 
    getStorePageDetails: getStorePageDetails, 
}