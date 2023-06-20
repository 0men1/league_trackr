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

    window.location.href = `playerdisplay/?user=${summoner_name}/`
    // goto(`/playerdisplay/`);
    
}


// export const handleDropdown = () => {
//     const menu  = document.querySelector('#menu');
//     menu.classList.toggle('hidden'); 
// }

// export const handleChoiceClick = (e) => {
//   const button = document.querySelector('#dropdown-button');
//   button.value = e.target.value;
// }