<svelte:head>

	<title>League Tracker</title>
	<meta name="description" content="Display both teams" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

</svelte:head>

<script>

	// @ts-nocheck
	import { check_account_validity, get_game_info, get_current_game_info, get_champ_image, get_spell_image } from "./league_api";
	import { onMount, afterUpdate, onDestroy } from 'svelte'
	import {useState} from '../hooks.js'

	
	const [blue_team, setBlueTeam] = useState([]);
	const [red_team, setRedTeam] = useState([]);
	let id = '';
	let user = '';
	let region = '';
	let storedData;
	

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

		let list = document.getElementsByTagName("ul")
		dragndrop(list[0])
		dragndrop(list[1])
	});


	function dragndrop(list) {
				// Drag and drop
		Array.from(list.children).forEach((i) => i.draggable = true)
		let drag_target = null,
			drop_target = null

		list.addEventListener("dragstart", function handle_drag_start(event) {
			drag_target = event.target
			
			event.dataTransfer.effectAllowed = "move"
			event.dataTransfer.setData("text/plain", null)
			
			drag_target.style['opacity'] = '0.4'
			
			list.addEventListener("dragend", handle_drag_end)
			list.addEventListener("dragover", handle_drag_over)
		})

		function handle_drag_over(event) {
			event.preventDefault()

			if (event.target && event.target != drag_target && event.target.nodeName == "LI") {
				let rect = event.target.getBoundingClientRect()
				console.log(rect);
				console.log((event.clientY - rect.top) / (rect.bottom - rect.top));
				if (((event.clientY - rect.top) / (rect.bottom - rect.top)) < 0.7) {
					list.insertBefore(drag_target, event.target)
				}
				else {
					// list.insertBefore(drag_target, event.target.nextSibling || event.target)
					list.insertBefore(drag_target, event.target.nextSibling)
				}
			}
		}

		function handle_drag_end(event) {
			event.preventDefault()
			event.dataTransfer.dropEffect = "move"
			
			drag_target.style['opacity'] = '1'
			
			drag_target = null

			list.removeEventListener("dragover", handle_drag_over, false)
			list.removeEventListener("dragend", handle_drag_end, false)
		}
	}

	onMount(() => { 

		// user = window.location.href.split('?')[1].split('=')[1].split('/')[0]
		// region = window.location.href.split('?')[2].split('=')[1].split('/')[0]
		const jsonData = typeof localStorage !== 'undefined' ? localStorage.getItem('data.json') : null;
		if (jsonData) {
			storedData = JSON.parse(jsonData);
		}

		user = storedData.user;
		region = storedData.region;
	});

	const handleSummonerNameSubmit = async (user, region) => {
		if (await check_account_validity(user, region)) {
			id = await get_game_info(user, region).then((data) => data.id);
			handleSummonerSearch(id);
		} else {
			window.location.href = `search_page/`
			alert('Invalid User');
		}
	}

	$: {
		if (user) {
			handleSummonerNameSubmit(user, region);
		}
	}


	const handleSummonerSearch = async (id) => {
		const current_game = await get_current_game_info(id, region).then((data) => data);
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

		<div id='all_users' class='lg:scale-100 md:scale-75 sm:scale-50 flex w-fit h-fit place-content-center gap-4 rounded-lg'>
			
				<ul class='item inline w-fit h-full text-white list'>
					{#each $blue_team as player, i}
					<li class=' list-none item px-4 h-fit border-2 border-black flex items-center justify-between gap-6'>
						
						<div class='flex justify-center w-fit h-fit gap-2'>
							
							<div class="cooldown relative inline-block flex justify-center">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img draggable="false" src={`${get_spell_image(player.spell1)}`} alt="Cooldown Image" class="rounded-md cursor-pointer" width={50} height={50}/>
								<h1 class="cooldown-duration absolute w-full  flex place-content-center bottom-0 text-center text-white text-sm bg-black bg-opacity-70 overflow-ellipsis">{player.cooldown1}</h1>
							</div>
													  
							<div class="cooldown relative inline-block flex justify-center">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img draggable="false" src={`${get_spell_image(player.spell2)}`} alt="Cooldown Image" class="rounded-md cursor-pointer" width={50} height={50}/>
								<h1 class="cooldown-duration absolute w-full  flex place-content-center bottom-0 text-center text-white text-sm bg-black bg-opacity-70 overflow-ellipsis">{player.cooldown2}</h1>
							</div>
	
						</div>
			
						<div class='flex flex-col p-5 w-fit h-fit items-center place-content-center'>
							<img draggable="false" src={`${get_champ_image(player.champion)}`} alt="" width={70} height={70}/>
							<h1 class="sm:text-clip flex justify-center" >{player.name}</h1>
						</div>
			
						<div class='flex gap-2'>
							<a target="_blank" draggable="false" href={`https://www.op.gg/summoners/na/${player.name}`} id='opgg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer flex justify-center'>OP.GG</a>
							<a target="_blank" draggable="false" href={`https://u.gg/lol/profile/na1/${player.name}/overview`} id='ugg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer justify-center flex'>U.GG</a>
						</div>
					</li>
					{/each}
				</ul>
			
	
				<ul class='item inline w-fit h-full text-white list'>
					{#each $red_team as player, i}
					<li class='item px-4 h-fit border-2 border-black flex items-center justify-between gap-6'>
						
						<div class='flex justify-center w-fit h-fit gap-2'>
							
							<div class="cooldown relative inline-block flex justify-center">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img draggable="false" src={`${get_spell_image(player.spell1)}`} alt="Cooldown Image" class="rounded-md cursor-pointer" width={50} height={50}/>
								<h1 class="cooldown-duration absolute w-full  flex place-content-center bottom-0 text-center text-white text-sm bg-black bg-opacity-70 overflow-ellipsis">{player.cooldown1}</h1>
							</div>
													  
							<div class="cooldown relative inline-block flex justify-center">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img draggable="false" src={`${get_spell_image(player.spell2)}`} alt="Cooldown Image" class="rounded-md cursor-pointer" width={50} height={50}/>
								<h1 class="cooldown-duration absolute w-full  flex place-content-center bottom-0 text-center text-white text-sm bg-black bg-opacity-70 overflow-ellipsis">{player.cooldown2}</h1>
							</div>
	
						</div>
			
						<div class='flex flex-col p-5 w-fit h-fit items-center place-content-center'>
							<img draggable="false" src={`${get_champ_image(player.champion)}`} alt="" width={70} height={70}/>
							<h1 class="sm:text-clip" >{player.name}</h1>
						</div>
			
						<div class='flex gap-2'>
							<a target="_blank" draggable="false" href={`https://www.op.gg/summoners/na/${player.name}`} id='opgg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer flex justify-center'>OP.GG</a>
							<a target="_blank" draggable="false" href={`https://u.gg/lol/profile/na1/${player.name}/overview`} id='ugg' class='p-2 border-black border-2 rounded-lg hover:cursor-pointer justify-center flex'>U.GG</a>
						</div>
					</li>
					{/each}
				</ul>

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