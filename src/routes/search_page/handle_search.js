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
    
    if (summoner_name == "") {
      alert("Please enter a summoner name");
      return;
    }
    

    if (region == "Region:") {
      window.location.href = `playerdisplay/?user=${summoner_name}?region=NA/`
    } else {
      window.location.href = `playerdisplay/?user=${summoner_name}?region=${region}/`
    }
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