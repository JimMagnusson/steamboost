import axios from 'axios'
const baseUrl = 'https://steamspy.com/api.php?request=appdetails&appid='

const getTags = appID => {
    const request = axios.get(`${baseUrl}${appID}`)
    return request.then(response => response.data.tags)
}

const steamSpyAPIService = {
    getTags: getTags
};
  
export default steamSpyAPIService;