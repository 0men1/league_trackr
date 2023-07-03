// @ts-nocheck

import {useState} from '../hooks.js'



export let user = "";
export let region = "";

export const handleSummmonerNameSubmit = async (e) => {
  
  const formData = new FormData(e.target);
  const data = {};

  for (let field of formData) {
    const [key, value] = field;
    data[key] = value;
  }
  
  user = data.user_name;
  region = document.querySelector('#dropdown-button').innerText;
  
  if (user == "") {
    alert("Please enter a summoner name");
    return;
  }
  const json_data = {
    'user': user,
    'region': region
  }

  
  saveData(json_data);


  if (region == "Region:") {
    window.location.href = `playerdisplay/?user=${user}?region=NA/`
  } else {
    window.location.href = `playerdisplay/?user=${user}?region=${region}/`
  }
}



function saveData(data) {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('data.json', jsonData);
}




export const handleDropdown = () => {
    const menu  = document.querySelector('#menu');
    menu.classList.toggle('hidden'); 
}

export const handleChoiceClick = (e) => {
  const menu  = document.querySelector('#menu');
  menu.classList.toggle('hidden'); 

  const button = document.querySelector('#dropdown-button');
  button.innerText = e.target.innerText;
}

export const on_mouse_leave = () => {
  const menu  = document.querySelector('#menu');
  if (!menu.classList.contains('hidden')) {
    menu.classList.toggle('hidden');
  }
}