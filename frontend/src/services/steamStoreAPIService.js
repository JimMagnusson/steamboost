import axios from 'axios'
const baseUrl = 'https://store.steampowered.com/api/appdetails?appids='

const getStorePageDetails = appID => {
    const request = axios.get(`${baseUrl}${appID}`)
    return request.then(response => response.data[appID])
}

const steamStoreAPIService = {
    getStorePageDetails: getStorePageDetails
};
  
export default steamStoreAPIService;