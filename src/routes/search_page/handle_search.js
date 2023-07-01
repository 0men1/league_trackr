// @ts-nocheck
import { goto } from "$app/navigation";

export const handleSummmonerNameSubmit = async (e) => {
    
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    const summoner_name = data.user_name;
    const region = document.querySelector('#dropdown-button').innerText;
    window.location.href = `playerdisplay/?user=${summoner_name}?region=${region}/`
    // goto(`/playerdisplay/`);
    
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