import axios from 'axios';

const URL = 'http://127.0.0.1:5000';


//Users

export const getUsers = () => {return axios.get(`${URL}/users`)};

//!!! Add direct route on back end for full list of users
export const getUser = (user_id:string) => {
    return axios.get(`${URL}/users?user_id=${user_id}`)
    .then((response) => {
        return response.data
    });
};

export const getSingleUser = (user_id:string) => {
    return axios.get(`${URL}/users?user_id=${user_id}`)
}

export const addUserToGame = (game_id: string, user_id: string) => {
    return axios.patch(`${URL}/users?game_id=${game_id}&user_id=${user_id}`);
}

export const addUser = (user) => {
    return axios.post(`${URL}/users`, user);
}

//Games

export const getGames = () => {return axios.get(`${URL}/games`)};

export const addGame = (name: string) => {return axios.post(`${URL}/games`, {name})}

export const deleteGame = (game_id:string) => {return axios.delete(`${URL}/games?game_id=${game_id}`)}

export const renameGame = (name:string, game_id:string) => {return axios.patch(`${URL}/games?game_id=${game_id}`, {name})}

//Locations 

export const getLocation = (game_id:string, loc_id:string) => {
    return axios.get(`${URL}/games/locations?game_id=${game_id}&loc_id=${loc_id}`);
}

export const getLocations = (game_id:string) => {
    return axios.get(`${URL}/games/locations?game_id=${game_id}`);
}

export const deleteLocation = (game_id:string, loc_id:string) => {
    return axios.delete(`${URL}/games/locations?game_id=${game_id}&loc_id=${loc_id}`);
}

export const addNewLocation = (data, game_id:string) => {
    return axios.post(`${URL}/games/locations?game_id=${game_id}`, data);
}

export const renameLocation = (name:string, game_id:string, loc_id:string) => {
    return axios.patch(`${URL}/games/locations?game_id=${game_id}&loc_id=${loc_id}`, {name})
}

//Items

export const getLocationItems = (game_id:string, location_id:string) => {
    return axios.get(`${URL}/games/locations/items?game_id=${game_id}&loc_id=${location_id}`);
}

export const addNewItem = (item:{name:string, type:string, [key:string]:unknown}, game_id:string, location_id=null) => {
    if (!location_id) {
        return axios.post(`${URL}/games/items?game_id=${game_id}`, item);
    } else {
        return axios.post(`${URL}/games/items?game_id=${game_id}&loc_id=${location_id}`, item);
    }
}

export const deleteItem = (game_id:string, item_id:string) => {
    return axios.delete(`${URL}/games/items?game_id=${game_id}&item_id=${item_id}`);
}

export const moveItem = (new_loc:string, game_id:string, loc_id:string, item_id:string) => {
    return axios.patch(`${URL}/games/items/locations?game_id=${game_id}&loc_id=${loc_id}&item_id=${item_id}`, {loc_id: new_loc});
}

export const changeItemFields = (data:{[key:string]:unknown}, game_id:string, item_id:string) => {
    return axios.patch(`${URL}/games/items?game_id=${game_id}&item_id=${item_id}`, data);
}
