<svelte:head>

	<title>League Tracker</title>
	<meta name="description" content="Display both teams" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

</svelte:head>

<script>

	// @ts-nocheck
	import { check_account_validity, get_game_info, get_current_game_info, get_champ_image, get_spell_image } from "./league_api";
	import { onMount, afterUpdate } from 'svelte'
	import {useState} from './hooks.js'
	
	let user = '';
	const [blue_team, setBlueTeam] = useState([]);
	const [red_team, setRedTeam] = useState([]);
	let id = '';
	


	function enableCooldown(cooldownElement) {
		const cooldownDuration = cooldownElement.querySelector('.cooldown-duration');
		var duration = parseInt(cooldownDuration.getAttribute('data-duration'));

		cooldownElement.style['pointer-events'] = 'none';
		cooldownElement.style['filter'] = 'brightness(30%)';

		const interval = setInterval(() => {
		duration--;
		if (duration > 0) {
			cooldownDuration.textContent = duration;
		} else {
			cooldownElement.classList.remove('disable');

			cooldownElement.style['pointer-events'] = 'auto';
			cooldownElement.style['filter'] = 'brightness(100%)';

			cooldownDuration.textContent = cooldownDuration.getAttribute('data-duration');
			clearInterval(interval);
			cooldownElement.addEventListener('click', () => {
			enableCooldown(cooldownElement);
			});
		}
		}, 1000);
  }


	afterUpdate(() => {
		const cooldownElements = document.querySelectorAll('.cooldown');

		cooldownElements.forEach((cooldownElement) => {
			const cooldownDuration = cooldownElement.querySelector('.cooldown-duration');
			cooldownDuration.setAttribute('data-duration', cooldownDuration.textContent);

			cooldownElement.addEventListener('click', () => {
				enableCooldown(cooldownElement);
			});
		});
	});


	onMount(() => { 
		  user = window.location.href.split('?')[1].split('=')[1].split('/')[0] 
	});
	
	const handleSummonerNameSubmit = async (user) => {
		if (await check_account_validity(user)) {
			id = await get_game_info(user).then((data) => data.id);
			handleSummonerSearch(id);
		} else {
			window.location.href = `search_page/`
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
</script>  
  

  

  <main class="flex flex-col h-screen justify-center justify-between py-12">
	
	  
	  <div class='flex flex-col items-center h-fit gap-16'>
		
		<a id="all_users" class="flex text-white border-2 border-black rounded-lg p-4" href="./search_page">Back to search</a>

		<div id='all_users' class='flex w-fit h-fit place-content-center gap-4 rounded-lg'>
			
			<div class='item inline w-fit h-full text-white list'>
				{#each $blue_team as player, i}
				<div draggable="true" class='item px-4 h-fit border-2 border-black flex items-center justify-between gap-6'>
					
					<div class='flex justify-center w-fit h-fit gap-2'>
						
						<div class="cooldown relative inline-block flex justify-center">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img src={`${get_spell_image(player.spell1)}`} alt="Cooldown Image" class="rounded-md cursor-pointer" width={50} height={50}/>
							
							<h1 class="cooldown-duration absolute w-full  flex place-content-center bottom-0 text-center text-white text-sm bg-black bg-opacity-70 overflow-ellipsis">{player.cooldown1}</h1>
						</div>
												  
						<div class="cooldown relative inline-block flex justify-center">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img src={`${get_spell_image(player.spell2)}`} alt="Cooldown Image" class="rounded-md cursor-pointer" width={50} height={50}/>
							
							<h1 class="cooldown-duration absolute w-full  flex place-content-center bottom-0 text-center text-white text-sm bg-black bg-opacity-70 overflow-ellipsis">{player.cooldown2}</h1>
						</div>

					</div>
		
					<div class='flex flex-col p-5 w-fit h-fit items-center place-content-center'>
						<img src={`${get_champ_image(player.champion)}`} alt="" width={70} height={70}/>
						<h1 class="truncate2  " >{player.name}</h1>
					</div>
		
					<div class='flex gap-2'>
						<a href={`https://www.op.gg/summoners/na/${player.name}`} id='opgg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer flex justify-center'>OP.GG</a>
						<a href={`https://u.gg/lol/profile/na1/${player.name}/overview`} id='ugg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer justify-center flex'>U.GG</a>
					</div>
				</div>
				{/each}
			</div>
		

			<div class='inline w-fit text-white'>
				{#each $red_team as player, i}
				<div draggable="true" class='item px-4 h-fit border-2 border-black flex items-center justify-between gap-6'>
					
					<div class='flex justify-center w-fit h-fit gap-2'>
						
						<div class="cooldown relative inline-block flex justify-center">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img src={`${get_spell_image(player.spell1)}`} alt="Cooldown Image" class="rounded-md cursor-pointer" width={50} height={50}/>
							
							<h1 class="cooldown-duration absolute w-full  flex place-content-center bottom-0 text-center text-white text-sm bg-black bg-opacity-70 overflow-ellipsis">{player.cooldown1}</h1>
						</div>
												  
						<div class="cooldown relative inline-block flex justify-center">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img src={`${get_spell_image(player.spell2)}`} alt="Cooldown Image" class="rounded-md cursor-pointer" width={50} height={50}/>
							
							<h1 class="cooldown-duration absolute w-full  flex place-content-center bottom-0 text-center text-white text-sm bg-black bg-opacity-70 overflow-ellipsis">{player.cooldown2}</h1>
						</div>

					</div>
		
					<div class='flex flex-col p-5 w-fit h-fit items-center place-content-center'>
						<img src={`${get_champ_image(player.champion)}`} alt="" width={70} height={70}/>
						<h1>{player.name}</h1>
					</div>
		
					<div class='flex gap-2'>
						<a href={`https://www.op.gg/summoners/na/${player.name}`} id='opgg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer flex justify-center'>OP.GG</a>
						<a href={`https://u.gg/lol/profile/na1/${player.name}/overview`} id='ugg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer justify-center flex'>U.GG</a>
					</div>
				</div>
				{/each}
			</div>

	</div>
</main>
  

<style lang="scss">
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