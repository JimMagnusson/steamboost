const axios = require('axios')
const baseUrl = 'https://store.steampowered.com/api/appdetails?appids='
const allAppsURL = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/'

const getStorePageDetails = appID => {
    const request = axios.get(`${baseUrl}${appID}`)
    return request.then(response => response.data[appID])
}

const getAllApps = () => {
    const request = axios.get(allAppsURL)
    return request.then(response => response.data.applist.apps)
}

exports.getStorePageDetails = getStorePageDetails
exports.getAllApps = getAllApps