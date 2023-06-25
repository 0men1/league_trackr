// @ts-nocheck
import axios from 'axios';
import {champion_ids, spell_ids} from './champspells.js';
const api_key = "?api_key=RGAPI-2c605771-b1f4-4f8b-a0c4-b900f41b92a9";

//Encodes league name to be used in url
export const encode_name = (name) => {
    if (name) {
        return name.split(" ").join("%20");
    }
}

//Check Account validitiy
export const check_account_validity = async (username) => {
    try {
      let user = encode_name(username);
      const account_url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ user + api_key;
      const response = await axios.get(account_url);
      console.log("true");
      return true;
    } catch (error) {
      return false;
    }
};
  
//Gets account into from league name
export const get_game_info = async (username) => {
    let user = encode_name(username);
    const account_url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ user + api_key;

    const response = await axios.get(account_url);
    const acc_data = {
        'id': response.data['id'],
        'puuid': response.data['puuid'],
        'name': response.data['name'],
        'level': response.data['summonerLevel'],
        'icon': response.data['profileIconId']
    };
    return acc_data;
}


//Sort the participants: give champ name, spell names, team, etc.
export const sort_participants = async (participants) => {
    var sorted_participants = [];
    for(var i = 0; i < participants.length; i++) {
        sorted_participants.push({
            'name': participants[i]['summonerName'],
            'id': participants[i]['summonerId'],

            'spell1': "Summoner" + spell_ids[[participants[i]['spell1Id']]][0],
            
            'cooldown1': spell_ids[[participants[i]['spell1Id']]][1],
            
            'spell2': "Summoner" + spell_ids[participants[i]['spell2Id']][0],
            
            'cooldown2': spell_ids[[participants[i]['spell2Id']]][1],
            
            'champion':champion_ids[[participants[i]['championId']]],
            'teamId': participants[i]['teamId'] == 100 ? 'blue' : 'red',
        });
    }
    return sorted_participants;
}


//Get the info from the game that the user is currently in    
export const get_current_game_info = async (summoner_id) => {
    const current_game_url = "https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+ summoner_id + api_key;
    return axios.get(current_game_url)
    .then(response => {
        return sort_participants(response.data.participants);
    })
}

export const get_spell_image = (spell_name) => {
    if (spell_name == "SummonerCleanse") {
        spell_name = "SummonerBoost";
    } else if (spell_name == "SummonerIgnite") {
        spell_name = "SummonerDot";
    } else if (spell_name == "SummonerGhost") {
        spell_name = "SummonerHaste";
    }
    return "http://ddragon.leagueoflegends.com/cdn/13.11.1/img/spell/" + spell_name + ".png";
}

export const  get_champ_image = (champ_name) => {
    return "http://ddragon.leagueoflegends.com/cdn/13.11.1/img/champion/" + champ_name + ".png";
}

export const get_spell_cooldown = (spell_name) => {

}


/*
1. Get Name
2. Get Account Info [Id, puuid, name, level, icon]
3. Get Current Game info [gameId, gameStartTime, gameLength, participants]

*/


// check_account_validity("tarzaned korea");
// const user_info = await get_game_info("tarzaned korea")
// .then(response =>{
//     return response;
// });
// // console.log(user_info);
// var current_game = await get_current_game_info(user_info['id']).then(response => {return response});
// // console.log(current_game)

// var blue_team = [];
// var red_team = [];
// for(var i = 0; i < 10; i++) {
//     if (current_game[i]['teamId'] == 'blue') {
//         blue_team.push(current_game[i]);
//     } else {
//         red_team.push(current_game[i]);
//     }
// }
// console.log(blue_team);
// get_spell_image(current_game[0]['spell2']);
