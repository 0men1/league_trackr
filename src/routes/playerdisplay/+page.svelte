<svelte:head>

	<title>League Tracker</title>
	<meta name="description" content="Display both teams" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

</svelte:head>

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
	

	function handleClick(event) {
		const btn = event.target;
		alert(event.target)
		btn.disabled = true;
		setTimeout(function() {
			btn.disabled = false;
		}, 30000);
	}

  </script>  
  
  
  
<main class="flex flex-col h-fit justify-center justify-between">
	
	<div class='flex flex-col items-center h-fit gap-16'>
		<div id='all_users' class='flex w-fit h-fit place-content-center gap-4 rounded-lg'>
			
			<div class='item inline w-fit h-full text-white list'>
				{#each $blue_team as player, i}
				<div draggable="true" class='item p-4 h-fit border-2 border-black flex items-center justify-between gap-6'>
					
					<div class='flex justify-center w-fit h-fit'>
						<button class="cooldown-button" on:click={handleClick}>
							<img class="cooldown" src={`${get_spell_image(player.spell1)}`} alt="" width={50} height={50}/>
						</button>
						
						<button class="cooldown-button" on:click={handleClick}>
							<img class="cooldown" src={`${get_spell_image(player.spell2)}`} alt="" width={50} height={50}/>
						</button>
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
		

			<div class='inline w-fit text-white'>
				{#each $red_team as player, i}
				<div draggable="true" class='item p-4 h-fit border-2 border-black flex items-center justify-between gap-6'>
					
					<div class='flex justify-center w-fit h-fit'>
						<button class="cooldown-button" on:click={handleClick}>
							<img id="cooldown" src={`${get_spell_image(player.spell1)}`} alt="" width={50} height={50}/>
						</button>
						
						<button class="cooldown-button" on:click={handleClick}>
							<img id="cooldown" src={`${get_spell_image(player.spell2)}`} alt="" width={50} height={50}/>
						</button>
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


	$buttonBaseColor: #336699;
	// $disableDuration: 15s;
	.cooldown{
	background: $buttonBaseColor;
	margin: 5px;
	border-radius: 5px;
	border: 0;
	color: #fff;
	font-size: 16px;
	outline: none;
	overflow: hidden;
	cursor: pointer;
	&:active, &:focus{
		outline: none;
	}
	&:disabled{
		background: darken($buttonBaseColor, 10%);
		color: darken(#fff, 15%);
		cursor: default;
		box-shadow: inset 3px 3px 10px 0px rgba(0,0,0,0.2);
		&:after{
		content: '';
		position: absolute;
		bottom: 0;
		width: 100%;
		left: 0;
		height: 5px;
		background: darken($buttonBaseColor, 20%);
		// animation: cooldown $disableDuration linear;
		}
	}
	}

	@keyframes cooldown {
	0% { width: 100%; }
	100% { width: 0; }
	}
</style>