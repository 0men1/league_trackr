<script>
	// @ts-nocheck
  
	import { check_account_validity, get_game_info, get_current_game_info, get_champ_image, get_spell_image } from "./league_api";
	import { onMount } from 'svelte'
	import {useState} from './hooks.js'

	let user = '';
	const [blue_team, setBlueTeam] = useState([]);
	const [red_team, setRedTeam] = useState([]);
	let id = '';
	
	onMount(() => { 
		user = window.location.href.split('?')[1].split('=')[1].split('/')[0] 
	});
	
	
	const handleSummonerNameSubmit = async (user) => {
		if (await check_account_validity(user)) {
			id = await get_game_info(user).then((data) => data.id);
			handleSummonerSearch(id);
		} else {
			alert('Invalid User');
		}
	}

	$: {
		if (user) {
			handleSummonerNameSubmit(user);
		}
	}


	const handleSummonerSearch = async (id) => {
		console.log(id);
		const current_game = await get_current_game_info(id).then((data) => data);
		const blue_team = [];
		const red_team = [];

		for (let i = 0; i < 10; i++) {
			if (current_game[i].teamId === 'blue') {
				blue_team.push(current_game[i]);
			} else {
				red_team.push(current_game[i]);
			}
		}
		setBlueTeam(blue_team);
		setRedTeam(red_team);
	}


	const handleCooldown = (time) => {
		const cooldownButton = document.getElementById("cooldown-button");
		const cooldownImage = document.getElementById("cooldown-image");
		const cooldownText = document.getElementById("cooldown-text");
		
		// Disable the button
		cooldownButton.disabled = true;
		
		// Add a class to the image to apply the cooldown effect
		cooldownImage.classList.add("cooldown");
		
		let cooldownDuration = 10; // Cooldown duration in seconds
		
		// Display the cooldown duration on the button
		cooldownText.textContent = cooldownDuration;
		
		// Update the cooldown duration every second
		const countdown = setInterval(function() {
			cooldownDuration--;
			cooldownText.textContent = cooldownDuration;
			
			// Check if the cooldown duration has reached 0
			if (cooldownDuration === 0) {
				// Enable the button and remove the cooldown effect
				cooldownButton.disabled = false;
				cooldownImage.classList.remove("cooldown");
				cooldownText.textContent = "";
				
				// Clear the interval
				clearInterval(countdown);
			}
		}, 1000);
	}	

  </script>  
  
  <svelte:head>
	<title>League Tracker</title>
	<meta name="description" content="Display both teams" />
  </svelte:head>
  
  
<main class="flex flex-col h-fit justify-center justify-between p-20">
	
	<div class='flex flex-col items-center h-fit gap-16'>
		<div id='all_users' class='flex w-fit h-fit place-content-center gap-4 rounded-lg'>
			
			<div class='item inline w-fit h-full text-white list'>
				{#each $blue_team as player, i}
				<div draggable="true" class='item p-4 h-fit border-2 border-black flex items-center justify-between gap-6'>
					
					<div class='flex flex-col justify-center w-fit h-fit gap-6'>
						<button on:click={handleCooldown} id="cooldown-button">
							<img id="cooldown-image" src={`${get_spell_image(player.spell1)}`} alt="" width={50} height={50}/>
							<span id="cooldown-text" class="ml-2"></span>

						</button>
						
						<button id="cooldown-button">
							<img id="cooldown-image" src={`${get_spell_image(player.spell2)}`} alt="" width={50} height={50}/>
							<span id="cooldown-text" class="ml-2"></span>

						</button>
					
					</div>
		
					<div class='flex flex-col p-5 w-fit h-fit items-center place-content-center'>
						<img src={`${get_champ_image(player.champion)}`} alt="" width={50} height={50}/>
						<!-- <h1 class='p-2 border-black border-2 rounded-lg'>{player.name}</h1> -->
					</div>
		
					<div class='flex flex-col gap-2'>
						<a href={`https://www.op.gg/summoners/na/${player.name}`} id='opgg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer flex justify-center'>OP.GG</a>
						<a href={`https://u.gg/lol/profile/na1/${player.name}/overview`} id='ugg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer justify-center flex'>U.GG</a>
					</div>
				</div>
				{/each}
			</div>
		
			<div class='inline w-fit text-white'>
				{#each $red_team as player, i}
				<div draggable="true" class='item p-4 h-fit border-2 border-black flex items-center justify-between gap-6'>
					<div class='flex flex-col w-fit h-fit gap-6'>
						<button id="cooldown-button">
							<img id="cooldown-image" src={`${get_spell_image(player.spell1)}`} alt="" width={50} height={50}/>
							<span id="cooldown-text" class="ml-2"></span>

						</button>
						
						<button id="cooldown-button">
							<img id="cooldown-image" src={`${get_spell_image(player.spell2)}`} alt="" width={50} height={50}/>
							<span id="cooldown-text" class="ml-2"></span>

						</button>
					</div>
		
					<div class='flex flex-col p-5 w-fit h-fit items-center place-content-center'>
						<img src={`${get_champ_image(player.champion)}`} alt="" width={50} height={50}/>
						<!-- <h1 class='p-2 border-black border-2 rounded-lg'>{player.name}</h1> -->
					</div>
		
					<div class='flex flex-col gap-2'>
					  <a href={`https://www.op.gg/summoners/na/${player.name}`} id='opgg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer flex justify-center'>OP.GG</a>
					  <a href={`https://u.gg/lol/profile/na1/${player.name}/overview`} id='ugg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer justify-center flex'>U.GG</a>
					</div>
				</div>
				{/each}
			</div>

	</div>
</main>
  

<style>
	#all_users{
	background: rgb(44,81,50)
	}


	#opgg{
	background: rgb(83,131,232)
	}

	#ugg{
	background: rgb(50,115,250);
	}
</style>