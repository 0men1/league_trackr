// @ts-nocheck
import {champion_ids} from './champspells.js';


let pick_rate = "https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/championrates.json";
let champ_data = "https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json"


async function fetch_json(url) {
    let json = await fetch(url)
    .then(response => response.json());

    return json
}


let champ_rates = await fetch_json(pick_rate);
champ_rates = champ_rates['data'];
var patch = champ_rates['patch'];


// console.log(champ_rates['data'])


for(let champ = 1; champ <= 902; champ++) {
    let top,jg,mid,adc,sup;
    for(var role in champ_rates[champ]){
        top = champ_rates[champ][role];
        jg = champ_rates[champ][role];
        mid = champ_rates[champ][role];
        adc = champ_rates[champ][role];
        sup = champ_rates[champ][role];
        
    }
    console.log(top)

}



for(var champ in champ_rates['data']) {
    console.log(champ)
}

