const axios = require('axios')
const SteamUser = require('steam-user');
const baseUrl = 'https://store.steampowered.com/api/appdetails?appids='
const allAppsURL = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/'

// Need to go via the steam API to handle the large number of requests
const getValidGames = async potentialAppIDs => {
    return new Promise((resolve, reject) => {
        let client = new SteamUser();
        client.logOn({anonymous: true}); // Log onto Steam anonymously
    
        client.on('loggedOn', async (details) => {
            console.log("Logged onto Steam as " + client.steamID.steam3());
        
            console.log("Requesting appinfo for app");
            try {
                let result = await client.getProductInfo(potentialAppIDs, [], true); // Passing true as the third argument automatically requests access tokens, which are required for some apps
                console.log("Got app info:");

                const validGames = [];
                // Valid games are put in result.apps
                for (let appid in result.apps) {
                   
                    
                    const appinfo = result.apps[appid].appinfo;
                    if(appinfo.hasOwnProperty("common")) {{
                        // Debugging
                        /*
                        const gameName = result.apps[appid].appinfo.common.name;
                        if(gameName == 'Havoc' || gameName == "Vacoo" || gameName == "AlphaBlue") {
                            console.log(result.apps[appid].appinfo)
                        }
                        */
                        
                        let validGame = false;
                        // Some testapps have only name and gameid fields, so need to check if field exist.
                        if(appinfo.common.hasOwnProperty("releasestate")){
                            // Some results have no store page, but no field specifies this.
                            // They are usually prerelease games, or demos, so skip these.
                            // Also skip types like DLC & Music for now to reduce the amount of games the search bar need to handle.
                            if(appinfo.common.releasestate == "released" && appinfo.common.type == 'Game'){
                                validGame = true;
                            }
                        }


                        
                        if(validGame) {
                            const game = {
                                appID: appid,
                                name: appinfo.common.name,
                            };
                            validGames.push(game);
                        }
                    }}
                    
                }
                console.log("Logging off of Steam");
                client.logOff();
                resolve(validGames); // Resolve the promise with the app info
            } catch (error) {
                console.error("Error fetching app info:", error);
                reject(error); // Reject the promise with the error
            }
        });
    });
};


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
exports.getValidGames = getValidGames